import React, { createContext, useState, useCallback, useContext, useEffect } from 'react';

// 1. Create NotificationContext
const NotificationContext = createContext();

// 2. Create NotificationProvider component
export const NotificationProvider = ({ children }) => {
  const [notification, setNotification] = useState(null); // { message: '', type: 'success'/'error' }
  const [timeoutId, setTimeoutId] = useState(null);

  const hideNotification = useCallback(() => {
    setNotification(null);
    if (timeoutId) {
      clearTimeout(timeoutId);
      setTimeoutId(null);
    }
  }, [timeoutId]);

  const showNotification = useCallback((message, type = 'success', duration = 3000) => {
    // Clear any existing notification timeout
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    setNotification({ message, type });

    const newTimeoutId = setTimeout(() => {
      hideNotification();
    }, duration);
    setTimeoutId(newTimeoutId);
  }, [hideNotification, timeoutId]);

  // Cleanup timeout on component unmount
  useEffect(() => {
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [timeoutId]);

  const contextValues = {
    notification,
    showNotification,
    hideNotification,
  };

  return (
    <NotificationContext.Provider value={contextValues}>
      {children}
    </NotificationContext.Provider>
  );
};

// 3. Create and export useNotification custom hook
export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};
