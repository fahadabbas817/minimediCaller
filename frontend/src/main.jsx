import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import ContextProvider from './Context/ContextAPI.jsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ContextProvider>
      <QueryClientProvider client={queryClient}>
    <App />
    </QueryClientProvider>
    </ContextProvider>
  </React.StrictMode>,
)

