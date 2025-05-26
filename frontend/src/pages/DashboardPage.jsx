import React, { useEffect, useState } from 'react';
import { useLeads } from '../context/LeadContext';
import { useCitas } from '../context/CitaContext';
import { Link } from 'react-router-dom';
import { LoadingSpinner, ErrorMessage } from '../components/core'; // Added ErrorMessage just in case

const DashboardPage = () => {
  const {
    totalLeads: totalLeadsFromContext,
    fetchLeads,
    isLoadingLeads: isLoadingLeadsContext,
    leadError: leadContextError,
  } = useLeads();

  const {
    citas,
    fetchCitas,
    isLoadingCitas: isLoadingCitasContext,
    citaError: citaContextError,
  } = useCitas();

  // State for stats if not directly using context's total or for derived stats
  const [numUpcomingCitas, setNumUpcomingCitas] = useState(0);
  // Combined loading state
  const [isLoadingStats, setIsLoadingStats] = useState(false);

  useEffect(() => {
    const loadStats = async () => {
      setIsLoadingStats(true);

      // Fetch total leads count if not already available or to ensure it's up-to-date
      // Assuming fetchLeads updates totalLeadsFromContext in the context
      if (typeof totalLeadsFromContext !== 'number' || totalLeadsFromContext === 0) { // Only fetch if not already there
         await fetchLeads({ page: 1, limit: 1 }); // Gets total count
      }

      // Fetch upcoming appointments
      const today = new Date().toISOString().split('T')[0];
      await fetchCitas({
        estado: 'programada',
        fechaInicio: today, // From today onwards
        // fechaFin: // Optional: define an end range for "upcoming"
        limit: 1000, // Assuming this is enough to count upcoming
        page: 1,
      });
      // The counting will be done in the next useEffect, dependent on 'citas'
      
      setIsLoadingStats(false); // Initial loading done, specific context loaders will still run
    };

    loadStats();
  }, [fetchLeads, fetchCitas, totalLeadsFromContext]); // totalLeadsFromContext added to re-evaluate if it changes externally

  useEffect(() => {
    // Calculate upcoming citas count from the fetched 'citas' data
    // This assumes 'citas' in CitaContext is updated with the result of the fetchCitas call
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set to start of today for comparison

    const upcoming = citas.filter(cita => {
      const citaDate = new Date(cita.fecha);
      return cita.estado === 'programada' && citaDate >= today;
    });
    setNumUpcomingCitas(upcoming.length);
  }, [citas]); // Recalculate when 'citas' from context changes

  // Basic inline styles
  const containerStyle = {
    padding: '2rem',
    fontFamily: 'Arial, sans-serif',
  };
  const statsContainerStyle = {
    display: 'flex',
    justifyContent: 'space-around',
    marginBottom: '2rem',
    padding: '1rem',
    backgroundColor: '#f0f0f0',
    borderRadius: '8px',
  };
  const statBoxStyle = {
    textAlign: 'center',
    padding: '1rem',
    border: '1px solid #ddd',
    borderRadius: '4px',
    minWidth: '200px',
  };
  const quickLinksContainerStyle = {
    display: 'flex',
    justifyContent: 'center',
    gap: '1rem',
    flexWrap: 'wrap',
  };
  const buttonStyle = {
    padding: '10px 15px',
    fontSize: '1rem',
    color: 'white',
    backgroundColor: '#007bff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    textDecoration: 'none',
  };

  const displayTotalLeads = totalLeadsFromContext || 0;

  // Overall loading state for the dashboard content
  const isOverallLoading = isLoadingStats || isLoadingLeadsContext || isLoadingCitasContext;

  return (
    <div style={containerStyle}>
      <h1 style={{ textAlign: 'center', marginBottom: '2rem' }}>Welcome to the CRM Dashboard</h1>

      {isOverallLoading && !leadContextError && !citaContextError && (
        <div style={{ display: 'flex', justifyContent: 'center', margin: '2rem' }}>
          <LoadingSpinner />
        </div>
      )}
      
      {leadContextError && <ErrorMessage message={leadContextError.message || "Error loading lead data."} />}
      {citaContextError && !leadContextError && <ErrorMessage message={citaContextError.message || "Error loading appointment data."} />}


      {!isOverallLoading && !leadContextError && !citaContextError && (
        <div style={statsContainerStyle}>
          <div style={statBoxStyle}>
            <h3>Total Active Leads</h3>
            <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>{displayTotalLeads}</p>
          </div>
          <div style={statBoxStyle}>
            <h3>Upcoming Appointments</h3>
            <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>{numUpcomingCitas}</p>
          </div>
        </div>
      )}

      {!isOverallLoading && ( // Show links even if there's an error in stats, so user can navigate
         <div style={{marginTop: '3rem'}}>
            <h2 style={{ textAlign: 'center', marginBottom: '1.5rem' }}>Quick Links</h2>
            <div style={quickLinksContainerStyle}>
              <Link to="/leads/nuevo" style={buttonStyle}>Register New Lead</Link>
              <Link to="/citas/nueva" style={buttonStyle}>Schedule New Appointment</Link>
              <Link to="/leads" style={buttonStyle}>View All Leads</Link>
              <Link to="/citas" style={buttonStyle}>View All Appointments</Link>
            </div>
        </div>
      )}
    </div>
  );
};

export default DashboardPage;
