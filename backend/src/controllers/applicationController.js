const Application = require('../models/Application');
const Job = require('../models/Job');
const Resume = require('../models/Resume');

// @desc    Apply for a job
// @route   POST /api/applications/:jobId
// @access  Private (Student)
const applyForJob = async (req, res) => {
    const jobId = req.params.jobId;
    const studentId = req.user._id;

    const job = await Job.findById(jobId);
    if (!job) {
        return res.status(404).json({ message: 'Job not found' });
    }

    const alreadyApplied = await Application.findOne({ job: jobId, student: studentId });
    if (alreadyApplied) {
        return res.status(400).json({ message: 'You have already applied for this job' });
    }

    if (!req.file) {
        return res.status(400).json({ message: 'Resume is required' });
    }

    // Save Resume Info
    const resume = await Resume.create({
        user: studentId,
        filename: req.file.filename,
        path: req.file.path,
        mimetype: req.file.mimetype,
        size: req.file.size
    });

    // Create Application
    const application = await Application.create({
        student: studentId,
        job: jobId,
        resume: resume.path, // Storing path or file URL
        coverLetter: req.body.coverLetter
    });

    res.status(201).json(application);
};

// @desc    Get my applications
// @route   GET /api/applications/my
// @access  Private (Student)
const getMyApplications = async (req, res) => {
    const applications = await Application.find({ student: req.user._id })
        .populate('job', 'title company location status type');
    res.json(applications);
};

// @desc    Get applications for a job
// @route   GET /api/applications/job/:jobId
// @access  Private (Employer)
const getJobApplications = async (req, res) => {
    const job = await Job.findById(req.params.jobId);

    if (!job) {
        return res.status(404).json({ message: 'Job not found' });
    }

    if (job.postedBy.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
        return res.status(401).json({ message: 'Not authorized' });
    }

    const applications = await Application.find({ job: req.params.jobId })
        .populate('student', 'username email profile') // Populate student details
        .populate('job', 'title company'); // Added job population

    res.json(applications);
};

// @desc    Update application status
// @route   PUT /api/applications/:id/status
// @access  Private (Employer/Placement Officer)
const updateApplicationStatus = async (req, res) => {
    const { status } = req.body;
    const application = await Application.findById(req.params.id).populate('job');

    if (!application) {
        return res.status(404).json({ message: 'Application not found' });
    }

    const job = await Job.findById(application.job._id);

    // Verify ownership
    if (job.postedBy.toString() !== req.user._id.toString() &&
        req.user.role !== 'admin' &&
        req.user.role !== 'placement_officer') {
        return res.status(401).json({ message: 'Not authorized' });
    }

    application.status = status;
    const updatedApplication = await application.save();

    // Optional: Send email notification to student about status change

    res.json(updatedApplication);
};

// @desc    Get all applications (for admins / placement officers)
// @route   GET /api/applications
// @access  Private (Placement Officer / Admin)
const getAllApplications = async (req, res) => {
    const applications = await Application.find({})
        .populate('student', 'username email profile')
        .populate('job', 'title company location');

    res.json(applications);
};

// @desc    Get applications for jobs posted by the logged-in employer
// @route   GET /api/applications/employer
// @access  Private (Employer)
const getEmployerApplications = async (req, res) => {
    // Find jobs posted by this employer
    const jobs = await Job.find({ postedBy: req.user._id }).select('_id');
    const jobIds = jobs.map(j => j._id);

    const applications = await Application.find({ job: { $in: jobIds } })
        .populate('student', 'username email profile')
        .populate('job', 'title company location');

    res.json(applications);
};

module.exports = {
    applyForJob,
    getMyApplications,
    getJobApplications,
    updateApplicationStatus
    , getAllApplications,
    getEmployerApplications
};
