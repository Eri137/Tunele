// Base URL for the backend API. In production this is set via the
// VITE_API_URL environment variable (configured in your hosting provider,
// e.g. Vercel). Locally it falls back to the dev backend on port 3001.
export const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";
