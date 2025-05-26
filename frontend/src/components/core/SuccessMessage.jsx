import React from 'react';
// import styles from './SuccessMessage.module.css'; // Optional CSS module

const SuccessMessage = ({ message }) => {
  if (!message) return null;

  const style = { // Basic inline styles
    padding: '10px',
    backgroundColor: '#ddffdd',
    border: '1px solid #008000',
    color: '#006400',
    marginBottom: '10px',
    borderRadius: '4px',
    textAlign: 'center',
  };

  return (
    <div style={style} /* className={styles.successMessage} */ role="status">
      {message}
    </div>
  );
};

export default SuccessMessage;
