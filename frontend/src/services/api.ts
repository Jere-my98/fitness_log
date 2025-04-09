import { refreshToken } from "@/services/authService";
import axios from "axios";

export const BASE_URL = "http://localhost:8000/";
export const LOGIN_URL = `${BASE_URL}login/`;
export const LOGOUT_URL = `${BASE_URL}logout/`;
export const REGISTER_URL = `${BASE_URL}register/`;
export const REFRESH_TOKEN_URL = `${BASE_URL}api/token/refresh/`;


// Axios instance with default configurations
const axiosInstance = axios.create({
    baseURL: BASE_URL, // Base URL for all requests
    withCredentials: true, // Include cookies in requests
    timeout:10000,
});

// Add a request interceptor to include the access token in headers
axiosInstance.interceptors.request.use(
    (config) => {
        const csrfToken = document.cookie.match(/csrftoken=([^;]+)/)?.[1];
        if (csrfToken && ['post', 'put', 'patch', 'delete'].includes(config.method?.toLowerCase() || '')) {
            config.headers['X-CSRFToken'] = csrfToken;
        }
        // You can modify the request config here (e.g., add headers)
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor to handle token refresh
axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // If the error is due to an expired token (401) and it's not a retry request
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true; // Mark the request as retried

            try {
                // Refresh the access token
                await refreshToken();

                // Retry the original request
                return axiosInstance(originalRequest);
            } catch (err) {
                // If token refresh fails, redirect to login
                window.location.href = "/login";
                return Promise.reject(err);
            }
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;