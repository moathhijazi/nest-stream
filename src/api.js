// api.js
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_SERVER_URL;

// Access token stored in memory
let accessToken = window.localStorage.getItem('accessToken') || null;

// Function to update the access token
export const setAccessToken = (token) => {
  accessToken = token;
  window.localStorage.setItem('accessToken', token); // optional persistence
};

// Create a single Axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true, // needed for httpOnly cookies
});

// Attach access token to every request
api.interceptors.request.use((config) => {
  if (accessToken) {
    config.headers['Authorization'] = `Bearer ${accessToken}`;
  }
  return config;
});

// Response interceptor to handle 401
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Only retry once
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Call refresh-token endpoint (httpOnly cookie sent automatically)
        const { data } = await api.post('/auth/refresh');

        // Update access token in memory
        setAccessToken(data.accessToken);

        // Retry the original request with the new token
        originalRequest.headers['Authorization'] = `Bearer ${data.accessToken}`;
        return api(originalRequest);
      } catch (err) {
        // Refresh token invalid → redirect to login
        
        
        window.location.href = '/login';
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

// Auth endpoints
export const AuthAPI = {
  login: (data) => api.post('/auth/login', data),
  logout: () => api.post('/auth/logout'),
  register: (data) => api.post('/auth/register', data),
  verify: () => api.get('/auth/verify'),
};

export default api;
