import API from './api';

const getJobs = async (keyword = '', pageNumber = '', filters = {}) => {
    const queryParams = new URLSearchParams({
        keyword,
        pageNumber,
        ...filters
    }).toString();
    const { data } = await API.get(`/api/jobs?${queryParams}`);
    return data;
};

const getJobById = async (id) => {
    const { data } = await API.get(`/api/jobs/${id}`);
    return data;
};

const createJob = async (jobData) => {
    const { data } = await API.post('/api/jobs', jobData);
    return data;
};

const updateJob = async (id, jobData) => {
    const { data } = await API.put(`/api/jobs/${id}`, jobData);
    return data;
};

const deleteJob = async (id) => {
    const { data } = await API.delete(`/api/jobs/${id}`);
    return data;
};

const getMyJobs = async () => {
    const { data } = await API.get('/api/jobs/myjobs');
    return data;
};

const jobService = {
    getJobs,
    getJobById,
    createJob,
    updateJob,
    deleteJob,
    getMyJobs
};

export default jobService;
