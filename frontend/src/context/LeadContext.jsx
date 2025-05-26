import React, { createContext, useState, useContext } from 'react';
import * as api from '../services/api'; // Ensure this path is correct
// import { useNotification } from './NotificationContext'; // Uncomment if you want to use notifications

// 1. Create LeadContext
const LeadContext = createContext();

// 2. Create LeadProvider component
export const LeadProvider = ({ children }) => {
  const [leads, setLeads] = useState([]);
  const [totalLeads, setTotalLeads] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoadingLeads, setIsLoadingLeads] = useState(false);
  const [leadError, setLeadError] = useState(null);
  // const { showNotification } = useNotification(); // Uncomment for notifications

  const fetchLeads = async (params) => {
    setIsLoadingLeads(true);
    setLeadError(null);
    try {
      const data = await api.getLeads(params); // Assuming API returns { leads: [], totalLeads: X, totalPages: Y, currentPage: Z }
      setLeads(data.leads || []);
      setTotalLeads(data.totalLeads || 0);
      setTotalPages(data.totalPages || 0);
      setCurrentPage(data.currentPage || 1);
      // showNotification('Leads fetched successfully!', 'success'); // Example
    } catch (error) {
      console.error('LeadContext - fetchLeads error:', error);
      setLeadError(error);
      // showNotification(error.message || 'Failed to fetch leads', 'error');
    } finally {
      setIsLoadingLeads(false);
    }
  };

  const addLead = async (leadData) => {
    setIsLoadingLeads(true); // Or a specific adding state like isAddingLead
    setLeadError(null);
    try {
      const newLead = await api.createLead(leadData);
      // Optionally, refetch all leads to include the new one and update pagination
      // Or, if the backend returns the created lead and you don't need to update pagination immediately:
      setLeads(prevLeads => [...prevLeads, newLead]); 
      // Consider how to update totalLeads, totalPages if not refetching.
      // For simplicity, we might refetch:
      // await fetchLeads({ page: currentPage }); // Or whatever the current params are
      // showNotification('Lead added successfully!', 'success');
      return newLead; 
    } catch (error) {
      console.error('LeadContext - addLead error:', error);
      setLeadError(error);
      // showNotification(error.message || 'Failed to add lead', 'error');
      throw error; // Re-throw to be caught by the calling component if needed
    } finally {
      setIsLoadingLeads(false);
    }
  };

  const contextValues = {
    leads,
    totalLeads,
    totalPages,
    currentPage,
    isLoadingLeads,
    leadError,
    fetchLeads,
    addLead,
  };

  return (
    <LeadContext.Provider value={contextValues}>
      {children}
    </LeadContext.Provider>
  );
};

// 3. Create and export useLeads custom hook
export const useLeads = () => {
  const context = useContext(LeadContext);
  if (context === undefined) {
    throw new Error('useLeads must be used within a LeadProvider');
  }
  return context;
};
