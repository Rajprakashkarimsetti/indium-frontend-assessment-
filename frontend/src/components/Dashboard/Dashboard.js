// src/components/Dashboard/Dashboard.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Summary from './Summary';
import TransactionForm from './TransactionForm';
import Transactions from './Transactions';
import '../../styles/global.css'; // Import global styles
import '../../styles/variables.css'; // Import variable styles
import axios from 'axios';

const Dashboard = () => {
  const [balance, setBalance] = useState(0);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Replace with your actual API endpoint
        const response = await axios.get('/api/finance-summary');
        setBalance(response.data.balance);
        setTotalIncome(response.data.totalIncome);
        setTotalExpenses(response.data.totalExpenses);
      } catch (error) {
        console.error('Error fetching finance data', error);
      }
    };

    fetchData();
  }, []);

  const handleLogout = () => {
    // Clear any authentication tokens or session data here
    localStorage.removeItem('authToken');
    navigate('/login');
  };

  const handleAddTransaction = () => {
    navigate('/transaction'); // Redirect to the transaction page
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
          <p>Total Balance: ${balance}</p>
          <p>Income: ${totalIncome}</p>
          <p>Expenses: ${totalExpenses}</p>
        </div>
        <div className="dashboard-categories">
          <h3>Categories:</h3>
          <ul>
            <li>Salary</li>
            <li>Rent</li>
            <li>Groceries</li>
            <li>Utilities</li>
            <li>Entertainment</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
