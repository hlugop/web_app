import React, { useState } from 'react';
import { useLeads } from '../../context/LeadContext';
import { useNotification } from '../../context/NotificationContext';
import { LoadingSpinner, ErrorMessage } from '../core'; 

const LeadForm = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    empresa: '',
  });
  const [formErrors, setFormErrors] = useState({});

  const { addLead, isLoadingLeads, leadError: apiError } = useLeads();
  const { showNotification } = useNotification();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const validateForm = (data) => {
    const errors = {};
    if (!data.nombre.trim()) errors.nombre = 'Nombre is required.';
    if (!data.email.trim()) {
      errors.email = 'Email is required.';
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
      errors.email = 'Email is not valid.';
    }
    if (!data.telefono.trim()) errors.telefono = 'Teléfono is required.';
    if (!data.empresa.trim()) errors.empresa = 'Empresa is required.';
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
      await addLead(formData);
      showNotification('Lead created successfully!', 'success');
      setFormData({ nombre: '', email: '', telefono: '', empresa: '' });
    } catch (error) {
      showNotification(error.message || 'Failed to create lead.', 'error');
    }
  };
  
  // Inline styles - can be moved to a CSS module or global CSS for larger applications
  const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem', // Spacing between form groups
    maxWidth: '500px', // Max width of the form
    margin: '0 auto', // Center the form on the page (if its container allows)
    padding: '2rem',
    border: '1px solid #e0e0e0', // Lighter border
    borderRadius: '8px',
    backgroundColor: '#ffffff', // White background for the form
    boxShadow: '0 4px 8px rgba(0,0,0,0.05)', // Subtle shadow
  };

  const inputGroupStyle = {
    marginBottom: '0.5rem', // Reduced gap, main gap handled by form's gap property
  };

  const labelStyle = {
    display: 'block', // Ensure label is block for margin bottom to take effect
    marginBottom: '0.5rem',
    fontWeight: 'bold',
    color: '#333', // Darker label color
  };

  // Input styles are now primarily handled by global styles in index.css
  // const inputStyle = { ... }; 

  const errorTextStyle = {
    color: '#d9534f', // Bootstrap's danger color
    fontSize: '0.875em',
    marginTop: '0.25rem',
    display: 'block',
  };

  // Button styles are primarily handled by global styles in index.css
  // const buttonStyle = { ... };
  // const disabledButtonStyle = { ... };

  return (
    <form onSubmit={handleSubmit} style={formStyle}>
      {/* Form title can be passed as a prop or defined in the page component */}
      {/* <h2 style={{ textAlign: 'center', marginBottom: '1.5rem', color: '#333' }}>Create New Lead</h2> */}
      
      {apiError && <ErrorMessage message={apiError.message || 'An API error occurred.'} />}

      <div style={inputGroupStyle}>
        <label htmlFor="nombre" style={labelStyle}>Nombre:</label>
        <input
          type="text"
          name="nombre"
          id="nombre"
          value={formData.nombre}
          onChange={handleChange}
          // style={inputStyle} // Uses global style
        />
        {formErrors.nombre && <span style={errorTextStyle}>{formErrors.nombre}</span>}
      </div>

      <div style={inputGroupStyle}>
        <label htmlFor="email" style={labelStyle}>Email:</label>
        <input
          type="email"
          name="email"
          id="email"
          value={formData.email}
          onChange={handleChange}
          // style={inputStyle} // Uses global style
        />
        {formErrors.email && <span style={errorTextStyle}>{formErrors.email}</span>}
      </div>

      <div style={inputGroupStyle}>
        <label htmlFor="telefono" style={labelStyle}>Teléfono:</label>
        <input
          type="tel"
          name="telefono"
          id="telefono"
          value={formData.telefono}
          onChange={handleChange}
          // style={inputStyle} // Uses global style
        />
        {formErrors.telefono && <span style={errorTextStyle}>{formErrors.telefono}</span>}
      </div>

      <div style={inputGroupStyle}>
        <label htmlFor="empresa" style={labelStyle}>Empresa:</label>
        <input
          type="text"
          name="empresa"
          id="empresa"
          value={formData.empresa}
          onChange={handleChange}
          // style={inputStyle} // Uses global style
        />
        {formErrors.empresa && <span style={errorTextStyle}>{formErrors.empresa}</span>}
      </div>

      <button type="submit" disabled={isLoadingLeads}>
        {isLoadingLeads ? 'Creating...' : 'Create Lead'}
      </button>
      
      {isLoadingLeads && <div style={{display: 'flex', justifyContent: 'center', marginTop: '1rem'}}><LoadingSpinner /></div>}
    </form>
  );
};

export default LeadForm;
