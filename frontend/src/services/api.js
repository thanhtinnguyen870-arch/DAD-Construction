import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
});

// Request interceptor: attach auth token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('adminToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor: handle 401/403 (token expired or unauthorized)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 || error.response?.status === 403) {
      // Only redirect if we're in an admin route
      if (window.location.pathname.startsWith('/admin') && window.location.pathname !== '/admin/login') {
        localStorage.removeItem('adminToken');
        window.location.href = '/admin/login';
      }
    }
    return Promise.reject(error);
  }
);

export default api;
