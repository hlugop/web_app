import React from 'react';
import { Link } from 'react-router-dom';
import CitasList from '../components/citas/CitasList'; // Corrected path if necessary

const CitasPage = () => {
  // Basic inline styles
  const pageStyle = {
    padding: '2rem',
    fontFamily: 'Arial, sans-serif',
  };

  const headerStyle = {
    textAlign: 'center',
    marginBottom: '1.5rem',
  };

  const linkContainerStyle = {
    marginBottom: '2rem',
    textAlign: 'center', // Or 'left'/'right' as preferred
  };

  const buttonStyle = {
    padding: '10px 15px',
    fontSize: '1rem',
    color: 'white',
    backgroundColor: '#007bff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    textDecoration: 'none', // In case Link component doesn't strip it
  };

  return (
    <div style={pageStyle}>
      <h2 style={headerStyle}>Manage Appointments</h2>
      <div style={linkContainerStyle}>
        <Link to="/citas/nueva">
          <button style={buttonStyle}>Schedule New Appointment</button>
        </Link>
      </div>
      <CitasList />
    </div>
  );
};

export default CitasPage;
