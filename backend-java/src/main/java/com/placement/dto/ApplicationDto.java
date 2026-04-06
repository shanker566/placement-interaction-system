package com.placement.dto;

import com.placement.entity.Application;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

/**
 * Application DTOs
 */
public class ApplicationDto {

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class UpdateStatusRequest {
        private String status;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class ApplicationResponse {
        private Long _id;
        private Map<String, Object> student;
        private Map<String, Object> job;
        private String resume;
        private String status;
        private String coverLetter;
        private String employerFeedback;
        private LocalDateTime createdAt;
        private LocalDateTime updatedAt;

        public static ApplicationResponse fromApplication(Application app) {
            ApplicationResponse dto = new ApplicationResponse();
            dto._id = app.getId();
            dto.resume = app.getResume();
            dto.status = app.getStatus().name();
            dto.coverLetter = app.getCoverLetter();
            dto.employerFeedback = app.getEmployerFeedback();
            dto.createdAt = app.getCreatedAt();
            dto.updatedAt = app.getUpdatedAt();

            // Build student map
            if (app.getStudent() != null) {
                Map<String, Object> studentMap = new HashMap<>();
                studentMap.put("_id", app.getStudent().getId());
                studentMap.put("username", app.getStudent().getUsername());
                studentMap.put("email", app.getStudent().getEmail());
                // Build profile map
                Map<String, Object> profile = new HashMap<>();
                if (app.getStudent().getFirstName() != null) profile.put("firstName", app.getStudent().getFirstName());
                if (app.getStudent().getLastName() != null) profile.put("lastName", app.getStudent().getLastName());
                if (app.getStudent().getPhone() != null) profile.put("phone", app.getStudent().getPhone());
                if (app.getStudent().getDepartment() != null) profile.put("department", app.getStudent().getDepartment());
                if (app.getStudent().getCgpa() != null) profile.put("cgpa", app.getStudent().getCgpa());
                studentMap.put("profile", profile);
                dto.student = studentMap;
            }

            // Build job map
            if (app.getJob() != null) {
                Map<String, Object> jobMap = new HashMap<>();
                jobMap.put("_id", app.getJob().getId());
                jobMap.put("title", app.getJob().getTitle());
                jobMap.put("company", app.getJob().getCompany());
                jobMap.put("location", app.getJob().getLocation());
                jobMap.put("status", app.getJob().getStatus().name());
                jobMap.put("type", app.getJob().getType().getValue());
                // Add salary range
                Map<String, Object> salary = new HashMap<>();
                salary.put("min", app.getJob().getSalaryMin());
                salary.put("max", app.getJob().getSalaryMax());
                salary.put("currency", app.getJob().getSalaryCurrency());
                jobMap.put("salaryRange", salary);
                dto.job = jobMap;
            }

            return dto;
        }
    }
}
