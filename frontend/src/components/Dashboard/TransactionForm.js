// src/components/Dashboard/TransactionForm.js
import { useMutation, gql } from '@apollo/client';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/global.css';
import '../../styles/variables.css';

const CREATE_TRANSACTION = gql`
  mutation CreateTransaction($amount: Float!, $description: String!, $date: String!, $category: String!) {
    createTransaction(amount: $amount, description: $description, date: $date, category: $category) {
      id
      amount
      description
      date
      category
    }
  }
`;

const GET_ALL_TRANSACTIONS = gql`
  query GetAllTransactions {
    getAllTransactions {
      id
      description
      amount
      date
      category
    }
  }
`;

const TransactionForm = () => {
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [category, setCategory] = useState('');
  const [createTransaction, { loading, error }] = useMutation(CREATE_TRANSACTION, {
    refetchQueries: [{ query: GET_ALL_TRANSACTIONS }],
    awaitRefetchQueries: true,
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
         await createTransaction({
        variables: {
          amount: parseFloat(amount),
          description,
          date,
          category,
        },
      });
      alert('Transaction added successfully!');
      navigate('/dashboard');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div class="container">
      <div class="centered-div">
        <label>Amount:</label>
        <input
          type="number"
          step="0.01"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Description:</label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Date:</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Category:</label>
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        />
      </div>
      <button type="submit" disabled={loading}>Save</button>
      {error && <p>Error adding transaction: {error.message}</p>}
      </div>
    </form>
  );
};

export default TransactionForm;
