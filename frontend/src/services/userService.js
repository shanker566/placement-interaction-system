import API from './api';

// ---------------------------------------------------------------------------
// USER SERVICE
// Spring Boot controller: @RequestMapping("/api/users")
// Full routes:
//   GET    /api/users/profile       — authenticated: get own profile
//   PUT    /api/users/profile       — authenticated: update own profile
//   GET    /api/users               — admin/placement_officer: all users
//   DELETE /api/users/:id           — admin: delete user
// ---------------------------------------------------------------------------

const getProfile = async () => {
    const { data } = await API.get('/users/profile');
    return data;
};

const updateProfile = async (userData) => {
    const { data } = await API.put('/users/profile', userData);
    // Merge updated fields back into localStorage
    try {
        const existing = JSON.parse(localStorage.getItem('userInfo') || '{}');
        const merged = { ...existing, ...data };
        localStorage.setItem('userInfo', JSON.stringify(merged));
    } catch {
        // ignore parse errors
    }
    return data;
};

const getAllUsers = async () => {
    const { data } = await API.get('/users');
    return data;
};

const deleteUser = async (id) => {
    const { data } = await API.delete(`/users/${id}`);
    return data;
};

const userService = {
    getProfile,
    updateProfile,
    getAllUsers,
    deleteUser,
};

export default userService;
