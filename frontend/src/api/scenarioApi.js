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

  //Simulator Conversation API function

export const conversationService = async (scenario, dispatcher_text, conv_history,token) => {
    const response = await apiClient.post(
      '/users/convers',
      { scenario, dispatcher_text, conv_history},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  };

// Feedback Generation API
export const generateFeedbackService = async (email,conv_logs,token) => {
    const response = await apiClient.post(
      '/users/feedback',
      {email,conv_logs},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(response.data)
    return response.data;
  };

