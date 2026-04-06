package com.placement.service;

import com.placement.entity.Application;
import com.placement.entity.User;
import com.placement.repository.ApplicationRepository;
import com.placement.repository.JobRepository;
import com.placement.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class AdminService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JobRepository jobRepository;

    @Autowired
    private ApplicationRepository applicationRepository;

    /**
     * Get system stats - matches GET /api/admin/stats
     */
    public Map<String, Object> getSystemStats() {
        long totalUsers = userRepository.count();
        long totalStudents = userRepository.countByRole(User.Role.student);
        long totalEmployers = userRepository.countByRole(User.Role.employer);
        long totalJobs = jobRepository.count();
        long activeJobs = jobRepository.countByStatus(com.placement.entity.Job.JobStatus.active);
        long totalApplications = applicationRepository.count();

        Map<String, Object> stats = new HashMap<>();
        stats.put("totalUsers", totalUsers);
        stats.put("totalStudents", totalStudents);
        stats.put("totalEmployers", totalEmployers);
        stats.put("totalJobs", totalJobs);
        stats.put("activeJobs", activeJobs);
        stats.put("totalApplications", totalApplications);
        return stats;
    }

    /**
     * Approve employer - matches PUT /api/admin/approve-employer/:id
     */
    public Map<String, String> approveEmployer(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Employer not found"));

        if (user.getRole() != User.Role.employer) {
            throw new RuntimeException("Employer not found");
        }

        user.setIsVerified(true);
        userRepository.save(user);

        Map<String, String> response = new HashMap<>();
        response.put("message", "Employer approved");
        return response;
    }
}
