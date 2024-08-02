// src/pages/TransactionPage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const TransactionPage = () => {
  const navigate = useNavigate();

  const handleSave = () => {
    // Add your save functionality here
    alert('Transaction saved!');
    navigate('/dashboard'); // Redirect to dashboard after saving
  };

  const handleCancel = () => {
    navigate('/dashboard'); // Redirect to dashboard on cancel
  };

  return (
    <div className="transaction-container">
      <header className="transaction-header">
        <h1>Personal Finance Manager</h1>
        <button className="transaction-button" onClick={() => navigate('/dashboard')}>Back to List</button>
      </header>
      <div className="transaction-form">
        <h2>Add/Edit Transaction</h2>
        <label>
          Description:
          <input type="text" />
        </label>
        <label>
          Category:
          <input type="text" />
        </label>
        <label>
          Amount:
          <input type="number" />
        </label>
        <label>
          Date:
          <input type="date" />
        </label>
        <div className="transaction-buttons">
          <button className="transaction-button" onClick={handleSave}>Save</button>
          <button className="transaction-button" onClick={handleCancel}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default TransactionPage;
