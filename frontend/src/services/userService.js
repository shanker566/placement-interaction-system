import API from './api';

const getProfile = async () => {
    const { data } = await API.get('/api/users/profile');
    return data;
};

const updateProfile = async (userData) => {
    const { data } = await API.put('/api/users/profile', userData);
    // Update local storage if critical info changed
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const newUserInfo = { ...userInfo, ...data };
    localStorage.setItem('userInfo', JSON.stringify(newUserInfo));
    return data;
};

const getAllUsers = async () => {
    const { data } = await API.get('/api/users');
    return data;
};

const deleteUser = async (id) => {
    const { data } = await API.delete(`/api/users/${id}`);
    return data;
};

const userService = {
    getProfile,
    updateProfile,
    getAllUsers,
    deleteUser
};

export default userService;
