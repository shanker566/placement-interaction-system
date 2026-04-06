package com.placement.dto;

import com.placement.entity.User;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * User DTOs - request and response objects for user endpoints
 */
public class UserDto {

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class UpdateProfileRequest {
        private String username;
        private String email;
        private String password;
        private Map<String, Object> profile;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class UserResponse {
        private Long _id;
        private String username;
        private String email;
        private String role;
        private Boolean isVerified;
        private Map<String, Object> profile;
        private LocalDateTime createdAt;
        private LocalDateTime updatedAt;

        public static UserResponse fromUser(User user) {
            UserResponse dto = new UserResponse();
            dto._id = user.getId();
            dto.username = user.getUsername();
            dto.email = user.getEmail();
            dto.role = user.getRole().name();
            dto.isVerified = user.getIsVerified();
            dto.createdAt = user.getCreatedAt();
            dto.updatedAt = user.getUpdatedAt();

            // Build profile map to match original JSON structure
            Map<String, Object> profile = new HashMap<>();
            if (user.getFirstName() != null) profile.put("firstName", user.getFirstName());
            if (user.getLastName() != null) profile.put("lastName", user.getLastName());
            if (user.getPhone() != null) profile.put("phone", user.getPhone());
            if (user.getAddress() != null) profile.put("address", user.getAddress());
            if (user.getCgpa() != null) profile.put("cgpa", user.getCgpa());
            if (user.getDepartment() != null) profile.put("department", user.getDepartment());
            if (user.getYear() != null) profile.put("year", user.getYear());
            if (user.getSkills() != null) {
                // Parse skills JSON string back to list
                try {
                    com.fasterxml.jackson.databind.ObjectMapper mapper = new com.fasterxml.jackson.databind.ObjectMapper();
                    profile.put("skills", mapper.readValue(user.getSkills(), List.class));
                } catch (Exception e) {
                    profile.put("skills", List.of());
                }
            }
            if (user.getCompanyName() != null) profile.put("companyName", user.getCompanyName());
            if (user.getCompanyWebsite() != null) profile.put("companyWebsite", user.getCompanyWebsite());
            dto.profile = profile;
            return dto;
        }
    }
}
