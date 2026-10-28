import axios from 'axios';

// All calls to the Spring Boot backend live here.
// "/api" is proxied to http://localhost:8080 by vite.config.js (no CORS config needed).
const api = axios.create({ baseURL: '/api' });

// month is "yyyy-MM", e.g. "2026-10"
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
