package com.placement.controller;

import com.placement.dto.UserDto;
import com.placement.security.UserPrincipal;
import com.placement.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

/**
 * User controller - matches all /api/users/* endpoints from Node.js
 */
@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    // GET /api/users/profile
    @GetMapping("/profile")
    public ResponseEntity<?> getUserProfile(@AuthenticationPrincipal UserPrincipal principal) {
        try {
            UserDto.UserResponse response = userService.getUserProfile(principal.getId());
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("message", e.getMessage()));
        }
    }

    // PUT /api/users/profile
    @PutMapping("/profile")
    public ResponseEntity<?> updateUserProfile(
            @AuthenticationPrincipal UserPrincipal principal,
            @RequestBody UserDto.UpdateProfileRequest request) {
        try {
            UserDto.UserResponse response = userService.updateUserProfile(principal.getId(), request);
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("message", e.getMessage()));
        }
    }

    // GET /api/users (admin/placement_officer only)
    @GetMapping
    public ResponseEntity<?> getAllUsers(@AuthenticationPrincipal UserPrincipal principal) {
        String role = principal.getRole();
        if (!role.equals("admin") && !role.equals("placement_officer")) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body(Map.of("message", "User role " + role + " is not authorized to access this route"));
        }
        List<UserDto.UserResponse> users = userService.getAllUsers();
        return ResponseEntity.ok(users);
    }

    // DELETE /api/users/:id (admin only)
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteUser(
            @PathVariable Long id,
            @AuthenticationPrincipal UserPrincipal principal) {
        if (!principal.getRole().equals("admin")) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body(Map.of("message", "Not authorized"));
        }
        try {
            userService.deleteUser(id);
            return ResponseEntity.ok(Map.of("message", "User removed"));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("message", e.getMessage()));
        }
    }
}
