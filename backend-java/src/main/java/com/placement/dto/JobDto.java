package com.placement.dto;

import com.placement.entity.Job;
import com.placement.entity.User;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Job DTOs - request and response objects for job endpoints
 */
public class JobDto {

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class CreateJobRequest {
        private String title;
        private String description;
        private String company;
        private String location;
        private List<String> requirements;
        private Map<String, Object> salaryRange; // {min, max, currency}
        private String type;
        private String deadline;
        private String status;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class JobResponse {
        private Long _id;
        private String title;
        private String description;
        private String company;
        private String location;
        private List<String> requirements;
        private Map<String, Object> salaryRange;
        private String type;
        private Map<String, Object> postedBy;
        private String deadline;
        private String status;
        private LocalDateTime createdAt;
        private LocalDateTime updatedAt;
        private List<Long> applicants;

        public static JobResponse fromJob(Job job) {
            JobResponse dto = new JobResponse();
            dto._id = job.getId();
            dto.title = job.getTitle();
            dto.description = job.getDescription();
            dto.company = job.getCompany();
            dto.location = job.getLocation();
            dto.status = job.getStatus().name();
            dto.type = job.getType().getValue();
            dto.deadline = job.getDeadline() != null ? job.getDeadline().toString() : null;
            dto.createdAt = job.getCreatedAt();
            dto.updatedAt = job.getUpdatedAt();

            // Parse requirements from JSON string
            if (job.getRequirements() != null) {
                try {
                    com.fasterxml.jackson.databind.ObjectMapper mapper = new com.fasterxml.jackson.databind.ObjectMapper();
                    dto.requirements = mapper.readValue(job.getRequirements(), List.class);
                } catch (Exception e) {
                    dto.requirements = List.of();
                }
            }

            // Build salaryRange map
            Map<String, Object> salary = new HashMap<>();
            salary.put("min", job.getSalaryMin());
            salary.put("max", job.getSalaryMax());
            salary.put("currency", job.getSalaryCurrency() != null ? job.getSalaryCurrency() : "INR");
            dto.salaryRange = salary;

            // Build postedBy map
            if (job.getPostedBy() != null) {
                Map<String, Object> postedByMap = new HashMap<>();
                postedByMap.put("_id", job.getPostedBy().getId());
                postedByMap.put("username", job.getPostedBy().getUsername());
                postedByMap.put("companyName", job.getPostedBy().getCompanyName());
                dto.postedBy = postedByMap;
            }

            if (job.getApplications() != null) {
                dto.applicants = job.getApplications().stream()
                        .map(com.placement.entity.Application::getId)
                        .collect(java.util.stream.Collectors.toList());
            } else {
                dto.applicants = java.util.List.of();
            }

            return dto;
        }
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class PaginatedJobsResponse {
        private List<JobResponse> jobs;
        private int page;
        private int pages;
    }
}
