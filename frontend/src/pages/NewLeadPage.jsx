import React from 'react';
import LeadForm from '../components/leads/LeadForm'; // Corrected path if necessary
import { Link } from 'react-router-dom';

const NewLeadPage = () => {
  // Basic inline styles
  const pageStyle = {
    padding: '2rem',
    fontFamily: 'Arial, sans-serif',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center', // Center content including the form
  };

  const headerStyle = {
    textAlign: 'center',
    marginBottom: '1.5rem',
  };

  const backLinkContainerStyle = {
    marginTop: '2rem', // Space above the back button
  };

  const buttonStyle = { // For the back button
    padding: '8px 12px',
    fontSize: '0.9rem',
    color: 'white',
    backgroundColor: '#6c757d', // A neutral/secondary color
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    textDecoration: 'none',
  };

  return (
    <div style={pageStyle}>
      <h2 style={headerStyle}>Register New Lead</h2>
      <LeadForm />
      <div style={backLinkContainerStyle}>
        <Link to="/leads" style={buttonStyle}>
          Back to Leads List
        </Link>
      </div>
    </div>
  );
};

export default NewLeadPage;
