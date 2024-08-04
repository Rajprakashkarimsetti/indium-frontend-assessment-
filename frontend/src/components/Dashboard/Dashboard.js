// src/components/Dashboard/Dashboard.js
import React, { useState } from 'react';
import { useQuery, useMutation, gql } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import Transactions from './Transactions';
import '../../styles/global.css';
import '../../styles/variables.css';

const GET_FINANCE_SUMMARY = gql`
  query GetFinanceSummary {
    financeSummary {
      totalIncome
      totalExpenses
      balance
      category
    }
    getAllTransactions {
      id
      description
      amount
      date
      category
    }
  }
`;

const DELETE_TRANSACTION = gql`
  mutation DeleteTransaction($id: ID!) {
    deleteTransaction(id: $id) {
      id
    }
  }
`;

const Dashboard = () => {
  const { data, loading, error, refetch } = useQuery(GET_FINANCE_SUMMARY);
  const [deleteTransaction] = useMutation(DELETE_TRANSACTION, {
    onCompleted: () => refetch(),
  });
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const { balance = 0, totalIncome = 0, totalExpenses = 0, category = [] } = data?.financeSummary || {};
  const transactions = data?.getAllTransactions || [];

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/login');
  };

  const handleAddTransaction = () => {
    navigate('/transaction');
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  const filteredTransactions = transactions
    .filter(transaction =>
      (selectedCategory ? transaction.category === selectedCategory : true) &&
      (searchTerm ? transaction.description.toLowerCase().includes(searchTerm) : true)
    );

  const handleEdit = (id) => {
    navigate(`/edit-transaction/${id}`);
  };

  const handleDelete = async (id) => {
    try {
      await deleteTransaction({ variables: { id } });
      alert('Transaction deleted successfully');
    } catch (error) {
      console.error("Error deleting transaction:", error.message);
      alert('Failed to delete transaction');
    }
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
          <p>Categories: {category.map(item => item + ' ')}</p>
        </div>
        <div className="dashboard-search">
          <input
            type="text"
            placeholder="Search by description..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="search-input"
          />
          <select
            value={selectedCategory}
            onChange={handleCategoryChange}
            className="search-input"
          >
            <option value="">All Categories</option>
            {category.map((cat, index) => (
              <option key={index} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
        <Transactions
          transactions={filteredTransactions}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
};

export default Dashboard;
