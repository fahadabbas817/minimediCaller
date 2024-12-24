import { create } from 'zustand';

export const useAppStore = create((set) => ({
  input: 'Context API setup',
  isAuthenticated: false,
  userEmail: '',
  token: '',
  selectedScenario: null,
  scenario: {},
  isSimulationActive: false,
  userResponse:"",
  botResponse:"Hello! This is 911. What is your emergency?",

  // Actions to update state
  setUserResponse: (userResponse) => set({ userResponse }),
  setBotResponse: (botResponse) => set({ botResponse }),
  setInput: (input) => set({ input }),
  setInput: (input) => set({ input }),
  setIsAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
  setUserEmail: (userEmail) => set({ userEmail }),
  setToken: (token) => set({ token }),
  setSelectedScenario: (selectedScenario) => set({ selectedScenario }),
  setScenario: (scenario) => set({ scenario }),
  setIsSimulationActive: (isSimulationActive) => set({ isSimulationActive }),
}));
