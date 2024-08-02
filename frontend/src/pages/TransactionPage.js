import React from 'react';
import TransactionForm from '../components/Dashboard/TransactionForm';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const TransactionPage = () => {
  const { id } = useParams();
  const transaction = useSelector(state =>
    state.transactions.items.find(t => t.id === id)
  );

  return <TransactionForm transaction={transaction} />;
};

export default TransactionPage;
