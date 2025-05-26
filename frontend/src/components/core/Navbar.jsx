import React from 'react';
import { Link } from 'react-router-dom';
// Optional: import styles from './Navbar.module.css'; // If using CSS Modules

const Navbar = () => {
  const navStyle = {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center', // Vertically align items
    padding: '1rem 1.5rem',
    backgroundColor: '#333', // Dark background for navbar
    color: '#fff', // Default text color for navbar
    position: 'fixed', // Fixed at the top
    top: 0,
    left: 0,
    width: '100%',
    zIndex: 1000, // Ensure it's above other content
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)', // Subtle shadow
  };

  const linkStyle = {
    textDecoration: 'none',
    color: '#fff', // White links
    fontWeight: 'bold',
    padding: '0.5rem 0.75rem', // Padding for clickable area
    borderRadius: '4px', // Slightly rounded corners for links on hover/active
    transition: 'background-color 0.2s ease-in-out',
  };
  
  // Example of an active link style (requires more logic or NavLink)
  // const activeLinkStyle = {
  //   ...linkStyle,
  //   backgroundColor: '#555', 
  // };

  // For hover effect, you might need CSS Modules or styled-components,
  // or rely on global :hover styles if defined in index.css for nav links.
  // Simple inline hover isn't directly possible for pseudo-classes like :hover.

  return (
    <nav style={navStyle} /* className={styles.navbar} */>
      <Link to="/" style={linkStyle} /* className={styles.link} */>Home</Link>
      <Link to="/leads" style={linkStyle} /* className={styles.link} */>Leads</Link>
      <Link to="/leads/nuevo" style={linkStyle} /* className={styles.link} */>New Lead</Link>
      <Link to="/citas" style={linkStyle} /* className={styles.link} */>Appointments</Link>
      <Link to="/citas/nueva" style={linkStyle} /* className={styles.link} */>New Appointment</Link>
      <Link to="/disponibilidad" style={linkStyle} /* className={styles.link} */>Availability</Link>
    </nav>
  );
};

export default Navbar;
