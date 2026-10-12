import axios from 'axios';
import { delay } from '../../lib/utils';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api/v1';
export const USE_MOCK = import.meta.env.VITE_USE_MOCK === 'true' || true;

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 8000,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('recruiter_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

/**
 * Service execution helper that calls the backend or falls back seamlessly to mock data with realistic latency.
 */
export async function executeService(apiCallFn, mockDataFn, latency = null) {
  const simulatedDelay = latency || Math.floor(Math.random() * (1000 - 450 + 1)) + 450;
  
  if (USE_MOCK) {
    await delay(simulatedDelay);
    return mockDataFn();
  }

  try {
    const response = await apiCallFn();
    return response.data;
  } catch (error) {
    console.warn('[Service Layer] Real backend unavailable, falling back to mock data:', error.message);
    await delay(simulatedDelay);
    return mockDataFn();
  }
}
