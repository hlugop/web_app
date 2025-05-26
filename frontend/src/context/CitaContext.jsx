import React, { createContext, useState, useContext } from 'react';
import * as api from '../services/api'; // Ensure this path is correct
// import { useNotification } from './NotificationContext'; // Uncomment if you want to use notifications

// 1. Create CitaContext
const CitaContext = createContext();

// 2. Create CitaProvider component
export const CitaProvider = ({ children }) => {
  const [citas, setCitas] = useState([]);
  const [totalCitas, setTotalCitas] = useState(0);
  const [totalPagesCitas, setTotalPagesCitas] = useState(0);
  const [currentPageCitas, setCurrentPageCitas] = useState(1);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [isLoadingCitas, setIsLoadingCitas] = useState(false);
  const [isLoadingSlots, setIsLoadingSlots] = useState(false);
  const [citaError, setCitaError] = useState(null);
  // const { showNotification } = useNotification(); // Uncomment for notifications

  const fetchCitas = async (params) => {
    setIsLoadingCitas(true);
    setCitaError(null);
    try {
      const data = await api.getCitas(params); // Assuming API returns { citas: [], totalCitas: X, totalPages: Y, currentPage: Z }
      setCitas(data.citas || []);
      setTotalCitas(data.totalCitas || 0);
      setTotalPagesCitas(data.totalPages || 0);
      setCurrentPageCitas(data.currentPage || 1);
      // showNotification('Appointments fetched successfully!', 'success');
    } catch (error) {
      console.error('CitaContext - fetchCitas error:', error);
      setCitaError(error);
      // showNotification(error.message || 'Failed to fetch appointments', 'error');
    } finally {
      setIsLoadingCitas(false);
    }
  };

  const fetchAvailableSlots = async (date) => {
    setIsLoadingSlots(true);
    setCitaError(null); // Clear previous errors
    try {
      const slots = await api.getAvailableSlots(date);
      setAvailableSlots(slots || []);
      // showNotification(`Available slots for ${date} fetched!`, 'success');
    } catch (error) {
      console.error('CitaContext - fetchAvailableSlots error:', error);
      setAvailableSlots([]); // Clear slots on error
      setCitaError(error);
      // showNotification(error.message || 'Failed to fetch available slots', 'error');
    } finally {
      setIsLoadingSlots(false);
    }
  };

  const createCita = async (citaData) => {
    setIsLoadingCitas(true); // Or a specific adding state
    setCitaError(null);
    try {
      const newCita = await api.createCita(citaData);
      // Optionally, refetch all citas to include the new one
      // await fetchCitas({ page: currentPageCitas }); // Or whatever the current params are
      // Or, if the backend returns the created cita:
      setCitas(prevCitas => [...prevCitas, newCita]);
      // showNotification('Appointment created successfully!', 'success');
      return newCita;
    } catch (error) {
      console.error('CitaContext - createCita error:', error);
      setCitaError(error);
      // showNotification(error.message || 'Failed to create appointment', 'error');
      throw error; // Re-throw to be caught by the calling component
    } finally {
      setIsLoadingCitas(false);
    }
  };

  const cancelCitaById = async (id) => {
    setIsLoadingCitas(true); // Or a specific canceling state
    setCitaError(null);
    try {
      const canceledCita = await api.cancelCita(id);
      // Update the local state to reflect the cancellation
      setCitas(prevCitas => prevCitas.map(c => (c.id === id ? { ...c, ...canceledCita } : c)));
      // showNotification(`Appointment ID: ${id} canceled successfully!`, 'success');
      return canceledCita;
    } catch (error) {
      console.error('CitaContext - cancelCitaById error:', error);
      setCitaError(error);
      // showNotification(error.message || `Failed to cancel appointment ID: ${id}`, 'error');
      throw error; // Re-throw
    } finally {
      setIsLoadingCitas(false);
    }
  };

  const contextValues = {
    citas,
    totalCitas,
    totalPagesCitas,
    currentPageCitas,
    availableSlots,
    isLoadingCitas,
    isLoadingSlots,
    citaError,
    fetchCitas,
    fetchAvailableSlots,
    createCita,
    cancelCitaById,
  };

  return (
    <CitaContext.Provider value={contextValues}>
      {children}
    </CitaContext.Provider>
  );
};

// 3. Create and export useCitas custom hook
export const useCitas = () => {
  const context = useContext(CitaContext);
  if (context === undefined) {
    throw new Error('useCitas must be used within a CitaProvider');
  }
  return context;
};
