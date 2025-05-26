import React from 'react';
import { Link } from 'react-router-dom';
import LeadsList from '../components/leads/LeadsList'; // Corrected path if necessary

const LeadsPage = () => {
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
      <h2 style={headerStyle}>Manage Leads</h2>
      <div style={linkContainerStyle}>
        <Link to="/leads/nuevo">
          <button style={buttonStyle}>Register New Lead</button>
        </Link>
      </div>
      <LeadsList />
    </div>
  );
};

export default LeadsPage;
