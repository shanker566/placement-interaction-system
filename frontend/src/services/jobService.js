import API from './api';

// ---------------------------------------------------------------------------
// JOB SERVICE
// Spring Boot controller: @RequestMapping("/api/jobs")
// Full routes:
//   GET    /api/jobs                — public, list/search jobs
//   GET    /api/jobs/myjobs         — employer: own jobs
//   GET    /api/jobs/:id            — public, single job
//   POST   /api/jobs                — employer/admin: create job
//   PUT    /api/jobs/:id            — employer/admin: update job
//   DELETE /api/jobs/:id            — employer/admin: delete job
// ---------------------------------------------------------------------------

const getJobs = async (keyword = '', pageNumber = 1, filters = {}) => {
    const params = new URLSearchParams();
    if (keyword)    params.append('keyword', keyword);
    if (pageNumber) params.append('pageNumber', pageNumber);
    if (filters.location) params.append('location', filters.location);
    if (filters.company)  params.append('company', filters.company);
    if (filters.type)     params.append('type', filters.type);

    const { data } = await API.get(`/jobs?${params.toString()}`);
    return data;
};

const getJobById = async (id) => {
    const { data } = await API.get(`/jobs/${id}`);
    return data;
};

const createJob = async (jobData) => {
    const { data } = await API.post('/jobs', jobData);
    return data;
};

const updateJob = async (id, jobData) => {
    const { data } = await API.put(`/jobs/${id}`, jobData);
    return data;
};

const deleteJob = async (id) => {
    const { data } = await API.delete(`/jobs/${id}`);
    return data;
};

const getMyJobs = async () => {
    const { data } = await API.get('/jobs/myjobs');
    return data;
};

const jobService = {
    getJobs,
    getJobById,
    createJob,
    updateJob,
    deleteJob,
    getMyJobs,
};

export default jobService;
