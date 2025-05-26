import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { LeadProvider } from './context/LeadContext';
import { CitaProvider } from './context/CitaContext';
import { NotificationProvider } from './context/NotificationContext';
import './index.css'; // Assuming global styles are in index.css as per default Vite setup

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <NotificationProvider>
        <LeadProvider>
          <CitaProvider>
            <App />
          </CitaProvider>
        </LeadProvider>
      </NotificationProvider>
    </BrowserRouter>
  </React.StrictMode>
);
