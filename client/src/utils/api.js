import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const api = axios.create({
  baseURL: `${API_URL}/api`,
  headers: {
    'Content-Type': 'application/json'
  }
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
