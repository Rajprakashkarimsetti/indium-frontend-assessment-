// src/components/Dashboard/Dashboard.js
import React, { useState } from 'react';
import { useQuery, useMutation, gql } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import Transactions from './Transactions';

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

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    padding: '20px',
  };

  const headerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
  };

  const controlsStyle = {
    display: 'flex',
    gap: '10px',
  };

  const buttonStyle = {
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    backgroundColor: '#007bff',
    color: '#fff',
    cursor: 'pointer',
  };

  const contentStyle = {
    display: 'flex',
    flexDirection: 'column',
  };

  const titleStyle = {
    fontSize: '1.5em',
    marginBottom: '20px',
  };

  const statsStyle = {
    marginBottom: '20px',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  };

  const summaryStyle = {
    display: 'flex',
    gap: '20px',
  };

  const searchStyle = {
    display: 'flex',
    gap: '10px',
    marginBottom: '20px',
  };

  const inputStyle = {
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '5px',
  };

  const transactionListStyle = {
    marginTop: '20px',
  };

  return (
    <div style={containerStyle}>
      <header style={headerStyle}>
        <h1>Personal Finance Manager</h1>
        <div style={controlsStyle}>
          <button style={buttonStyle} onClick={handleAddTransaction}>Add Transaction</button>
          <button style={buttonStyle} onClick={handleLogout}>Logout</button>
        </div>
      </header>
      <div style={contentStyle}>
        <h2 style={titleStyle}>Finance Dashboard</h2>
        <div style={statsStyle}>
          <p>Total Balance: ${balance.toFixed(2)}</p>
          <div style={summaryStyle}>
            <p>Income: ${totalIncome.toFixed(2)}</p>
          </div>
          <div style={summaryStyle}>
            <p>Expenses: ${totalExpenses.toFixed(2)}</p>
          </div>
          <p>Categories: {category.join(', ')}</p>
        </div>
        <div style={searchStyle}>
          <input
            type="text"
            placeholder="Search by description..."
            value={searchTerm}
            onChange={handleSearchChange}
            style={inputStyle}
          />
          <select
            value={selectedCategory}
            onChange={handleCategoryChange}
            style={inputStyle}
          >
            <option value="">All Categories</option>
            {category.map((cat, index) => (
              <option key={index} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
        <div style={transactionListStyle}>
          <Transactions
            transactions={filteredTransactions}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
