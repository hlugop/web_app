import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Navbar, SuccessMessage, ErrorMessage } from './components/core'; // Using index.js for core components
import DashboardPage from './pages/DashboardPage';
import LeadsPage from './pages/LeadsPage';
import NewLeadPage from './pages/NewLeadPage';
import CitasPage from './pages/CitasPage';
import NewCitaPage from './pages/NewCitaPage';
import DisponibilidadPage from './pages/DisponibilidadPage';
import { useNotification } from './context/NotificationContext';
// import './App.css'; // Default Vite App.css, can be removed or modified if using index.css extensively

function App() {
  const { notification } = useNotification();

  // Basic inline styles for the main content container
  // This can also be moved to index.css or App.css if preferred
  const mainContentContainerStyle = {
    padding: '20px', // Consistent padding around the content area
    // fontFamily: 'Arial, sans-serif', // Font is now set globally in index.css
    marginTop: '60px', // Adjust based on Navbar height to prevent overlap if Navbar is fixed
  };
  
  // Styles for the notification wrapper in App.jsx
  // These ensure it's positioned correctly on the screen.
  const notificationWrapperStyle = {
    position: 'fixed', // Fixed position relative to the viewport
    top: '70px',       // Below a typical navbar height
    left: '50%',
    transform: 'translateX(-50%)', // Center horizontally
    zIndex: 1050,      // High z-index to appear above other content
    width: 'auto',     // Auto width based on content
    minWidth: '300px', // Minimum width
    maxWidth: '90%',   // Maximum width to prevent it from being too wide on large screens
  };


  return (
    <>
      <Navbar /> {/* Assuming Navbar has its own styling, potentially fixed position */}
      
      {/* Notification Area */}
      {notification && (
        <div style={notificationWrapperStyle} className="notification-container"> {/* Added class for potential global styling */}
          {notification.type === 'success' && (
            <SuccessMessage message={notification.message} />
          )}
          {notification.type === 'error' && (
            <ErrorMessage message={notification.message} />
          )}
        </div>
      )}

      <div className="container" style={mainContentContainerStyle}>
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/leads" element={<LeadsPage />} />
          <Route path="/leads/nuevo" element={<NewLeadPage />} />
          <Route path="/citas" element={<CitasPage />} />
          <Route path="/citas/nueva" element={<NewCitaPage />} />
          <Route path="/disponibilidad" element={<DisponibilidadPage />} />
          {/* Optional: <Route path="*" element={<NotFoundPage />} /> */}
        </Routes>
      </div>
    </>
  );
}

export default App;
