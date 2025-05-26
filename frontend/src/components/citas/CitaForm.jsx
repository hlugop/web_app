import React, { useState, useEffect } from 'react';
import { useLeads } from '../../context/LeadContext';
import { useCitas } from '../../context/CitaContext';
import { useNotification } from '../../context/NotificationContext';
import { LoadingSpinner, ErrorMessage } from '../core';

const CitaForm = () => {
  const [formData, setFormData] = useState({
    leadId: '',
    fecha: '',
    hora: '',
    duracion: 30, // Default duration
    notas: '',
  });
  const [formErrors, setFormErrors] = useState({});

  const {
    leads: availableLeads,
    fetchLeads: fetchAllLeads,
    isLoadingLeads: isLoadingAllLeads,
    leadError: leadFetchError,
  } = useLeads();

  const {
    createCita,
    isLoadingCitas,
    citaError: citaSubmitError,
    fetchAvailableSlots,
    availableSlots,
    isLoadingSlots,
  } = useCitas();

  const { showNotification } = useNotification();

  useEffect(() => {
    fetchAllLeads({ limit: 1000 }); 
  }, [fetchAllLeads]);

  useEffect(() => {
    if (formData.fecha && /^\d{4}-\d{2}-\d{2}$/.test(formData.fecha)) {
      fetchAvailableSlots(formData.fecha);
    }
  }, [formData.fecha, fetchAvailableSlots]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => {
      const newState = { ...prev, [name]: value };
      if (name === 'fecha') {
        newState.hora = '';
      }
      return newState;
    });
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const validateForm = (data) => {
    const errors = {};
    if (!data.leadId) errors.leadId = 'Lead is required.';
    if (!data.fecha) {
      errors.fecha = 'Fecha is required.';
    } else if (!/^\d{4}-\d{2}-\d{2}$/.test(data.fecha)) {
      errors.fecha = 'Fecha format must be YYYY-MM-DD.';
    }
    if (!data.hora) errors.hora = 'Hora is required.';
    if (!data.duracion || data.duracion <= 0) {
      errors.duracion = 'Duración must be a positive number.';
    }
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm(formData);
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    setFormErrors({});

    try {
      await createCita(formData);
      showNotification('Appointment created successfully!', 'success');
      setFormData({ leadId: '', fecha: '', hora: '', duracion: 30, notas: '' });
    } catch (error) {
      showNotification(error.message || 'Failed to create appointment.', 'error');
    }
  };
  
  // Inline styles - consistent with LeadForm.jsx
  const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    maxWidth: '500px',
    margin: '0 auto',
    padding: '2rem',
    border: '1px solid #e0e0e0',
    borderRadius: '8px',
    backgroundColor: '#ffffff',
    boxShadow: '0 4px 8px rgba(0,0,0,0.05)',
  };

  const inputGroupStyle = {
    marginBottom: '0.5rem',
  };

  const labelStyle = {
    display: 'block',
    marginBottom: '0.5rem',
    fontWeight: 'bold',
    color: '#333',
  };

  const errorTextStyle = {
    color: '#d9534f',
    fontSize: '0.875em',
    marginTop: '0.25rem',
    display: 'block',
  };
  
  const slotInfoStyle = {
    fontSize: '0.9rem',
    marginTop: '0.5rem',
    color: '#555', // Neutral color for info messages
  };


  return (
    <form onSubmit={handleSubmit} style={formStyle}>
      {/* <h2 style={{ textAlign: 'center', marginBottom: '1.5rem', color: '#333' }}>Create New Appointment</h2> */}
      
      {leadFetchError && <ErrorMessage message={leadFetchError.message || 'Error fetching leads.'} />}
      {citaSubmitError && <ErrorMessage message={citaSubmitError.message || 'Error submitting appointment.'} />}

      <div style={inputGroupStyle}>
        <label htmlFor="leadId" style={labelStyle}>Lead:</label>
        {isLoadingAllLeads ? <LoadingSpinner /> : (
          <select name="leadId" id="leadId" value={formData.leadId} onChange={handleChange} > {/* Uses global style */}
            <option value="">Select a Lead</option>
            {availableLeads.map(lead => (
              <option key={lead.id} value={lead.id}>{lead.nombre} - {lead.empresa}</option>
            ))}
          </select>
        )}
        {formErrors.leadId && <span style={errorTextStyle}>{formErrors.leadId}</span>}
      </div>

      <div style={inputGroupStyle}>
        <label htmlFor="fecha" style={labelStyle}>Fecha:</label>
        <input type="date" name="fecha" id="fecha" value={formData.fecha} onChange={handleChange} /> {/* Uses global style */}
        {formErrors.fecha && <span style={errorTextStyle}>{formErrors.fecha}</span>}
      </div>

      <div style={inputGroupStyle}>
        <label htmlFor="hora" style={labelStyle}>Hora:</label>
        {isLoadingSlots ? <LoadingSpinner /> : (
          <select 
            name="hora" 
            id="hora" 
            value={formData.hora} 
            onChange={handleChange} 
            disabled={!formData.fecha || availableSlots.length === 0 || isLoadingSlots}
          > {/* Uses global style */}
            <option value="">{isLoadingSlots ? 'Loading...' : (formData.fecha && /^\d{4}-\d{2}-\d{2}$/.test(formData.fecha) ? 'Select a time slot' : 'Select a valid date first')}</option>
            {availableSlots.map(slot => (
              <option key={slot} value={slot}>{slot}</option>
            ))}
          </select>
        )}
        {!isLoadingSlots && formData.fecha && /^\d{4}-\d{2}-\d{2}$/.test(formData.fecha) && availableSlots.length === 0 && 
          <span style={slotInfoStyle}>No slots available for this date.</span>}
        {formErrors.hora && <span style={errorTextStyle}>{formErrors.hora}</span>}
      </div>
      
      <div style={inputGroupStyle}>
        <label htmlFor="duracion" style={labelStyle}>Duración (minutes):</label>
        <input type="number" name="duracion" id="duracion" value={formData.duracion} onChange={handleChange} min="15" step="15" /> {/* Uses global style */}
        {formErrors.duracion && <span style={errorTextStyle}>{formErrors.duracion}</span>}
      </div>

      <div style={inputGroupStyle}>
        <label htmlFor="notas" style={labelStyle}>Notas:</label>
        <textarea name="notas" id="notas" value={formData.notas} onChange={handleChange} rows="3" /> {/* Uses global style, added rows */}
      </div>

      <button 
        type="submit" 
        disabled={isLoadingCitas || isLoadingAllLeads || isLoadingSlots}
      >
        {isLoadingCitas ? 'Creating...' : 'Create Appointment'}
      </button>
      
      {(isLoadingCitas || isLoadingAllLeads || isLoadingSlots) && <div style={{display: 'flex', justifyContent: 'center', marginTop: '1rem'}}><LoadingSpinner /></div>}
    </form>
  );
};

export default CitaForm;
