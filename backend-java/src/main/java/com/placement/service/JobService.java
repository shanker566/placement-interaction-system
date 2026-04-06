package com.placement.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.placement.dto.JobDto;
import com.placement.entity.Job;
import com.placement.entity.User;
import com.placement.repository.JobRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class JobService {

    @Autowired
    private JobRepository jobRepository;

    private final ObjectMapper objectMapper = new ObjectMapper();

    private static final int PAGE_SIZE = 10;

    public JobDto.JobResponse createJob(JobDto.CreateJobRequest request, User postedBy) {
        Job job = new Job();
        job.setTitle(request.getTitle());
        job.setDescription(request.getDescription());
        job.setCompany(request.getCompany());
        job.setLocation(request.getLocation());
        job.setPostedBy(postedBy);

        // Requirements as JSON array
        if (request.getRequirements() != null) {
            try {
                job.setRequirements(objectMapper.writeValueAsString(request.getRequirements()));
            } catch (Exception e) {
                job.setRequirements("[]");
            }
        }

        // Salary range
        if (request.getSalaryRange() != null) {
            Map<String, Object> salary = request.getSalaryRange();
            if (salary.get("min") instanceof Number) job.setSalaryMin(((Number) salary.get("min")).doubleValue());
            if (salary.get("max") instanceof Number) job.setSalaryMax(((Number) salary.get("max")).doubleValue());
            if (salary.get("currency") != null) job.setSalaryCurrency((String) salary.get("currency"));
        }

        // Job type
        if (request.getType() != null) {
            job.setType(Job.JobType.fromValue(request.getType()));
        }

        // Deadline
        if (request.getDeadline() != null && !request.getDeadline().isEmpty()) {
            try {
                job.setDeadline(LocalDate.parse(request.getDeadline().substring(0, 10)));
            } catch (Exception e) {
                // ignore parse errors
            }
        }

        job = jobRepository.save(job);
        return JobDto.JobResponse.fromJob(job);
    }

    public JobDto.PaginatedJobsResponse getJobs(String keyword, String location, String company, String type, int page) {
        Job.JobType jobType = null;
        if (type != null && !type.equals("All") && !type.isEmpty()) {
            jobType = Job.JobType.fromValue(type);
        }

        String kw = (keyword != null && !keyword.isEmpty()) ? keyword : null;
        String loc = (location != null && !location.isEmpty()) ? location : null;
        String comp = (company != null && !company.isEmpty()) ? company : null;

        PageRequest pageRequest = PageRequest.of(page - 1, PAGE_SIZE, Sort.by("createdAt").descending());
        Page<Job> jobPage = jobRepository.searchJobs(kw, loc, comp, jobType, pageRequest);

        List<JobDto.JobResponse> jobResponses = jobPage.getContent()
                .stream()
                .map(JobDto.JobResponse::fromJob)
                .collect(Collectors.toList());

        return new JobDto.PaginatedJobsResponse(jobResponses, page, (int) jobPage.getTotalPages());
    }

    public JobDto.JobResponse getJobById(Long id) {
        Job job = jobRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Job not found"));
        return JobDto.JobResponse.fromJob(job);
    }

    public JobDto.JobResponse updateJob(Long id, JobDto.CreateJobRequest request, User currentUser) {
        Job job = jobRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Job not found"));

        // Authorization
        if (!job.getPostedBy().getId().equals(currentUser.getId()) &&
                currentUser.getRole() != User.Role.admin) {
            throw new RuntimeException("Not authorized to update this job");
        }

        if (request.getTitle() != null) job.setTitle(request.getTitle());
        if (request.getDescription() != null) job.setDescription(request.getDescription());
        if (request.getStatus() != null) {
            try {
                job.setStatus(Job.JobStatus.valueOf(request.getStatus()));
            } catch (Exception ignored) {}
        }

        job = jobRepository.save(job);
        return JobDto.JobResponse.fromJob(job);
    }

    public void deleteJob(Long id, User currentUser) {
        Job job = jobRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Job not found"));

        if (!job.getPostedBy().getId().equals(currentUser.getId()) &&
                currentUser.getRole() != User.Role.admin) {
            throw new RuntimeException("Not authorized to delete this job");
        }

        jobRepository.delete(job);
    }

    public List<JobDto.JobResponse> getMyJobs(User user) {
        return jobRepository.findByPostedBy(user)
                .stream()
                .map(JobDto.JobResponse::fromJob)
                .collect(Collectors.toList());
    }
}
