package com.placement.controller;

import com.placement.dto.JobDto;
import com.placement.security.UserPrincipal;
import com.placement.service.JobService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

/**
 * Job controller - matches all /api/jobs/* endpoints from Node.js
 */
@RestController
@RequestMapping("/api/jobs")
public class JobController {

    @Autowired
    private JobService jobService;

    // GET /api/jobs (public)
    @GetMapping
    public ResponseEntity<?> getJobs(
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String location,
            @RequestParam(required = false) String company,
            @RequestParam(required = false) String type,
            @RequestParam(defaultValue = "1") int pageNumber) {
        try {
            JobDto.PaginatedJobsResponse response = jobService.getJobs(keyword, location, company, type, pageNumber);
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("message", "Server Error fetching jobs", "error", e.getMessage()));
        }
    }

    // POST /api/jobs (employer/admin)
    @PostMapping
    public ResponseEntity<?> createJob(
            @RequestBody JobDto.CreateJobRequest request,
            @AuthenticationPrincipal UserPrincipal principal) {
        String role = principal.getRole();
        if (!role.equals("employer") && !role.equals("admin")) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body(Map.of("message", "User role " + role + " is not authorized"));
        }
        try {
            JobDto.JobResponse response = jobService.createJob(request, principal.getUser());
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("message", e.getMessage()));
        }
    }

    // GET /api/jobs/myjobs (employer)
    @GetMapping("/myjobs")
    public ResponseEntity<?> getMyJobs(@AuthenticationPrincipal UserPrincipal principal) {
        if (!principal.getRole().equals("employer")) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body(Map.of("message", "Not authorized"));
        }
        List<JobDto.JobResponse> jobs = jobService.getMyJobs(principal.getUser());
        return ResponseEntity.ok(jobs);
    }

    // GET /api/jobs/:id (public)
    @GetMapping("/{id}")
    public ResponseEntity<?> getJobById(@PathVariable Long id) {
        try {
            JobDto.JobResponse response = jobService.getJobById(id);
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("message", e.getMessage()));
        }
    }

    // PUT /api/jobs/:id (employer/admin)
    @PutMapping("/{id}")
    public ResponseEntity<?> updateJob(
            @PathVariable Long id,
            @RequestBody JobDto.CreateJobRequest request,
            @AuthenticationPrincipal UserPrincipal principal) {
        String role = principal.getRole();
        if (!role.equals("employer") && !role.equals("admin")) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body(Map.of("message", "Not authorized"));
        }
        try {
            JobDto.JobResponse response = jobService.updateJob(id, request, principal.getUser());
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            int status = e.getMessage().contains("not found") ? 404 : 401;
            return ResponseEntity.status(status).body(Map.of("message", e.getMessage()));
        }
    }

    // DELETE /api/jobs/:id (employer/admin)
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteJob(
            @PathVariable Long id,
            @AuthenticationPrincipal UserPrincipal principal) {
        String role = principal.getRole();
        if (!role.equals("employer") && !role.equals("admin")) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body(Map.of("message", "Not authorized"));
        }
        try {
            jobService.deleteJob(id, principal.getUser());
            return ResponseEntity.ok(Map.of("message", "Job removed"));
        } catch (RuntimeException e) {
            int status = e.getMessage().contains("not found") ? 404 : 401;
            return ResponseEntity.status(status).body(Map.of("message", e.getMessage()));
        }
    }
}
