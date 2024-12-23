import axios from 'axios';

// Base Axios Client
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_API_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// signup API
export const signupService = async (userData) => {
  const response = await apiClient.post('/users/signup', userData);
  return response.data;
};
// LoginAPi
export const loginService = async (credentials) => {
        const response = await apiClient.post('/login', credentials);
        return response.data;
};
// Scenario Service
export const scenarioService = async (scenarioData) => {
    const response = await apiClient.post('/scenarios/create', scenarioData);
    return response.data;
  };
  
  // Bot Response Service
  export const botResponseService = async (message) => {
    const response = await apiClient.post('/bot/response', { message });
    return response.data;
  };
  
  // Feedback Service: Submits user feedback
  export const feedbackService = async (feedbackData) => {
    const response = await apiClient.post('/feedback', feedbackData);
    return response.data;
  };
  
  // Free API: Get Random Data for Testing
  export const getRandomData = async () => {
    const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
    return response.data; // Returns an array of random posts
  };
  

