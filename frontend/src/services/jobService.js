import api from './api';

const getJobs = async (keyword = '', pageNumber = '', filters = {}) => {
    const queryParams = new URLSearchParams({
        keyword,
        pageNumber,
        ...filters
    }).toString();
    const { data } = await api.get(`/jobs?${queryParams}`);
    return data;
};

const getJobById = async (id) => {
    const { data } = await api.get(`/jobs/${id}`);
    return data;
};

const createJob = async (jobData) => {
    const { data } = await api.post('/jobs', jobData);
    return data;
};

const updateJob = async (id, jobData) => {
    const { data } = await api.put(`/jobs/${id}`, jobData);
    return data;
};

const deleteJob = async (id) => {
    const { data } = await api.delete(`/jobs/${id}`);
    return data;
};

const getMyJobs = async () => {
    const { data } = await api.get('/jobs/myjobs');
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
