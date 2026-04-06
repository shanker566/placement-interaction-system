package com.placement.controller;

import com.placement.dto.ApplicationDto;
import com.placement.security.UserPrincipal;
import com.placement.service.PlacementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

/**
 * Placement controller - matches all /api/placement/* endpoints from Node.js
 */
@RestController
@RequestMapping("/api/placement")
public class PlacementController {

    @Autowired
    private PlacementService placementService;

    // GET /api/placement/analytics (placement_officer/admin)
    @GetMapping("/analytics")
    public ResponseEntity<?> getPlacementAnalytics(@AuthenticationPrincipal UserPrincipal principal) {
        String role = principal.getRole();
        if (!role.equals("placement_officer") && !role.equals("admin")) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body(Map.of("message", "Not authorized"));
        }
        try {
            Map<String, Object> report = placementService.getPlacementAnalytics();
            return ResponseEntity.ok(report);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("message", "Error generating report"));
        }
    }

    // GET /api/placement/records (placement_officer/admin)
    @GetMapping("/records")
    public ResponseEntity<?> getPlacementRecords(@AuthenticationPrincipal UserPrincipal principal) {
        String role = principal.getRole();
        if (!role.equals("placement_officer") && !role.equals("admin")) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body(Map.of("message", "Not authorized"));
        }
        try {
            List<ApplicationDto.ApplicationResponse> records = placementService.getPlacementRecords();
            return ResponseEntity.ok(records);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("message", "Error fetching records"));
        }
    }
}
