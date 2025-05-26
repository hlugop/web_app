import React, { useEffect, useState } from 'react';
import { useLeads } from '../../context/LeadContext';
import { LoadingSpinner, ErrorMessage } from '../core';
// Optional: import styles from './LeadsList.module.css'; // For CSS Modules

const LeadsList = () => {
  const {
    leads,
    isLoadingLeads,
    leadError,
    fetchLeads,
    totalLeads,
    totalPages,
    currentPage,
  } = useLeads();

  const [filterNombre, setFilterNombre] = useState('');
  const [filterEmpresa, setFilterEmpresa] = useState('');
  const [localCurrentPage, setLocalCurrentPage] = useState(1); 

  useEffect(() => {
    fetchLeads({ page: localCurrentPage, nombre: filterNombre, empresa: filterEmpresa });
  }, [localCurrentPage, filterNombre, filterEmpresa, fetchLeads]);

  const handleFilterChangeNombre = (e) => {
    setFilterNombre(e.target.value);
    setLocalCurrentPage(1);
  };

  const handleFilterChangeEmpresa = (e) => {
    setFilterEmpresa(e.target.value);
    setLocalCurrentPage(1);
  };
  
  const handlePrevPage = () => {
    if (currentPage > 1) {
      setLocalCurrentPage(prev => prev - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setLocalCurrentPage(prev => prev + 1);
    }
  };

  // Inline styles - can be moved to CSS modules or global CSS
  const containerStyle = {
    margin: '1rem 0', // Reduced top/bottom margin if page has padding
    padding: '1.5rem',
    border: '1px solid #e0e0e0',
    borderRadius: '8px',
    backgroundColor: '#ffffff',
    boxShadow: '0 2px 4px rgba(0,0,0,0.03)',
  };

  const filterSectionStyle = {
    display: 'flex',
    flexWrap: 'wrap', // Allow filters to wrap on smaller screens
    gap: '1rem',
    marginBottom: '1.5rem',
    alignItems: 'center',
  };

  // Input styling is now global via index.css
  // const inputStyle = { ... };
  
  const paginationControlsStyle = {
    marginTop: '1.5rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  };
  
  const pageInfoStyle = {
    fontSize: '0.9rem',
    color: '#555',
  };

  // Button styling is now global via index.css
  // const buttonStyle = { ... };
  // const disabledButtonStyle = { ... };

  if (isLoadingLeads && leads.length === 0) {
    return <div style={{display: 'flex', justifyContent: 'center', margin: '2rem'}}><LoadingSpinner /></div>;
  }

  if (leadError) {
    return <ErrorMessage message={leadError.message || 'Error fetching leads.'} />;
  }

  return (
    <div style={containerStyle}>
      {/* Title can be part of the Page component */}
      {/* <h3 style={{ marginBottom: '1rem', color: '#333' }}>Leads List</h3> */}

      <div style={filterSectionStyle}>
        <input
          type="text"
          placeholder="Filter by Name..."
          value={filterNombre}
          onChange={handleFilterChangeNombre}
          // style={inputStyle} // Uses global style
        />
        <input
          type="text"
          placeholder="Filter by Company..."
          value={filterEmpresa}
          onChange={handleFilterChangeEmpresa}
          // style={inputStyle} // Uses global style
        />
      </div>
      
      {isLoadingLeads && <div style={{display: 'flex', justifyContent: 'center', margin: '1rem 0'}}><LoadingSpinner /></div>}

      {leads.length === 0 && !isLoadingLeads ? (
        <p>No leads found.</p>
      ) : (
        <div className="table-responsive-container"> {/* Added for horizontal scrolling on small screens */}
          <table> {/* Uses global table styles from index.css */}
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Email</th>
                <th>Teléfono</th>
                <th>Empresa</th>
                <th>Fecha de Registro</th>
              </tr>
            </thead>
            <tbody>
              {leads.map(lead => (
                <tr key={lead.id}>
                  <td>{lead.nombre}</td>
                  <td>{lead.email}</td>
                  <td>{lead.telefono}</td>
                  <td>{lead.empresa}</td>
                  <td>{lead.fechaRegistro}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {leads.length > 0 && (
        <div style={paginationControlsStyle}>
          <button 
            onClick={handlePrevPage} 
            disabled={currentPage === 1 || isLoadingLeads}
            // style={currentPage === 1 || isLoadingLeads ? disabledButtonStyle : buttonStyle} // Uses global styles
          >
            Previous
          </button>
          <span style={pageInfoStyle}>Page {currentPage} of {totalPages} (Total: {totalLeads})</span>
          <button 
            onClick={handleNextPage} 
            disabled={currentPage === totalPages || isLoadingLeads}
            // style={currentPage === totalPages || isLoadingLeads ? disabledButtonStyle : buttonStyle} // Uses global styles
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default LeadsList;
