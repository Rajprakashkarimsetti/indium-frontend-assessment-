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
      category
    }
  }
`;

const Transactions = () => {
  const { data, loading, error } = useQuery(GET_ALL_TRANSACTIONS);

  if (loading) return <p>Loading transactions...</p>;
  if (error) return <p>Error loading transactions: {error.message}</p>;

  const handleEdit = (id) => {
    // Implement edit functionality
    console.log(`Edit transaction with id: ${id}`);
  };

  const handleDelete = (id) => {
    // Implement delete functionality
    console.log(`Delete transaction with id: ${id}`);
  };

  return (
    <div className="transactions-list">
      <h2>Transaction List</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ borderBottom: '2px solid #ddd', backgroundColor: '#f9f9f9' }}>
            <th style={{ padding: '30px', textAlign: 'left' }}>Description</th>
            <th style={{ padding: '30px', textAlign: 'left' }}>Amount</th>
            <th style={{ padding: '30px', textAlign: 'left' }}>Date</th>
            <th style={{ padding: '30px', textAlign: 'left' }}>Category</th>
            <th style={{ padding: '30px', textAlign: 'left' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.getAllTransactions.map((transaction) => (
            <tr key={transaction.id} style={{ borderBottom: '1px solid #ddd' }}>
              <td style={{ padding: '10px' }}>{transaction.description}</td>
              <td style={{ padding: '10px' }}>${transaction.amount.toFixed(2)}</td>
              <td style={{ padding: '10px' }}>{new Date(transaction.date).toLocaleDateString()}</td>
              <td style={{ padding: '10px' }}>{transaction.category}</td>
              <td style={{ padding: '10px' }}>
                <button
                  style={{ marginRight: '10px', padding: '6px 10px', cursor: 'pointer' }}
                  onClick={() => handleEdit(transaction.id)}
                >
                  Edit
                </button>
                <button
                  style={{ padding: '6px 10px', cursor: 'pointer' }}
                  onClick={() => handleDelete(transaction.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Transactions;
