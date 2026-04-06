package com.placement.controller;

import com.placement.dto.ApplicationDto;
import com.placement.security.UserPrincipal;
import com.placement.service.ApplicationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

/**
 * Application controller - matches all /api/applications/* endpoints from Node.js
 */
@RestController
@RequestMapping("/api/applications")
public class ApplicationController {

    @Autowired
    private ApplicationService applicationService;

    // GET /api/applications/ping (debug route from original)
    @GetMapping("/ping")
    public ResponseEntity<?> ping() {
        return ResponseEntity.ok(Map.of("ok", true, "route", "/api/applications/ping"));
    }

    // GET /api/applications/my (student)
    @GetMapping("/my")
    public ResponseEntity<?> getMyApplications(@AuthenticationPrincipal UserPrincipal principal) {
        try {
            List<ApplicationDto.ApplicationResponse> apps = applicationService.getMyApplications(principal.getUser());
            return ResponseEntity.ok(apps);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("message", e.getMessage()));
        }
    }

    // GET /api/applications (placement_officer/admin)
    @GetMapping
    public ResponseEntity<?> getAllApplications(@AuthenticationPrincipal UserPrincipal principal) {
        String role = principal.getRole();
        if (!role.equals("placement_officer") && !role.equals("admin")) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body(Map.of("message", "User role " + role + " is not authorized"));
        }
        try {
            List<ApplicationDto.ApplicationResponse> apps = applicationService.getAllApplications();
            return ResponseEntity.ok(apps);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("message", e.getMessage()));
        }
    }

    // GET /api/applications/employer (employer)
    @GetMapping("/employer")
    public ResponseEntity<?> getEmployerApplications(@AuthenticationPrincipal UserPrincipal principal) {
        if (!principal.getRole().equals("employer")) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body(Map.of("message", "Not authorized"));
        }
        try {
            List<ApplicationDto.ApplicationResponse> apps = applicationService.getEmployerApplications(principal.getUser());
            return ResponseEntity.ok(apps);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("message", e.getMessage()));
        }
    }

    // GET /api/applications/job/:jobId (employer/admin/placement_officer)
    @GetMapping("/job/{jobId}")
    public ResponseEntity<?> getJobApplications(
            @PathVariable Long jobId,
            @AuthenticationPrincipal UserPrincipal principal) {
        String role = principal.getRole();
        if (!role.equals("employer") && !role.equals("admin") && !role.equals("placement_officer")) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body(Map.of("message", "Not authorized"));
        }
        try {
            List<ApplicationDto.ApplicationResponse> apps = applicationService.getJobApplications(jobId, principal.getUser());
            return ResponseEntity.ok(apps);
        } catch (RuntimeException e) {
            int status = e.getMessage().contains("not found") ? 404 : 401;
            return ResponseEntity.status(status).body(Map.of("message", e.getMessage()));
        }
    }

    // POST /api/applications/:jobId (student) - multipart form with resume file
    @PostMapping("/{jobId}")
    public ResponseEntity<?> applyForJob(
            @PathVariable Long jobId,
            @RequestParam(value = "resume", required = false) MultipartFile resume,
            @RequestParam(value = "coverLetter", required = false) String coverLetter,
            @AuthenticationPrincipal UserPrincipal principal) {
        if (!principal.getRole().equals("student")) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body(Map.of("message", "Only students can apply for jobs"));
        }
        try {
            ApplicationDto.ApplicationResponse app = applicationService.applyForJob(
                    jobId, principal.getUser(), resume, coverLetter);
            return ResponseEntity.status(HttpStatus.CREATED).body(app);
        } catch (RuntimeException e) {
            int status = e.getMessage().contains("not found") ? 404 : 400;
            return ResponseEntity.status(status).body(Map.of("message", e.getMessage()));
        }
    }

    // PUT /api/applications/:id/status (employer/placement_officer/admin)
    @PutMapping("/{id}/status")
    public ResponseEntity<?> updateApplicationStatus(
            @PathVariable Long id,
            @RequestBody ApplicationDto.UpdateStatusRequest request,
            @AuthenticationPrincipal UserPrincipal principal) {
        String role = principal.getRole();
        if (!role.equals("employer") && !role.equals("placement_officer") && !role.equals("admin")) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body(Map.of("message", "Not authorized"));
        }
        try {
            ApplicationDto.ApplicationResponse app = applicationService.updateApplicationStatus(
                    id, request.getStatus(), principal.getUser());
            return ResponseEntity.ok(app);
        } catch (RuntimeException e) {
            int status = e.getMessage().contains("not found") ? 404 : 401;
            return ResponseEntity.status(status).body(Map.of("message", e.getMessage()));
        }
    }
}
