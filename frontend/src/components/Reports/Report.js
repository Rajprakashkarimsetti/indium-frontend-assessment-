import React from 'react';
import { useSelector } from 'react-redux';
import ReportItem from './ReportItem';

const Report = () => {
  const transactions = useSelector(state => state.transactions.items);

  const incomeTransactions = transactions.filter(t => t.type === 'income');
  const expenseTransactions = transactions.filter(t => t.type === 'expense');

  return (
    <div>
      <h2>Reports</h2>
      <div>
        <h3>Income</h3>
        {incomeTransactions.map(transaction => (
          <ReportItem key={transaction.id} transaction={transaction} />
        ))}
      </div>
      <div>
        <h3>Expenses</h3>
        {expenseTransactions.map(transaction => (
          <ReportItem key={transaction.id} transaction={transaction} />
        ))}
      </div>
    </div>
  );
};

export default Report;
