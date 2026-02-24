import axios from 'axios';

// Use absolute backend URL in development to avoid occasional Vite proxy issues.
const baseURL = (import.meta.env && import.meta.env.DEV)
    ? 'http://localhost:5000/api'
    : '/api';

const api = axios.create({
    baseURL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add a request interceptor
api.interceptors.request.use(
    (config) => {
        const userInfo = localStorage.getItem('userInfo');
        if (userInfo) {
            const { token } = JSON.parse(userInfo);
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Add a response interceptor (optional: handle 401s)
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response) {
            console.error('[API] Response error:', error.response.status, error.response.config.url, error.response.data);
            if (error.response.status === 401) {
                // Optional: handle global unauthenticated state
            }
        } else {
            console.error('[API] Network / CORS error or no response received', error.message);
        }
        return Promise.reject(error);
    }
);

export default api;
