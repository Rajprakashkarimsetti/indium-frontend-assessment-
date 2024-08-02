// src/redux/actions/transactionActions.js
import {
  ADD_TRANSACTION,
  EDIT_TRANSACTION,
  DELETE_TRANSACTION
} from './types';

// Action creators
export const addTransaction = (transaction) => ({
  type: ADD_TRANSACTION,
  payload: transaction
});

export const editTransaction = (transaction) => ({
  type: EDIT_TRANSACTION,
  payload: transaction
});

export const deleteTransaction = (id) => ({
  type: DELETE_TRANSACTION,
  payload: id
});
