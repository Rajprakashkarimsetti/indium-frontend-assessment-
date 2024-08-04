// src/components/Dashboard/Transactions.js
import React from 'react';
import { useMutation, gql } from '@apollo/client';

const DELETE_TRANSACTION_MUTATION = gql`
  mutation DeleteTransaction($id: ID!) {
    deleteTransaction(id: $id) {
      id
    }
  }
`;

const GET_ALL_TRANSACTIONS_QUERY = gql`
  query GetAllTransactions {
    getAllTransactions {
      id
      amount
      description
      date
      category
    }
  }
`;

const tableStyles = {
  width: '100%',
  borderCollapse: 'collapse',
  margin: '20px 0',
};

const thStyles = {
  textAlign: 'left',
  padding: '12px 15px',
  borderBottom: '2px solid #ddd',
  backgroundColor: '#f2f2f2',
  fontWeight: 'bold',
};

const tdStyles = {
  padding: '12px 15px',
  borderBottom: '1px solid #ddd',
  verticalAlign: 'top',
};

const buttonStyles = {
  border: 'none',
  padding: '8px 12px',
  margin: '0 4px',
  cursor: 'pointer',
  borderRadius: '4px',
};

const editButtonStyles = {
  ...buttonStyles,
  backgroundColor: '#4CAF50', // Green
  color: 'white',
};

const deleteButtonStyles = {
  ...buttonStyles,
  backgroundColor: '#f44336', // Red
  color: 'white',
};

const Transactions = ({ transactions, onEdit }) => {
  const [deleteTransaction] = useMutation(DELETE_TRANSACTION_MUTATION, {
    update(cache, { data: { deleteTransaction } }) {
      // Update cache after deletion
      const { getAllTransactions } = cache.readQuery({ query: GET_ALL_TRANSACTIONS_QUERY });
      cache.writeQuery({
        query: GET_ALL_TRANSACTIONS_QUERY,
        data: {
          getAllTransactions: getAllTransactions.filter(
            transaction => transaction.id !== deleteTransaction.id
          ),
        },
      });
    },
  });

  const handleDelete = async (id) => {
    try {
      await deleteTransaction({ variables: { id } });
      alert('Transaction deleted successfully');
    } catch (error) {
      console.error('Error deleting transaction:', error);
      alert('Failed to delete transaction');
    }
  };
  

  return (
    <div className="transactions-list">
      <h3>Transaction List</h3>
      {transactions.length === 0 ? (
        <p>No transactions found.</p>
      ) : (
        <table style={tableStyles}>
          <thead>
            <tr>
              <th style={thStyles}>Description</th>
              <th style={thStyles}>Amount</th>
              <th style={thStyles}>Date</th>
              <th style={thStyles}>Category</th>
              <th style={thStyles}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map(transaction => (
              <tr key={transaction.id}>
                <td style={tdStyles}>{transaction.description}</td>
                <td style={tdStyles}>${transaction.amount.toFixed(2)}</td>
                <td style={tdStyles}>{transaction.date}</td>
                <td style={tdStyles}>{transaction.category}</td>
                <td style={tdStyles}>
                  <button
                    style={editButtonStyles}
                    onClick={() => onEdit(transaction.id)}
                  >
                    Edit
                  </button>
                  <button
                    style={deleteButtonStyles}
                    onClick={() => handleDelete(transaction.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Transactions;
