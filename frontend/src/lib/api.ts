import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

console.log('Using API URL:', API_URL); // Debug log

const api = axios.create({
  baseURL: API_URL,
});

// Request interceptor
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  console.error('Request error:', error);
  return Promise.reject(error);
});

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('Response error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// Authentication
export const signUp = async (userData: any) => {
  try {
    const response = await api.post('/auth/sign-up', userData);
    return response;
  } catch (error: any) {
    console.error('Signup error:', error.response?.data || error.message);
    throw error;
  }
};

export const signIn = async (credentials: any) => {
  try {
    const response = await api.post('/auth/sign-in', credentials);
    return response;
  } catch (error: any) {
    console.error('Sign in error:', error.response?.data || error.message);
    throw error;
  }
};

// Subscriptions
export const getSubscriptions = () => api.get('/subscriptions');
export const createSubscription = (subscriptionData: any) => api.post('/subscriptions', subscriptionData);
export const updateSubscription = (id: string, subscriptionData: any) => api.put(`/subscriptions/${id}`, subscriptionData);
export const deleteSubscription = (id: string) => api.delete(`/subscriptions/${id}`);

// User
export const getUser = () => api.get('/users'); 