// API Configuration for production and local development
// This prevents hard-coded '/api' requests from failing when the frontend and backend are hosted on separate domains.
const getApiBaseUrl = () => {
  if (import.meta.env.DEV) {
    return '/api';
  }
  if (import.meta.env.VITE_API_BASE_URL) {
    return import.meta.env.VITE_API_BASE_URL;
  }
  return '/api';
};

export const API_BASE_URL = getApiBaseUrl();
