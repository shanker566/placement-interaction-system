const { generatePlacementReport } = require('../services/reportService');
const Application = require('../models/Application');

// @desc    Get placement analytics
// @route   GET /api/placement/analytics
// @access  Private (Placement Officer)
const getPlacementAnalytics = async (req, res) => {
    try {
        const report = await generatePlacementReport();
        res.json(report);
    } catch (error) {
        res.status(500).json({ message: 'Error generating report' });
    }
};

// @desc    Get all records
// @route   GET /api/placement/records
// @access  Private (Placement Officer)
const getPlacementRecords = async (req, res) => {
    const records = await Application.find({ status: 'hired' })
        .populate('student', 'username email profile')
        .populate('job', 'title company salaryRange');

    res.json(records);
};

module.exports = {
    getPlacementAnalytics,
    getPlacementRecords
};
