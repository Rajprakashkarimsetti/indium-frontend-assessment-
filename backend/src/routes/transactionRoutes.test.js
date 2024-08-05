// src/routes/transactionRoutes.test.js
const request = require('supertest');
const express = require('express');
const transactionRoutes = require('./transactionRoutes'); // Adjust the path as needed
const authMiddleware = require('../middlewares/authMiddleware');

// Mock the resolvers
jest.mock('../graphql/resolvers/transactionResolvers', () => ({
  getTransactions: jest.fn(),
  getTransaction: jest.fn(),
  addTransaction: jest.fn(),
  deleteTransaction: jest.fn()
}));

const { getTransactions, getTransaction, addTransaction, deleteTransaction } = require('../graphql/resolvers/transactionResolvers');

// Mock the middleware
jest.mock('../middlewares/authMiddleware', () => (req, res, next) => next());

const app = express();
app.use(express.json());
app.use('/transactions', transactionRoutes);

describe('Transaction Routes', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /transactions', () => {
    it('should return a list of transactions', async () => {
      // Mock resolver response
      getTransactions.mockResolvedValue([
        { id: 1, title: 'Salary', amount: 1000 },
        { id: 2, title: 'Rent', amount: -500 }
      ]);

      const response = await request(app)
        .get('/transactions/transactions')
        .expect(200);

      expect(response.body).toEqual([
        { id: 1, title: 'Salary', amount: 1000 },
        { id: 2, title: 'Rent', amount: -500 }
      ]);
      expect(getTransactions).toHaveBeenCalled();
    });

    it('should return an error message on failure', async () => {
      // Mock resolver to throw an error
      getTransactions.mockRejectedValue(new Error('Failed to retrieve transactions'));

      const response = await request(app)
        .get('/transactions/transactions')
        .expect(400);

      expect(response.text).toBe('Failed to retrieve transactions');
    });
  });

  describe('GET /transaction/:id', () => {
    it('should return a single transaction', async () => {
      // Mock resolver response
      getTransaction.mockResolvedValue({ id: 1, title: 'Salary', amount: 1000 });

      const response = await request(app)
        .get('/transactions/transaction/1')
        .expect(200);

      expect(response.body).toEqual({ id: 1, title: 'Salary', amount: 1000 });
      expect(getTransaction).toHaveBeenCalledWith(null, { id: '1' });
    });

    it('should return an error message on failure', async () => {
      // Mock resolver to throw an error
      getTransaction.mockRejectedValue(new Error('Failed to retrieve transaction'));

      const response = await request(app)
        .get('/transactions/transaction/1')
        .expect(400);

      expect(response.text).toBe('Failed to retrieve transaction');
    });
  });

  describe('POST /transaction', () => {
    it('should add a new transaction', async () => {
      // Mock resolver response
      addTransaction.mockResolvedValue({ id: 1, title: 'Salary', amount: 1000 });

      const response = await request(app)
        .post('/transactions/transaction')
        .send({ title: 'Salary', category: 'Income', amount: 1000, date: '2024-08-01' })
        .expect(200);

      expect(response.body).toEqual({ id: 1, title: 'Salary', amount: 1000 });
      expect(addTransaction).toHaveBeenCalledWith(null, { title: 'Salary', category: 'Income', amount: 1000, date: '2024-08-01' });
    });

    it('should return an error message on failure', async () => {
      // Mock resolver to throw an error
      addTransaction.mockRejectedValue(new Error('Failed to add transaction'));

      const response = await request(app)
        .post('/transactions/transaction')
        .send({ title: 'Salary', category: 'Income', amount: 1000, date: '2024-08-01' })
        .expect(400);

      expect(response.text).toBe('Failed to add transaction');
    });
  });

  describe('DELETE /transaction/:id', () => {
    it('should delete a transaction', async () => {
      // Mock resolver response
      deleteTransaction.mockResolvedValue({ id: 1, title: 'Salary', amount: 1000 });

      const response = await request(app)
        .delete('/transactions/transaction/1')
        .expect(200);

      expect(response.body).toEqual({ id: 1, title: 'Salary', amount: 1000 });
      expect(deleteTransaction).toHaveBeenCalledWith(null, { id: '1' });
    });

    it('should return an error message on failure', async () => {
      // Mock resolver to throw an error
      deleteTransaction.mockRejectedValue(new Error('Failed to delete transaction'));

      const response = await request(app)
        .delete('/transactions/transaction/1')
        .expect(400);

      expect(response.text).toBe('Failed to delete transaction');
    });
  });
});
