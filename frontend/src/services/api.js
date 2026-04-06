import axios from 'axios';

// ---------------------------------------------------------------------------
// Centralized Axios Instance
// Base URL = VITE_API_URL (set in .env) + "/api"
// e.g. https://placement-interaction-system-new.onrender.com/api
// ---------------------------------------------------------------------------
const API = axios.create({
    baseURL: import.meta.env.VITE_API_URL + '/api',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 15000, // 15 second timeout (Render cold-starts can be slow)
});

// ---------------------------------------------------------------------------
// REQUEST INTERCEPTOR — attach JWT token from localStorage
// ---------------------------------------------------------------------------
API.interceptors.request.use(
    (config) => {
        const userInfo = localStorage.getItem('userInfo');
        if (userInfo) {
            try {
                const { token } = JSON.parse(userInfo);
                if (token) {
                    config.headers.Authorization = `Bearer ${token}`;
                }
            } catch {
                // corrupted localStorage — clear it
                localStorage.removeItem('userInfo');
            }
        }
        console.log(`[API] ${config.method?.toUpperCase()} ${config.baseURL}${config.url}`);
        return config;
    },
    (error) => {
        console.error('[API] Request setup error:', error.message);
        return Promise.reject(error);
    }
);

// ---------------------------------------------------------------------------
// RESPONSE INTERCEPTOR — unified error logging & 401/403 handling
// ---------------------------------------------------------------------------
API.interceptors.response.use(
    (response) => {
        console.log(`[API] ✓ ${response.status} ${response.config.url}`);
        return response;
    },
    (error) => {
        if (error.response) {
            const { status, config, data } = error.response;
            console.error(`[API] ✗ ${status} ${config?.url}`, data);

            if (status === 401) {
                console.warn('[API] Unauthorized — clearing session');
                localStorage.removeItem('userInfo');
                // Only redirect if not already on auth page
                if (!window.location.pathname.startsWith('/login')) {
                    window.location.href = '/login';
                }
            }

            if (status === 403) {
                console.warn('[API] Forbidden — insufficient permissions for:', config?.url);
            }
        } else if (error.code === 'ECONNABORTED') {
            console.error('[API] Request timed out — server may be waking up (Render cold start)');
        } else {
            console.error('[API] Network / CORS error — no response received:', error.message);
            console.error('[API] Check that backend is running at:', import.meta.env.VITE_API_URL);
        }
        return Promise.reject(error);
    }
);

export default API;
