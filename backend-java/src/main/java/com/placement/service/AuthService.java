package com.placement.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.placement.dto.AuthDto;
import com.placement.entity.User;
import com.placement.repository.UserRepository;
import com.placement.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private OtpService otpService;

    private final ObjectMapper objectMapper = new ObjectMapper();

    /**
     * Register a new user
     */
    public AuthDto.AuthResponse register(AuthDto.RegisterRequest request) {
        // Validate required fields
        if (request.getUsername() == null || request.getEmail() == null || request.getPassword() == null) {
            throw new RuntimeException("Please fill in all required fields");
        }
        if (!isValidEmail(request.getEmail())) {
            throw new RuntimeException("Invalid email format");
        }
        if (request.getPassword().length() < 6) {
            throw new RuntimeException("Password must be at least 6 characters");
        }
        if (userRepository.existsByEmail(request.getEmail().toLowerCase())) {
            throw new RuntimeException("User already exists");
        }

        User user = new User();
        user.setUsername(request.getUsername());
        user.setEmail(request.getEmail().toLowerCase().trim());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setIsVerified(false);

        // Parse role
        if (request.getRole() != null) {
            try {
                user.setRole(User.Role.valueOf(request.getRole()));
            } catch (IllegalArgumentException e) {
                user.setRole(User.Role.student);
            }
        }

        // Map profile fields
        if (request.getProfile() != null) {
            applyProfileFields(user, request.getProfile());
        }

        user = userRepository.save(user);

        // Send OTP
        otpService.sendOtp(user.getEmail());

        AuthDto.AuthResponse response = new AuthDto.AuthResponse();
        response.set_id(user.getId());
        response.setUsername(user.getUsername());
        response.setEmail(user.getEmail());
        response.setRole(user.getRole().name());
        response.setMessage("Registration successful. please verify your email with the OTP sent.");
        return response;
    }

    /**
     * Login a user
     */
    public AuthDto.AuthResponse login(AuthDto.LoginRequest request) {
        User user = userRepository.findByEmail(request.getEmail().toLowerCase().trim())
                .orElseThrow(() -> new RuntimeException("Invalid email or password"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid email or password");
        }

        String token = jwtUtil.generateToken(user.getId(), user.getRole().name());

        AuthDto.AuthResponse response = new AuthDto.AuthResponse();
        response.set_id(user.getId());
        response.setUsername(user.getUsername());
        response.setEmail(user.getEmail());
        response.setRole(user.getRole().name());
        response.setToken(token);
        return response;
    }

    /**
     * Verify OTP and activate user account
     */
    public AuthDto.AuthResponse verifyEmail(AuthDto.VerifyOtpRequest request) {
        boolean valid = otpService.verifyOtp(request.getEmail(), request.getOtp());
        if (!valid) {
            throw new RuntimeException("Invalid or expired OTP");
        }

        User user = userRepository.findByEmail(request.getEmail().toLowerCase().trim())
                .orElseThrow(() -> new RuntimeException("User not found"));
        user.setIsVerified(true);
        userRepository.save(user);

        String token = jwtUtil.generateToken(user.getId(), user.getRole().name());

        AuthDto.AuthResponse response = new AuthDto.AuthResponse();
        response.set_id(user.getId());
        response.setUsername(user.getUsername());
        response.setEmail(user.getEmail());
        response.setRole(user.getRole().name());
        response.setToken(token);
        response.setMessage("Email verified successfully");
        return response;
    }

    /**
     * Forgot password - send OTP
     */
    public void forgotPassword(String email) {
        userRepository.findByEmail(email.toLowerCase().trim())
                .orElseThrow(() -> new RuntimeException("User not found"));
        otpService.sendOtp(email);
    }

    /**
     * Reset password
     */
    public void resetPassword(AuthDto.ResetPasswordRequest request) {
        boolean valid = otpService.verifyOtp(request.getEmail(), request.getOtp());
        if (!valid) {
            throw new RuntimeException("Invalid OTP");
        }

        User user = userRepository.findByEmail(request.getEmail().toLowerCase().trim())
                .orElseThrow(() -> new RuntimeException("User not found"));
        user.setPassword(passwordEncoder.encode(request.getNewPassword()));
        userRepository.save(user);
    }

    // ---- Helpers ----

    private boolean isValidEmail(String email) {
        return email != null && email.matches("^[^@\\s]+@[^@\\s]+\\.[^@\\s]+$");
    }

    public void applyProfileFields(User user, Map<String, Object> profile) {
        if (profile.containsKey("firstName")) user.setFirstName((String) profile.get("firstName"));
        if (profile.containsKey("lastName")) user.setLastName((String) profile.get("lastName"));
        if (profile.containsKey("phone")) user.setPhone((String) profile.get("phone"));
        if (profile.containsKey("address")) user.setAddress((String) profile.get("address"));
        if (profile.containsKey("cgpa")) {
            Object cgpa = profile.get("cgpa");
            if (cgpa instanceof Number) user.setCgpa(((Number) cgpa).doubleValue());
        }
        if (profile.containsKey("department")) user.setDepartment((String) profile.get("department"));
        if (profile.containsKey("year")) user.setYear((String) profile.get("year"));
        if (profile.containsKey("skills")) {
            try {
                user.setSkills(objectMapper.writeValueAsString(profile.get("skills")));
            } catch (Exception e) {
                user.setSkills("[]");
            }
        }
        if (profile.containsKey("companyName")) user.setCompanyName((String) profile.get("companyName"));
        if (profile.containsKey("companyWebsite")) user.setCompanyWebsite((String) profile.get("companyWebsite"));
    }
}
