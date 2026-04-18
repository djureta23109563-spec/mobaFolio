// config.js - Centralized configuration for API and image URLs
const isProduction = process.env.NODE_ENV === 'production';

export const API_URL = isProduction
  ? 'https://mobafolio-backend.onrender.com/api'
  : 'http://localhost:5000/api';

export const UPLOADS_URL = isProduction
  ? 'https://mobafolio-backend.onrender.com/uploads'
  : 'http://localhost:5000/uploads';