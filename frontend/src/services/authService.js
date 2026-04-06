import API from './api';

// ---------------------------------------------------------------------------
// AUTH SERVICE
// All paths are relative to baseURL = VITE_API_URL + "/api"
// Spring Boot controller: @RequestMapping("/api/auth")
// Full routes hit:
//   POST /api/auth/login
//   POST /api/auth/register
//   POST /api/auth/verify-otp
//   POST /api/auth/forgot-password
//   POST /api/auth/reset-password
// ---------------------------------------------------------------------------

/**
 * Login user.
 * Backend: POST /api/auth/login
 * Request:  { email, password }
 * Response: { _id, username, email, role, token, message }
 */
const login = async (email, password) => {
    console.log('[Auth] Attempting login for:', email);
    try {
        const { data } = await API.post('/auth/login', { email, password });
        if (!data.token) {
            throw new Error(data.message || 'Login failed — no token received');
        }
        localStorage.setItem('userInfo', JSON.stringify(data));
        console.log('[Auth] Login successful, role:', data.role);
        return data;
    } catch (err) {
        const message = err.response?.data?.message || err.message || 'Login failed';
        console.error('[Auth] Login error:', message);
        throw err;
    }
};

/**
 * Register a new user.
 * Backend: POST /api/auth/register
 * Request:  { username, email, password, role }
 * Response: { message } — user must verify OTP before getting token
 */
const register = async (userData) => {
    console.log('[Auth] Registering user:', userData.email, '| Role:', userData.role);
    try {
        const { data } = await API.post('/auth/register', userData);
        console.log('[Auth] Registration response:', data.message);
        return data;
    } catch (err) {
        const message = err.response?.data?.message || err.message || 'Registration failed';
        console.error('[Auth] Registration error:', message);
        throw err;
    }
};

/**
 * Verify OTP after registration.
 * Backend: POST /api/auth/verify-otp
 * Request:  { email, otp }
 * Response: { _id, username, email, role, token, message }
 */
const verifyOTP = async (email, otp) => {
    console.log('[Auth] Verifying OTP for:', email);
    try {
        const { data } = await API.post('/auth/verify-otp', { email, otp });
        localStorage.setItem('userInfo', JSON.stringify(data));
        console.log('[Auth] OTP verified, role:', data.role);
        return data;
    } catch (err) {
        const message = err.response?.data?.message || err.message || 'OTP verification failed';
        console.error('[Auth] OTP verify error:', message);
        throw err;
    }
};

/**
 * Logout — clears local session only.
 */
const logout = () => {
    localStorage.removeItem('userInfo');
    console.log('[Auth] Logged out');
};

/**
 * Request a password-reset OTP email.
 * Backend: POST /api/auth/forgot-password
 * Request:  { email }
 */
const forgotPassword = async (email) => {
    console.log('[Auth] Requesting password reset for:', email);
    const { data } = await API.post('/auth/forgot-password', { email });
    return data;
};

/**
 * Reset password using OTP.
 * Backend: POST /api/auth/reset-password
 * Request:  { email, otp, newPassword }
 */
const resetPassword = async (email, otp, newPassword) => {
    console.log('[Auth] Resetting password for:', email);
    const { data } = await API.post('/auth/reset-password', { email, otp, newPassword });
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
