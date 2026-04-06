import API from './api';

const login = async (email, password) => {
    const { data } = await API.post('/api/auth/login', { email, password });
    localStorage.setItem('userInfo', JSON.stringify(data));
    return data;
};

const register = async (userData) => {
    const { data } = await API.post('/api/auth/register', userData);
    return data;
};

const verifyOTP = async (email, otp) => {
    const { data } = await API.post('/api/auth/verify-otp', { email, otp });
    localStorage.setItem('userInfo', JSON.stringify(data));
    return data;
};

const logout = () => {
    localStorage.removeItem('userInfo');
};

const forgotPassword = async (email) => {
    const { data } = await API.post('/api/auth/forgot-password', { email });
    return data;
};

const resetPassword = async (email, otp, newPassword) => {
    const { data } = await API.post('/api/auth/reset-password', { email, otp, newPassword });
    return data;
};

const authService = {
    login,
    register,
    verifyOTP,
    logout,
    forgotPassword,
    resetPassword,
};

export default authService;
