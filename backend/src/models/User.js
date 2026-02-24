const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['admin', 'student', 'employer', 'placement_officer'],
        default: 'student'
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    profile: {
        firstName: String,
        lastName: String,
        phone: String,
        address: String,
        // Specific to students
        cgpa: Number,
        department: String,
        year: String,
        skills: [String],
        // Specific to employers
        companyName: String,
        companyWebsite: String
    }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
