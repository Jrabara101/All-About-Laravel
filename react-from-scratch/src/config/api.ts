// API Configuration
// 
// Using Laravel's built-in server (recommended):
//   'http://localhost:8000'
//
// For virtual host (if configured):
//   'http://react-backend.test/react-from-scratch-api'
//   OR 'http://react-backend.test' (if virtual host points directly to API folder)
//
// For local network access (from other devices):
//   'http://YOUR_IP_ADDRESS:8000' (when using Laravel serve --host=0.0.0.0)
//   Example: 'http://192.168.100.68:8000'
//
// Set via environment variable in .env file:
//   VITE_API_BASE_URL=http://localhost:8000
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

export const API_ENDPOINTS = {
  songs: `${API_BASE_URL}/api/songs`,
  songLike: (id: number) => `${API_BASE_URL}/api/songs/${id}/like`,
};
