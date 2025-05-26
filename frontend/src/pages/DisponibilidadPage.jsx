import React from 'react';
import DisponibilidadCalendario from '../components/citas/DisponibilidadCalendario'; // Corrected path if necessary
import { Link } from 'react-router-dom'; // Optional: If a back button is desired

const DisponibilidadPage = () => {
  // Basic inline styles
  const pageStyle = {
    padding: '2rem',
    fontFamily: 'Arial, sans-serif',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center', // Center content including the calendar
  };

  const headerStyle = {
    textAlign: 'center',
    marginBottom: '1.5rem',
  };
  
  // Optional: Style for a back button if you want one
  // const backLinkContainerStyle = {
  //   marginTop: '2rem',
  // };
  // const buttonStyle = {
  //   padding: '8px 12px',
  //   fontSize: '0.9rem',
  //   color: 'white',
  //   backgroundColor: '#6c757d',
  //   border: 'none',
  //   borderRadius: '5px',
  //   cursor: 'pointer',
  //   textDecoration: 'none',
  // };

  return (
    <div style={pageStyle}>
      <h2 style={headerStyle}>Check Daily Availability</h2>
      <DisponibilidadCalendario />
      {/* Optional: Back link 
      <div style={backLinkContainerStyle}>
        <Link to="/" style={buttonStyle}> 
          Back to Dashboard
        </Link>
      </div>
      */}
    </div>
  );
};

export default DisponibilidadPage;
