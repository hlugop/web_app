import React from 'react';
// import styles from './ErrorMessage.module.css'; // Optional CSS module

const ErrorMessage = ({ message }) => {
  if (!message) return null;

  const style = { // Basic inline styles
    padding: '10px',
    backgroundColor: '#ffdddd',
    border: '1px solid #ff0000',
    color: '#d8000c',
    marginBottom: '10px',
    borderRadius: '4px',
    textAlign: 'center',
  };

  // Handle cases where the error might be an object (e.g., from Axios error.response.data)
  let displayMessage = message;
  if (typeof message === 'object' && message !== null) {
    if (message.message) { // Standard error object
      displayMessage = message.message;
    } else if (message.error) { // Sometimes errors are nested under 'error'
      displayMessage = message.error;
    } else {
      try {
        displayMessage = JSON.stringify(message);
      } catch (e) {
        displayMessage = 'An unexpected error object was received.';
      }
    }
  } else if (typeof message !== 'string') {
      displayMessage = 'An unexpected error occurred.';
  }


  return (
    <div style={style} /* className={styles.errorMessage} */ role="alert">
      {displayMessage}
    </div>
  );
};

export default ErrorMessage;
