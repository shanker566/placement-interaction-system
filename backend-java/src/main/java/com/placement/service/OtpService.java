package com.placement.service;

import com.placement.entity.Otp;
import com.placement.repository.OtpRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.Random;

@Service
public class OtpService {

    @Autowired
    private OtpRepository otpRepository;

    @Autowired
    private EmailService emailService;

    /**
     * Generate and send an OTP to the given email
     */
    public void sendOtp(String email) {
        email = email.trim().toLowerCase();

        // Delete any existing OTPs for this email
        otpRepository.deleteByEmail(email);

        // Generate 6-digit OTP
        String otpCode = String.valueOf(100000 + new Random().nextInt(900000));

        Otp otp = new Otp();
        otp.setEmail(email);
        otp.setOtp(otpCode);
        otp.setCreatedAt(LocalDateTime.now());
        otpRepository.save(otp);

        // Send email
        String subject = "Your Verification Code";
        String text = "Your OTP for verification is: " + otpCode + ". It expires in 5 minutes.";
        String html = "<p>Your OTP for verification is: <strong>" + otpCode + "</strong>. It expires in 5 minutes.</p>";
        emailService.sendEmail(email, subject, text, html);
    }

    /**
     * Verify an OTP - returns true if valid and not expired
     */
    public boolean verifyOtp(String email, String enteredOtp) {
        email = email.trim().toLowerCase();
        Optional<Otp> otpRecord = otpRepository.findByEmailAndOtp(email, enteredOtp.trim());

        if (otpRecord.isEmpty()) {
            return false;
        }

        Otp otp = otpRecord.get();
        if (otp.isExpired()) {
            otpRepository.delete(otp);
            return false;
        }

        // Delete after successful verification (one-time use)
        otpRepository.delete(otp);
        return true;
    }
}
