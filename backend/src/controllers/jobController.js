const Job = require('../models/Job');

// @desc    Create a job
// @route   POST /api/jobs
// @access  Private (Employer)
const createJob = async (req, res) => {
    const { title, description, company, location, requirements, salaryRange, type, deadline } = req.body;

    const job = await Job.create({
        title,
        description,
        company,
        location,
        requirements,
        salaryRange,
        type,
        deadline,
        postedBy: req.user._id
    });

    res.status(201).json(job);
};

// @desc    Get all jobs
// @route   GET /api/jobs
// @access  Public
const getJobs = async (req, res) => {
    try {
        const pageSize = 10;
        const page = Number(req.query.pageNumber) || 1;

        const keyword = req.query.keyword
            ? {
                $or: [
                    { title: { $regex: req.query.keyword, $options: 'i' } },
                    { description: { $regex: req.query.keyword, $options: 'i' } },
                    { company: { $regex: req.query.keyword, $options: 'i' } },
                    { 'requirements': { $regex: req.query.keyword, $options: 'i' } }
                ]
            }
            : {};

        const filters = {};
        if (req.query.location) {
            try {
                filters.location = { $regex: req.query.location, $options: 'i' };
            } catch (e) {
                // Ignore invalid regex in filters
            }
        }
        if (req.query.company) {
            try {
                filters.company = { $regex: req.query.company, $options: 'i' };
            } catch (e) { }
        }
        if (req.query.type && req.query.type !== 'All') {
            filters.type = req.query.type;
        }

        const query = { ...keyword, ...filters };

        const count = await Job.countDocuments(query);
        const jobs = await Job.find(query)
            .limit(pageSize)
            .skip(pageSize * (page - 1))
            .populate('postedBy', 'username companyName')
            .sort({ createdAt: -1 });

        res.json({ jobs, page, pages: Math.ceil(count / pageSize) });
    } catch (error) {
        res.status(500).json({ message: 'Server Error fetching jobs', error: error.message });
    }
};

// @desc    Get job by ID
// @route   GET /api/jobs/:id
// @access  Public
const getJobById = async (req, res) => {
    const job = await Job.findById(req.params.id).populate('postedBy', 'username companyName');

    if (job) {
        res.json(job);
    } else {
        res.status(404).json({ message: 'Job not found' });
    }
};

// @desc    Update job
// @route   PUT /api/jobs/:id
// @access  Private (Employer/Admin)
const updateJob = async (req, res) => {
    const job = await Job.findById(req.params.id);

    if (job) {
        if (job.postedBy.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
            return res.status(401).json({ message: 'Not authorized to update this job' });
        }

        job.title = req.body.title || job.title;
        job.description = req.body.description || job.description;
        job.status = req.body.status || job.status;

        const updatedJob = await job.save();
        res.json(updatedJob);
    } else {
        res.status(404).json({ message: 'Job not found' });
    }
};

// @desc    Delete job
// @route   DELETE /api/jobs/:id
// @access  Private (Employer/Admin)
const deleteJob = async (req, res) => {
    const job = await Job.findById(req.params.id);

    if (job) {
        if (job.postedBy.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
            return res.status(401).json({ message: 'Not authorized to delete this job' });
        }

        await job.deleteOne();
        res.json({ message: 'Job removed' });
    } else {
        res.status(404).json({ message: 'Job not found' });
    }
};

// @desc    Get jobs posted by employer
// @route   GET /api/jobs/myjobs
// @access  Private (Employer)
const getMyJobs = async (req, res) => {
    const jobs = await Job.find({ postedBy: req.user._id });
    res.json(jobs);
};

module.exports = {
    createJob,
    getJobs,
    getJobById,
    updateJob,
    deleteJob,
    getMyJobs
};
