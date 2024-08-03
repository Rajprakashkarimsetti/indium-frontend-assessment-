import React from 'react';
import { useQuery, gql } from '@apollo/client';
import '../../styles/global.css'; // Import global styles
import '../../styles/variables.css'; // Import variable styles

const GET_ALL_TRANSACTIONS = gql`
  query GetAllTransactions {
    getAllTransactions {
      id
      description
      amount
      date
      category  # Added category field
    }
  }
`;

const Transactions = () => {
  const { data, loading, error } = useQuery(GET_ALL_TRANSACTIONS);

  if (loading) return <p>Loading transactions...</p>;
  if (error) return <p>Error loading transactions: {error.message}</p>;

  return (
    <div className="transactions-list">
      <h2>Transaction List</h2>
      <ul>
        {data.getAllTransactions.map((transaction) => (
          <li key={transaction.id}>
            <p>Description: {transaction.description}</p>
            <p>Amount: ${transaction.amount.toFixed(2)}</p>
            <p>Date: {new Date(transaction.date).toLocaleDateString()}</p>
            <p>Category: {transaction.category}</p>  {/* Display category */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Transactions;
