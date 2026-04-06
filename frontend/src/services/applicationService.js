import API from './api';

// ---------------------------------------------------------------------------
// APPLICATION SERVICE
// Spring Boot controller: @RequestMapping("/api/applications")
// Full routes:
//   GET    /api/applications/my          — student: own applications
//   GET    /api/applications             — placement_officer/admin: all applications
//   GET    /api/applications/employer    — employer: applications for their jobs
//   GET    /api/applications/job/:jobId  — employer/admin/officer: by job
//   POST   /api/applications/:jobId      — student: apply (multipart with resume)
//   PUT    /api/applications/:id/status  — employer/officer/admin: update status
// ---------------------------------------------------------------------------

/**
 * Apply for a job.
 * Sends multipart/form-data with optional resume file + coverLetter text.
 */
const applyForJob = async (jobId, formData) => {
    const { data } = await API.post(`/applications/${jobId}`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return data;
};

/**
 * Get current student's applications.
 */
const getMyApplications = async () => {
    const { data } = await API.get('/applications/my');
    return data;
};

/**
 * Get all applications for a specific job (employer/admin/officer).
 */
const getJobApplications = async (jobId) => {
    const { data } = await API.get(`/applications/job/${jobId}`);
    return data;
};

/**
 * Get all applications for the logged-in employer's jobs.
 */
const getEmployerApplications = async () => {
    const { data } = await API.get('/applications/employer');
    return data;
};

/**
 * Get ALL applications — placement_officer / admin only.
 */
const getAllApplications = async () => {
    const { data } = await API.get('/applications');
    return data;
};

/**
 * Update application status (employer/officer/admin).
 * @param {string|number} id - application ID
 * @param {string} status - "pending" | "reviewed" | "shortlisted" | "rejected" | "accepted"
 */
const updateStatus = async (id, status) => {
    const { data } = await API.put(`/applications/${id}/status`, { status });
    return data;
};

const applicationService = {
    applyForJob,
    getMyApplications,
    getJobApplications,
    getEmployerApplications,
    getAllApplications,
    updateStatus,
};

export default applicationService;
