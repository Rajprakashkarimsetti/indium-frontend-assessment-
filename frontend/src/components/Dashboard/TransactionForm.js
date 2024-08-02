// src/components/Dashboard/TransactionForm.js
import React from 'react';

const TransactionForm = () => {
  return (
    <div className="transaction-form">
      <h2>Add New Transaction</h2>
      {/* Add form fields here */}
      <form>
        {/* Example fields */}
        <label htmlFor="amount">Amount:</label>
        <input type="number" id="amount" name="amount" />
        
        <label htmlFor="description">Description:</label>
        <input type="text" id="description" name="description" />
        
        <button type="submit">Add Transaction</button>
      </form>
    </div>
  );
};

export default TransactionForm;
