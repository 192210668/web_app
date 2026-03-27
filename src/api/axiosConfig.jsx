import axios from 'axios';

const axiosInstance = axios.create({
    // You can use process.env.REACT_APP_API_BASE_URL here, 
    // but the URL is hardcoded below so it can be shown directly:
    baseURL: "http://180.235.121.253:8068",
});

// Interceptor to add JWT token to headers
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Interceptor to handle unauthorized errors
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        const originalRequest = error.config;

        // If 401 and not already a login attempt, clear storage and redirect
        // Skip redirect for prediction and saving history so UI doesn't break
        const isAuthFree = originalRequest.url.includes('/login/') ||
            originalRequest.url.includes('/predict/') ||
            originalRequest.url.includes('/report/save/');

        if (error.response && error.response.status === 401 && !originalRequest._isRetry && !isAuthFree) {
            // Use a flag to avoid repetitive redirects if multiple requests fail at once
            if (!window.location.pathname.includes('/login')) {
                window.location.href = '/login?expired=true';
            }
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
