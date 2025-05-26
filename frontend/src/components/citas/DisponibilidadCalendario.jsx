import React, { useState, useEffect } from 'react';
import { useCitas } from '../../context/CitaContext';
import { LoadingSpinner, ErrorMessage } from '../core';

const WORK_DAY_START_HOUR = 9;
const WORK_DAY_END_HOUR = 18; 
const SLOT_DURATION_MINUTES = 30;

const DisponibilidadCalendario = () => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [timeSlots, setTimeSlots] = useState([]);

  const {
    citas,
    fetchCitas,
    isLoadingCitas,
    citaError,
  } = useCitas();

  useEffect(() => {
    if (selectedDate) {
      fetchCitas({ fecha: selectedDate, limit: 500, page: 1 });
    }
  }, [selectedDate, fetchCitas]);

  useEffect(() => {
    if (!selectedDate) {
      setTimeSlots([]);
      return;
    }

    const generateSlots = () => {
      const slots = [];
      const dateObj = new Date(`${selectedDate}T00:00:00`);

      for (let hour = WORK_DAY_START_HOUR; hour < WORK_DAY_END_HOUR; hour++) {
        for (let minutes = 0; minutes < 60; minutes += SLOT_DURATION_MINUTES) {
          const slotStart = new Date(dateObj);
          slotStart.setHours(hour, minutes, 0, 0);
          const slotEnd = new Date(slotStart);
          slotEnd.setMinutes(slotStart.getMinutes() + SLOT_DURATION_MINUTES);
          const timeString = `${String(hour).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
          slots.push({
            time: timeString,
            startTime: slotStart.getTime(),
            endTime: slotEnd.getTime(),
            status: 'Available',
          });
        }
      }
      return slots;
    };

    const allPossibleSlots = generateSlots();
    const relevantCitas = citas.filter(
      cita => cita.fecha === selectedDate && cita.estado !== 'cancelada'
    );

    const updatedSlots = allPossibleSlots.map(slot => {
      const slotStartMs = slot.startTime;
      const slotEndMs = slot.endTime;
      const isBooked = relevantCitas.some(cita => {
        const [citaHour, citaMinute] = cita.hora.split(':').map(Number);
        const citaStart = new Date(`${selectedDate}T00:00:00`);
        citaStart.setHours(citaHour, citaMinute, 0, 0);
        const citaEnd = new Date(citaStart);
        citaEnd.setMinutes(citaStart.getMinutes() + cita.duracion);
        const citaStartMs = citaStart.getTime();
        const citaEndMs = citaEnd.getTime();
        return slotStartMs < citaEndMs && slotEndMs > citaStartMs;
      });
      return { ...slot, status: isBooked ? 'Booked' : 'Unavailable' }; // Changed 'Booked' to 'Unavailable' for clarity
    });
    setTimeSlots(updatedSlots);
  }, [citas, selectedDate]);

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  // Inline styles
  const containerStyle = {
    margin: '1rem auto', // Centered with auto margins if parent allows
    padding: '1.5rem',
    border: '1px solid #e0e0e0',
    borderRadius: '8px',
    backgroundColor: '#ffffff',
    boxShadow: '0 2px 4px rgba(0,0,0,0.03)',
    maxWidth: '450px', // Constrain width for better appearance
  };

  // Date input uses global styles from index.css
  // const dateInputStyle = { ... };

  const slotListStyle = {
    listStyle: 'none',
    padding: 0,
    marginTop: '1.5rem',
  };

  const slotItemBaseStyle = {
    padding: '0.75rem 1rem',
    border: '1px solid #eee',
    marginBottom: '0.5rem',
    borderRadius: '4px',
    fontWeight: '500', // Slightly bolder text
    textAlign: 'center',
    transition: 'background-color 0.2s ease-in-out, color 0.2s ease-in-out',
  };

  const slotItemStyle = (status) => {
    if (status === 'Unavailable') {
      return {
        ...slotItemBaseStyle,
        backgroundColor: '#efefef', // Light grey for unavailable/booked
        color: '#757575', // Darker grey text
        // textDecoration: 'line-through', // Optional: line-through for booked slots
      };
    }
    return { // Available
      ...slotItemBaseStyle,
      backgroundColor: '#e8f5e9', // Light green for available
      color: '#388e3c', // Darker green text
    };
  };
  
  const noSlotsMessageStyle = {
    textAlign: 'center',
    color: '#555',
    marginTop: '1rem',
  };

  return (
    <div style={containerStyle}>
      {/* Title can be part of the Page component */}
      {/* <h3 style={{ textAlign: 'center', marginBottom: '1.5rem', color: '#333' }}>Daily Availability</h3> */}
      <input
        type="date"
        value={selectedDate}
        onChange={handleDateChange}
        // style={dateInputStyle} // Uses global style
      />

      {isLoadingCitas && <div style={{display: 'flex', justifyContent: 'center', marginTop: '1rem'}}><LoadingSpinner /></div>}
      {citaError && <ErrorMessage message={citaError.message || 'Error fetching appointment data.'} />}
      
      {!isLoadingCitas && !citaError && (
        <ul style={slotListStyle}>
          {timeSlots.length > 0 ? timeSlots.map(slot => (
            <li key={slot.time} style={slotItemStyle(slot.status)}>
              {slot.time} - {new Date(slot.endTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit', hour12: false})} : {slot.status}
            </li>
          )) : (
            <p style={noSlotsMessageStyle}>
              No slots available for this day, or outside of working hours (09:00 - 18:00).
            </p>
          )}
        </ul>
      )}
    </div>
  );
};

export default DisponibilidadCalendario;
