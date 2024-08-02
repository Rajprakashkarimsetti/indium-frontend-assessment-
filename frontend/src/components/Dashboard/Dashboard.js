import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import '../../styles/global.css'; // Import global styles
import '../../styles/variables.css'; // Import variable styles

const GET_FINANCE_SUMMARY = gql`
  query GetFinanceSummary {
    financeSummary {
      totalIncome
      totalExpenses
      balance
    }
  }
`;

const Dashboard = () => {
  const { data, loading, error } = useQuery(GET_FINANCE_SUMMARY);
  const navigate = useNavigate();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const { balance = 0, totalIncome = 0, totalExpenses = 0 } = data?.financeSummary || {};

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/login');
  };

  const handleAddTransaction = () => {
    navigate('/transaction');
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Personal Finance Manager</h1>
        <div className="dashboard-controls">
          <button className="dashboard-button" onClick={handleAddTransaction}>Add New Transaction</button>
          <button className="dashboard-button" onClick={handleLogout}>Logout</button>
        </div>
      </header>
      <div className="dashboard-content">
        <h2 className="dashboard-title">Finance Dashboard</h2>
        <div className="dashboard-stats">
          <p>Total Balance: ${balance.toFixed(2)}</p>
          <p>Income: ${totalIncome.toFixed(2)}</p>
          <p>Expenses: ${totalExpenses.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
