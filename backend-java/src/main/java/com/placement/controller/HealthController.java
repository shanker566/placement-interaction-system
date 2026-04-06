package com.placement.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

/**
 * Health check controller - matches GET /api in Node.js
 */
@RestController
@RequestMapping("/api")
public class HealthController {

    @GetMapping
    public ResponseEntity<?> health() {
        return ResponseEntity.ok(Map.of(
                "message", "Placement Portal API is running...",
                "status", "OK"
        ));
    }
}
