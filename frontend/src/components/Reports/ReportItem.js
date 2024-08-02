import React from 'react';

const ReportItem = ({ transaction }) => {
  return (
    <div>
      <p>{transaction.description} - ${transaction.amount}</p>
    </div>
  );
};

export default ReportItem;
