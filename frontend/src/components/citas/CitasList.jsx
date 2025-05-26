import React, { useEffect, useState, useMemo } from 'react';
import { useCitas } from '../../context/CitaContext';
import { useLeads } from '../../context/LeadContext';
import { useNotification } from '../../context/NotificationContext';
import { LoadingSpinner, ErrorMessage } from '../core';

const CitasList = () => {
  const {
    citas,
    isLoadingCitas,
    citaError,
    fetchCitas,
    cancelCitaById,
    totalCitas,
    totalPagesCitas,
    currentPageCitas,
  } = useCitas();

  const {
    leads: allLeads,
    fetchLeads: fetchAllLeads,
    isLoadingLeads: isLoadingAllLeads,
  } = useLeads();

  const { showNotification } = useNotification();

  const [filterEstado, setFilterEstado] = useState('');
  const [filterFechaInicio, setFilterFechaInicio] = useState('');
  const [filterFechaFin, setFilterFechaFin] = useState('');
  const [localCurrentPage, setLocalCurrentPage] = useState(1);

  useEffect(() => {
    fetchAllLeads({ limit: 1000 });
  }, [fetchAllLeads]);

  useEffect(() => {
    const params = {
      page: localCurrentPage,
      estado: filterEstado || undefined,
      fechaInicio: filterFechaInicio || undefined,
      fechaFin: filterFechaFin || undefined,
    };
    fetchCitas(params);
  }, [localCurrentPage, filterEstado, filterFechaInicio, filterFechaFin, fetchCitas]);

  const leadMap = useMemo(() => {
    if (!allLeads || allLeads.length === 0) return new Map();
    return new Map(allLeads.map(lead => [lead.id, lead.nombre]));
  }, [allLeads]);

  const getLeadName = (leadId) => {
    return leadMap.get(leadId) || 'Unknown Lead';
  };

  const handleFilterEstadoChange = (e) => {
    setFilterEstado(e.target.value);
    setLocalCurrentPage(1);
  };

  const handleFilterFechaInicioChange = (e) => {
    setFilterFechaInicio(e.target.value);
    setLocalCurrentPage(1);
  };

  const handleFilterFechaFinChange = (e) => {
    setFilterFechaFin(e.target.value);
    setLocalCurrentPage(1);
  };
  
  const handleResetFilters = () => {
    setFilterEstado('');
    setFilterFechaInicio('');
    setFilterFechaFin('');
    setLocalCurrentPage(1);
  };

  const handlePrevPage = () => {
    if (currentPageCitas > 1) {
      setLocalCurrentPage(prev => prev - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPageCitas < totalPagesCitas) {
      setLocalCurrentPage(prev => prev + 1);
    }
  };

  const handleCancelCita = async (citaId) => {
    if (window.confirm('Are you sure you want to cancel this appointment?')) {
      try {
        await cancelCitaById(citaId);
        showNotification('Appointment canceled successfully!', 'success');
      } catch (error) {
        showNotification(error.message || 'Failed to cancel appointment.', 'error');
      }
    }
  };

  // Inline styles - consistent with LeadsList.jsx
  const containerStyle = {
    margin: '1rem 0',
    padding: '1.5rem',
    border: '1px solid #e0e0e0',
    borderRadius: '8px',
    backgroundColor: '#ffffff',
    boxShadow: '0 2px 4px rgba(0,0,0,0.03)',
  };

  const filterSectionStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '1rem',
    marginBottom: '1.5rem',
    alignItems: 'center',
  };
  
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
  
  const notesCellStyle = { // For better readability of notes
    whiteSpace: 'pre-wrap', 
    wordBreak: 'break-word', 
    minWidth: '150px', // Ensure notes column has some width
  };
  
  const actionsCellStyle = {
    minWidth: '100px', // Ensure actions column has some width
    textAlign: 'center',
  };


  if ((isLoadingCitas || isLoadingAllLeads) && citas.length === 0 && !filterEstado && !filterFechaInicio && !filterFechaFin) {
    return <div style={{display: 'flex', justifyContent: 'center', margin: '2rem'}}><LoadingSpinner /></div>;
  }
  
  return (
    <div style={containerStyle}>
      {/* <h3 style={{ marginBottom: '1rem', color: '#333' }}>Appointments List</h3> */}

      <div style={filterSectionStyle}>
        <select value={filterEstado} onChange={handleFilterEstadoChange} > {/* Uses global style */}
          <option value="">All Statuses</option>
          <option value="programada">Programada</option>
          <option value="completada">Completada</option>
          <option value="cancelada">Cancelada</option>
        </select>
        <input type="date" value={filterFechaInicio} onChange={handleFilterFechaInicioChange} title="Start Date" /> {/* Uses global style */}
        <input type="date" value={filterFechaFin} onChange={handleFilterFechaFinChange} title="End Date" /> {/* Uses global style */}
        <button onClick={handleResetFilters} style={{backgroundColor: '#6c757d'}}>Reset Filters</button> {/* Specific style for reset */}
      </div>
      
      {citaError && <ErrorMessage message={citaError.message || 'Error fetching appointments.'} />}
      {(isLoadingCitas || isLoadingAllLeads) && <div style={{display: 'flex', justifyContent: 'center', margin: '1rem 0'}}><LoadingSpinner /></div>}


      {citas.length === 0 && !isLoadingCitas && !isLoadingAllLeads ? (
        <p>No appointments found for the selected criteria.</p>
      ) : (
        <div className="table-responsive-container"> {/* Added for horizontal scrolling */}
          <table> {/* Uses global table styles from index.css */}
            <thead>
              <tr>
                <th>Lead Name</th>
                <th>Fecha</th>
                <th>Hora</th>
                <th>Duración</th>
                <th>Estado</th>
                <th>Notas</th>
                <th style={{textAlign: 'center'}}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {citas.map(cita => (
                <tr key={cita.id}>
                  <td>{getLeadName(cita.leadId)}</td>
                  <td>{cita.fecha}</td>
                  <td>{cita.hora}</td>
                  <td>{cita.duracion} min</td>
                  <td>{cita.estado}</td>
                  <td style={notesCellStyle}>{cita.notas || '-'}</td>
                  <td style={actionsCellStyle}>
                    {cita.estado === 'programada' && (
                      <button 
                        onClick={() => handleCancelCita(cita.id)} 
                        style={{backgroundColor: '#dc3545'}} // Specific style for cancel
                        disabled={isLoadingCitas}
                      >
                        Cancel
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {citas.length > 0 && (
        <div style={paginationControlsStyle}>
          <button 
            onClick={handlePrevPage} 
            disabled={currentPageCitas === 1 || isLoadingCitas || isLoadingAllLeads}
          >
            Previous
          </button>
          <span style={pageInfoStyle}>Page {currentPageCitas} of {totalPagesCitas} (Total: {totalCitas})</span>
          <button 
            onClick={handleNextPage} 
            disabled={currentPageCitas === totalPagesCitas || isLoadingCitas || isLoadingAllLeads}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default CitasList;
