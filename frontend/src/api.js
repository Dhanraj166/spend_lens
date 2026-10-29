import axios from 'axios';

// All calls to the Spring Boot backend live here.
// In production, Vercel forwards "/api" to Render (see vercel.json).
// On your computer, vite.config.js forwards "/api" to http://localhost:8080.
const api = axios.create({ baseURL: '/api' });

// Render's free plan sleeps after 15 minutes without visitors. While it wakes up
// (about a minute) requests fail with 502/503/504, so we retry GET requests.
const RETRY_STATUS = [502, 503, 504];
const MAX_RETRIES = 12;
const RETRY_DELAY_MS = 5000;

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const config = error.config;
    const serverNotReady = !error.response || RETRY_STATUS.includes(error.response.status);
    const canRetry =
      config && config.method === 'get' && serverNotReady && (config.retryCount || 0) < MAX_RETRIES;

    if (!canRetry) return Promise.reject(error);

    config.retryCount = (config.retryCount || 0) + 1;
    await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY_MS));
    return api(config);
  }
);


export const getExpenses = (month) =>
  api.get('/expenses', { params: { month } }).then((res) => res.data);

export const getSummary = (month) =>
  api.get('/summary', { params: { month } }).then((res) => res.data);

export const createExpense = (expense) =>
  api.post('/expenses', expense).then((res) => res.data);

export const removeExpense = (id) => api.delete(`/expenses/${id}`);

// Pull a readable message out of an axios error
export const errorMessage = (err) =>
  err.response?.data?.error || err.message || 'Something went wrong';