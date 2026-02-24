const User = require('../models/User');
const Job = require('../models/Job');
const Application = require('../models/Application');

// @desc    Get system statistics
// @route   GET /api/admin/stats
// @access  Private (Admin)
const getSystemStats = async (req, res) => {
    const totalUsers = await User.countDocuments();
    const totalStudents = await User.countDocuments({ role: 'student' });
    const totalEmployers = await User.countDocuments({ role: 'employer' });
    const totalJobs = await Job.countDocuments();
    const activeJobs = await Job.countDocuments({ status: 'active' });
    const totalApplications = await Application.countDocuments();

    res.json({
        totalUsers,
        totalStudents,
        totalEmployers,
        totalJobs,
        activeJobs,
        totalApplications
    });
};

// @desc    Approve employer
// @route   PUT /api/admin/approve-employer/:id
// @access  Private (Admin)
const approveEmployer = async (req, res) => {
    const user = await User.findById(req.params.id);

    if (user && user.role === 'employer') {
        user.isVerified = true; // Or a specific 'isApproved' field if needed
        await user.save();
        res.json({ message: 'Employer approved' });
    } else {
        res.status(404).json({ message: 'Employer not found' });
    }
};

module.exports = {
    getSystemStats,
    approveEmployer
};
