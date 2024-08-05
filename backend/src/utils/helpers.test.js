// src/helpers.test.js
const { findUserByUsername, findTransactionById } = require('./helpers');

// Sample data to mimic inMemoryDB
const sampleUsers = [
  { username: 'john_doe', password: 'password123' },
  { username: 'jane_smith', password: 'password456' }
];

const sampleTransactions = [
  { id: 1, title: 'Salary', amount: 1000 },
  { id: 2, title: 'Rent', amount: -500 }
];

// Mock the inMemoryDB module
jest.mock('../data/inMemoryDB', () => ({
  users: sampleUsers,
  transactions: sampleTransactions
}));

describe('Helpers Functions', () => {
  describe('findUserByUsername', () => {
    it('should return the user object if the username exists', () => {
      const user = findUserByUsername('john_doe');
      expect(user).toEqual({ username: 'john_doe', password: 'password123' });
    });

    it('should return undefined if the username does not exist', () => {
      const user = findUserByUsername('non_existent_user');
      expect(user).toBeUndefined();
    });
  });

  describe('findTransactionById', () => {
    it('should return the transaction object if the id exists', () => {
      const transaction = findTransactionById(1);
      expect(transaction).toEqual({ id: 1, title: 'Salary', amount: 1000 });
    });

    it('should return undefined if the id does not exist', () => {
      const transaction = findTransactionById(999);
      expect(transaction).toBeUndefined();
    });
  });
});
