import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

// Log API URL to help debug (always log in production too for troubleshooting)
console.log('🔗 API URL configured:', API_URL || 'NOT SET - using default localhost');
if (!import.meta.env.VITE_API_URL) {
  console.warn('⚠️  WARNING: VITE_API_URL environment variable is not set!');
  console.warn('⚠️  The app will try to use http://localhost:5000 which will fail in production.');
}

const api = axios.create({
  baseURL: `${API_URL}/api`,
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 30000, // 30 second timeout
});

// Request interceptor to add token
api.interceptors.request.use(
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

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Log error details for debugging
    if (import.meta.env.DEV) {
      console.error('🚨 API Error:', {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data,
        url: error.config?.url,
        baseURL: error.config?.baseURL
      });
    }

    // Network error (no response from server)
    if (!error.response) {
      console.error('Network Error:', error.message);
      // Check if it's a CORS error
      if (error.message.includes('CORS') || error.code === 'ERR_NETWORK') {
        error.userMessage = `Cannot connect to server. Please check if the backend is running at ${API_URL}`;
      } else if (error.code === 'ECONNABORTED') {
        error.userMessage = 'Request timeout. The server is taking too long to respond.';
      } else {
        error.userMessage = 'Network error. Please check your internet connection and try again.';
      }
    }

    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

// Auth APIs
export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
  getMe: () => api.get('/auth/me')
};

// CRM APIs
export const crmAPI = {
  getCustomer: (email) => api.get(`/crm/${email}`),
  getMyData: () => api.get('/crm/customer/me')
};

// Credit APIs
export const creditAPI = {
  getCreditScore: (pan) => api.get(`/credit/${pan}`),
  getMyCreditScore: () => api.get('/credit/customer/me')
};

// Offer APIs
export const offerAPI = {
  getAllOffers: () => api.get('/offers'),
  getRate: (purpose) => api.get(`/offers/rate/${purpose}`),
  calculateEMI: (data) => api.post('/offers/calculate-emi', data)
};

// Session APIs
export const sessionAPI = {
  createSession: () => api.post('/session/create'),
  getActiveSession: () => api.get('/session/active'),
  updateSession: (id, data) => api.put(`/session/${id}`, data),
  addMessage: (id, message) => api.post(`/session/${id}/message`, message),
  getHistory: (id) => api.get(`/session/${id}/history`),
  addDocument: (id, document) => api.post(`/session/${id}/document`, document)
};

// PDF APIs
export const pdfAPI = {
  generateSanction: (sessionId) => api.post('/pdf/generate-sanction', { sessionId }, {
    responseType: 'blob'
  })
};

// Upload APIs
export const uploadAPI = {
  uploadSalarySlip: (formData) => api.post('/upload/salary-slip', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  }),
  uploadDocument: (formData) => api.post('/upload/document', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
};

export default api;
