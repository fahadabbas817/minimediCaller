import axios from 'axios';

// Base Axios Client
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_API_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});


// Scenario Service
export const scenarioService = async (token, email, emergency_type) => {
    const response = await apiClient.post(
      '/users/generate_scenario',
      { email, emergency_type },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  };
