// src/components/Dashboard/Dashboard.js
import React from 'react';
import Summary from './Summary';
import TransactionForm from './TransactionForm';
import Transactions from './Transactions';
import '../../styles/global.css'; // Import global styles
import '../../styles/variables.css'; // Import variable styles

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Personal Finance Manager</h1>
        <div className="dashboard-controls">
          <button className="dashboard-button">Add New Transaction</button>
          <button className="dashboard-button">Logout</button>
        </div>
      </header>
      <div className="dashboard-summary">
        <Summary />
      </div>
      <div className="dashboard-transaction-form">
        <TransactionForm />
      </div>
      <div className="dashboard-transactions">
        <Transactions />
      </div>
    </div>
  );
};

export default Dashboard;
