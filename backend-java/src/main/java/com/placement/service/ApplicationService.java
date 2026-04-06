package com.placement.service;

import com.placement.dto.ApplicationDto;
import com.placement.entity.Application;
import com.placement.entity.Job;
import com.placement.entity.Resume;
import com.placement.entity.User;
import com.placement.repository.ApplicationRepository;
import com.placement.repository.JobRepository;
import com.placement.repository.ResumeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ApplicationService {

    @Autowired
    private ApplicationRepository applicationRepository;

    @Autowired
    private JobRepository jobRepository;

    @Autowired
    private ResumeRepository resumeRepository;

    @Value("${file.upload-dir}")
    private String uploadDir;

    /**
     * Apply for a job - matches POST /api/applications/:jobId
     */
    public ApplicationDto.ApplicationResponse applyForJob(Long jobId, User student, MultipartFile file, String coverLetter) {
        Job job = jobRepository.findById(jobId)
                .orElseThrow(() -> new RuntimeException("Job not found"));

        if (applicationRepository.existsByStudentAndJob(student, job)) {
            throw new RuntimeException("You have already applied for this job");
        }

        if (file == null || file.isEmpty()) {
            throw new RuntimeException("Resume is required");
        }

        // Validate file type
        String originalName = file.getOriginalFilename();
        if (originalName == null || !originalName.matches("(?i).*\\.(pdf|doc|docx)$")) {
            throw new RuntimeException("Error: Resumes only (PDF/DOC/DOCX)!");
        }

        // Save file
        String savedPath = saveFile(file);

        // Save Resume record
        Resume resume = new Resume();
        resume.setUser(student);
        resume.setFilename(file.getOriginalFilename());
        resume.setPath(savedPath);
        resume.setMimetype(file.getContentType());
        resume.setSize(file.getSize());
        resumeRepository.save(resume);

        // Create Application
        Application application = new Application();
        application.setStudent(student);
        application.setJob(job);
        application.setResume(savedPath);
        application.setCoverLetter(coverLetter);
        application = applicationRepository.save(application);

        return ApplicationDto.ApplicationResponse.fromApplication(application);
    }

    /**
     * Get my applications - matches GET /api/applications/my
     */
    public List<ApplicationDto.ApplicationResponse> getMyApplications(User student) {
        return applicationRepository.findByStudent(student)
                .stream()
                .map(ApplicationDto.ApplicationResponse::fromApplication)
                .collect(Collectors.toList());
    }

    /**
     * Get applications for a job - matches GET /api/applications/job/:jobId
     */
    public List<ApplicationDto.ApplicationResponse> getJobApplications(Long jobId, User currentUser) {
        Job job = jobRepository.findById(jobId)
                .orElseThrow(() -> new RuntimeException("Job not found"));

        if (!job.getPostedBy().getId().equals(currentUser.getId()) &&
                currentUser.getRole() != User.Role.admin) {
            throw new RuntimeException("Not authorized");
        }

        return applicationRepository.findByJob(job)
                .stream()
                .map(ApplicationDto.ApplicationResponse::fromApplication)
                .collect(Collectors.toList());
    }

    /**
     * Update application status - matches PUT /api/applications/:id/status
     */
    public ApplicationDto.ApplicationResponse updateApplicationStatus(Long id, String status, User currentUser) {
        Application application = applicationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Application not found"));

        Job job = application.getJob();
        if (!job.getPostedBy().getId().equals(currentUser.getId()) &&
                currentUser.getRole() != User.Role.admin &&
                currentUser.getRole() != User.Role.placement_officer) {
            throw new RuntimeException("Not authorized");
        }

        try {
            application.setStatus(Application.ApplicationStatus.valueOf(status));
        } catch (IllegalArgumentException e) {
            throw new RuntimeException("Invalid status value: " + status);
        }

        application = applicationRepository.save(application);
        return ApplicationDto.ApplicationResponse.fromApplication(application);
    }

    /**
     * Get all applications - matches GET /api/applications (admin/placement_officer)
     */
    public List<ApplicationDto.ApplicationResponse> getAllApplications() {
        return applicationRepository.findAll()
                .stream()
                .map(ApplicationDto.ApplicationResponse::fromApplication)
                .collect(Collectors.toList());
    }

    /**
     * Get applications for employer's jobs - matches GET /api/applications/employer
     */
    public List<ApplicationDto.ApplicationResponse> getEmployerApplications(User employer) {
        List<Job> jobs = jobRepository.findByPostedBy(employer);
        return applicationRepository.findByJobIn(jobs)
                .stream()
                .map(ApplicationDto.ApplicationResponse::fromApplication)
                .collect(Collectors.toList());
    }

    // ---- File handling ----

    private String saveFile(MultipartFile file) {
        try {
            Path uploadPath = Paths.get(uploadDir).toAbsolutePath();
            Files.createDirectories(uploadPath);

            String originalName = file.getOriginalFilename();
            String ext = "";
            if (originalName != null && originalName.contains(".")) {
                ext = originalName.substring(originalName.lastIndexOf('.'));
            }
            String fileName = "resume-" + System.currentTimeMillis() + ext;
            Path filePath = uploadPath.resolve(fileName);
            Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

            return "uploads/" + fileName;
        } catch (IOException e) {
            throw new RuntimeException("Failed to store file: " + e.getMessage());
        }
    }
}
