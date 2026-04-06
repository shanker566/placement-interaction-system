package com.placement.service;

import com.placement.dto.ApplicationDto;
import com.placement.entity.Application;
import com.placement.entity.Job;
import com.placement.entity.User;
import com.placement.repository.ApplicationRepository;
import com.placement.repository.JobRepository;
import com.placement.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class PlacementService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JobRepository jobRepository;

    @Autowired
    private ApplicationRepository applicationRepository;

    /**
     * Get placement analytics - matches GET /api/placement/analytics
     */
    public Map<String, Object> getPlacementAnalytics() {
        long totalStudents = userRepository.countByRole(User.Role.student);
        long totalJobs = jobRepository.count();
        long totalApplications = applicationRepository.count();
        long hiredStudents = applicationRepository.countByStatus(Application.ApplicationStatus.hired);

        String placementRate = totalStudents > 0
                ? String.format("%.2f%%", (hiredStudents * 100.0 / totalStudents))
                : "0%";

        Map<String, Object> report = new HashMap<>();
        report.put("totalStudents", totalStudents);
        report.put("totalJobs", totalJobs);
        report.put("totalApplications", totalApplications);
        report.put("hiredStudents", hiredStudents);
        report.put("placementRate", placementRate);
        return report;
    }

    /**
     * Get placement records (hired applications) - matches GET /api/placement/records
     */
    public List<ApplicationDto.ApplicationResponse> getPlacementRecords() {
        return applicationRepository.findByStatus(Application.ApplicationStatus.hired)
                .stream()
                .map(ApplicationDto.ApplicationResponse::fromApplication)
                .collect(Collectors.toList());
    }
}
