import API from './api';

const applyForJob = async (jobId, formData) => {
    const { data } = await API.post(`/api/applications/${jobId}`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return data;
};

const getMyApplications = async () => {
    const { data } = await API.get('/api/applications/my');
    return data;
};

const getJobApplications = async (jobId) => {
    const { data } = await API.get(`/api/applications/job/${jobId}`);
    return data;
};

const getEmployerApplications = async () => {
    const { data } = await API.get('/api/applications/employer');
    return data;
};

const updateStatus = async (id, status) => {
    const { data } = await API.put(`/api/applications/${id}/status`, { status });
    return data;
};

const applicationService = {
    applyForJob,
    getMyApplications,
    getJobApplications,
    getEmployerApplications,
    updateStatus
};

export default applicationService;
