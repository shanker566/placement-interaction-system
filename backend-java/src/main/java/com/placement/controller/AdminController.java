package com.placement.controller;

import com.placement.security.UserPrincipal;
import com.placement.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

/**
 * Admin controller - matches all /api/admin/* endpoints from Node.js
 */
@RestController
@RequestMapping("/api/admin")
public class AdminController {

    @Autowired
    private AdminService adminService;

    // GET /api/admin/stats (admin only)
    @GetMapping("/stats")
    public ResponseEntity<?> getSystemStats(@AuthenticationPrincipal UserPrincipal principal) {
        if (!principal.getRole().equals("admin")) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body(Map.of("message", "Not authorized"));
        }
        try {
            Map<String, Object> stats = adminService.getSystemStats();
            return ResponseEntity.ok(stats);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("message", e.getMessage()));
        }
    }

    // PUT /api/admin/approve-employer/:id (admin only)
    @PutMapping("/approve-employer/{id}")
    public ResponseEntity<?> approveEmployer(
            @PathVariable Long id,
            @AuthenticationPrincipal UserPrincipal principal) {
        if (!principal.getRole().equals("admin")) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body(Map.of("message", "Not authorized"));
        }
        try {
            Map<String, String> response = adminService.approveEmployer(id);
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("message", e.getMessage()));
        }
    }
}
