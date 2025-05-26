import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:3001/api', // Backend API base URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// --- Lead Endpoints ---

export const getLeads = async (params) => {
  try {
    const response = await apiClient.get('/leads', { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching leads:', error.response ? error.response.data : error.message);
    throw error.response ? error.response.data : new Error('Error fetching leads');
  }
};

export const createLead = async (leadData) => {
  try {
    const response = await apiClient.post('/leads', leadData);
    return response.data;
  } catch (error) {
    console.error('Error creating lead:', error.response ? error.response.data : error.message);
    throw error.response ? error.response.data : new Error('Error creating lead');
  }
};

// --- Cita Endpoints ---

export const getCitas = async (params) => {
  try {
    const response = await apiClient.get('/citas', { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching citas:', error.response ? error.response.data : error.message);
    throw error.response ? error.response.data : new Error('Error fetching citas');
  }
};

export const createCita = async (citaData) => {
  try {
    const response = await apiClient.post('/citas', citaData);
    return response.data;
  } catch (error) {
    console.error('Error creating cita:', error.response ? error.response.data : error.message);
    throw error.response ? error.response.data : new Error('Error creating cita');
  }
};

export const getAvailableSlots = async (date) => {
  try {
    // The backend endpoint /api/citas/disponibles expects a query parameter 'fecha'
    const response = await apiClient.get('/citas/disponibles', { params: { fecha: date } });
    return response.data;
  } catch (error) {
    console.error('Error fetching available slots:', error.response ? error.response.data : error.message);
    throw error.response ? error.response.data : new Error('Error fetching available slots');
  }
};

export const cancelCita = async (id) => {
  try {
    const response = await apiClient.delete(`/citas/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error canceling cita:', error.response ? error.response.data : error.message);
    throw error.response ? error.response.data : new Error('Error canceling cita');
  }
};
