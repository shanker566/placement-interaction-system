const User = require('../models/User');
const generateToken = require('../utils/generateToken');
const { hashPassword, matchPassword } = require('../utils/hashPassword');
const { generateOTP, sendOTP, verifyOTP } = require('../services/otpService');
const { validateEmail, validatePassword } = require('../utils/validators');

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
const registerUser = async (req, res) => {
    const { username, email, password, role, ...otherDetails } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ message: 'Please fill in all required fields' });
    }

    if (!validateEmail(email)) {
        return res.status(400).json({ message: 'Invalid email format' });
    }

    if (!validatePassword(password)) {
        return res.status(400).json({ message: 'Password must be at least 6 characters' });
    }

    const userExists = await User.findOne({ email });

    if (userExists) {
        return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await hashPassword(password);

    // Create user with isVerified: false
    const user = await User.create({
        username,
        email,
        password: hashedPassword,
        role: role || 'student',
        isVerified: false,
        profile: otherDetails
    });

    if (user) {
        // Send OTP
        await sendOTP(user.email);

        res.status(201).json({
            _id: user._id,
            username: user.username,
            email: user.email,
            role: user.role,
            message: 'Registration successful. please verify your email with the OTP sent.'
        });
    } else {
        res.status(400).json({ message: 'Invalid user data' });
    }
};

// @desc    Verify OTP and activate account
// @route   POST /api/auth/verify-otp
// @access  Public
const verifyEmail = async (req, res) => {
    const { email, otp } = req.body;

    const isValid = await verifyOTP(email, otp);

    if (isValid) {
        const user = await User.findOne({ email });
        if (user) {
            user.isVerified = true;
            await user.save();

            res.json({
                _id: user._id,
                username: user.username,
                email: user.email,
                role: user.role,
                token: generateToken(user._id, user.role),
                message: 'Email verified successfully'
            });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } else {
        res.status(400).json({ message: 'Invalid or expired OTP' });
    }
};

// @desc    Auth user & get token
// @route   POST /api/auth/login
// @access  Public
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await matchPassword(password, user.password))) {
        res.json({
            _id: user._id,
            username: user.username,
            email: user.email,
            role: user.role,
            token: generateToken(user._id, user.role)
        });
    } else {
        res.status(401).json({ message: 'Invalid email or password' });
    }
};

// @desc    Forgot Password - Send OTP
// @route   POST /api/auth/forgot-password
// @access  Public
const forgotPassword = async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    await sendOTP(email);
    res.json({ message: 'OTP sent to your email' });
};

// @desc    Reset Password
// @route   POST /api/auth/reset-password
// @access  Public
const resetPassword = async (req, res) => {
    const { email, otp, newPassword } = req.body;
    const isValid = await verifyOTP(email, otp);

    if (isValid) {
        const user = await User.findOne({ email });
        user.password = await hashPassword(newPassword);
        await user.save();
        res.json({ message: 'Password updated successfully' });
    } else {
        res.status(400).json({ message: 'Invalid OTP' });
    }
};

module.exports = {
    registerUser,
    loginUser,
    verifyEmail,
    forgotPassword,
    resetPassword
};
