const OTP = require('../models/OTP');
const sendEmail = require('./emailService');

const generateOTP = async (email) => {
    // normalize email to match storage (lowercase + trimmed)
    email = String(email).trim().toLowerCase();
    // Generate 6-digit random number
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Delete any existing OTPs for this email to avoid duplicates/confusion
    await OTP.deleteMany({ email });

    // Create new OTP
    await OTP.create({
        email,
        otp
    });

    return otp;
};

const sendOTP = async (email) => {
    const otp = await generateOTP(email);
    const subject = 'Your Verification Code';
    const message = `Your OTP for verification is: ${otp}. It expires in 5 minutes.`;

    await sendEmail(email, subject, message, `<p>Your OTP for verification is: <strong>${otp}</strong>. It expires in 5 minutes.</p>`);
};

const verifyOTP = async (email, enteredOTP) => {
    // normalize email before lookup
    email = String(email).trim().toLowerCase();
    const otpRecord = await OTP.findOne({ email, otp: String(enteredOTP).trim() });
    if (!otpRecord) {
        return false;
    }
    // Delete OTP after successful verification
    await OTP.deleteOne({ _id: otpRecord._id });
    return true;
};

module.exports = {
    generateOTP,
    sendOTP,
    verifyOTP
};
