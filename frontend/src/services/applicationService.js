import api from './api';

const applyForJob = async (jobId, formData) => {
    const { data } = await api.post(`/applications/${jobId}`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return data;
};

const getMyApplications = async () => {
    const { data } = await api.get('/applications/my');
    return data;
};

const getJobApplications = async (jobId) => {
    const { data } = await api.get(`/applications/job/${jobId}`);
    return data;
};

const getEmployerApplications = async () => {
    const { data } = await api.get('/applications/employer');
    return data;
};

const updateStatus = async (id, status) => {
    const { data } = await api.put(`/applications/${id}/status`, { status });
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
