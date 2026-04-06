import axios from 'axios';

const API = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add a request interceptor
API.interceptors.request.use(
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
API.interceptors.response.use(
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

export default API;
