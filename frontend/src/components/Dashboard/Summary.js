// src/components/Dashboard/Summary.js
import React from 'react';

const Summary = () => {
  return (
    <div className="summary-section">
      <h2>Finance Dashboard</h2>
      <p>Total Balance: $[Balance]</p>
      <p>Income: $[Total Income]</p>
      <p>Expenses: $[Total Expenses]</p>
      <div className="summary-categories">
        <p>Categories:</p>
        <ul>
          <li>Salary</li>
          <li>Rent</li>
          <li>Groceries</li>
          <li>Utilities</li>
          <li>Entertainment</li>
        </ul>
      </div>
    </div>
  );
};

export default Summary;
