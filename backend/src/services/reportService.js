const Job = require('../models/Job');
const Application = require('../models/Application');
const User = require('../models/User');

const generatePlacementReport = async () => {
    const totalStudents = await User.countDocuments({ role: 'student' });
    const totalJobs = await Job.countDocuments();
    const totalApplications = await Application.countDocuments();
    const hiredStudents = await Application.countDocuments({ status: 'hired' });

    return {
        totalStudents,
        totalJobs,
        totalApplications,
        hiredStudents,
        placementRate: totalStudents > 0 ? ((hiredStudents / totalStudents) * 100).toFixed(2) + '%' : '0%'
    };
};

module.exports = {
    generatePlacementReport
};
