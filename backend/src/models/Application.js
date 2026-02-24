const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    job: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Job',
        required: true
    },
    resume: {
        type: String, // URL or path to the resume file
        required: true
    },
    status: {
        type: String,
        enum: ['applied', 'shortlisted', 'interview_scheduled', 'rejected', 'hired'],
        default: 'applied'
    },
    coverLetter: {
        type: String
    },
    employerFeedback: {
        type: String
    }
}, { timestamps: true });

// Prevent duplicate applications
applicationSchema.index({ student: 1, job: 1 }, { unique: true });

module.exports = mongoose.model('Application', applicationSchema);
