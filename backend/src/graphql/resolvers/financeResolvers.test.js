// src/graphql/resolvers/financeResolvers.test.js
const financeResolvers = require('./financeResolvers');
const { getAllTransactions } = require('../../data/inMemoryDB');

jest.mock('../../data/inMemoryDB'); // Mock the module

describe('Finance Resolvers', () => {
  describe('financeSummary', () => {
    it('should return correct summary for a list of transactions', () => {
      // Mock data
      const transactions = [
        { amount: 100, category: 'Salary' },
        { amount: -50, category: 'Groceries' },
        { amount: 200, category: 'Freelance' },
        { amount: -30, category: 'Utilities' },
      ];
      
      // Mock implementation
      getAllTransactions.mockReturnValue(transactions);

      // Expected result
      const expected = {
        totalIncome: 300,
        totalExpenses: 80,
        balance: 220,
        category: new Set(['Salary', 'Groceries', 'Freelance', 'Utilities']),
      };

      // Call resolver
      const result = financeResolvers.Query.financeSummary();

      // Assertions
      expect(result).toEqual(expected);
    });

    it('should return zero values when there are no transactions', () => {
      // Mock implementation
      getAllTransactions.mockReturnValue([]);

      // Expected result
      const expected = {
        totalIncome: 0,
        totalExpenses: 0,
        balance: 0,
        category: new Set(),
      };

      // Call resolver
      const result = financeResolvers.Query.financeSummary();

      // Assertions
      expect(result).toEqual(expected);
    });

    it('should handle transactions with only positive amounts', () => {
      // Mock data
      const transactions = [
        { amount: 100, category: 'Salary' },
        { amount: 200, category: 'Freelance' },
      ];

      // Mock implementation
      getAllTransactions.mockReturnValue(transactions);

      // Expected result
      const expected = {
        totalIncome: 300,
        totalExpenses: 0,
        balance: 300,
        category: new Set(['Salary', 'Freelance']),
      };

      // Call resolver
      const result = financeResolvers.Query.financeSummary();

      // Assertions
      expect(result).toEqual(expected);
    });

    it('should handle transactions with only negative amounts', () => {
      // Mock data
      const transactions = [
        { amount: -50, category: 'Groceries' },
        { amount: -30, category: 'Utilities' },
      ];

      // Mock implementation
      getAllTransactions.mockReturnValue(transactions);

      // Expected result
      const expected = {
        totalIncome: 0,
        totalExpenses: 80,
        balance: -80,
        category: new Set(['Groceries', 'Utilities']),
      };

      // Call resolver
      const result = financeResolvers.Query.financeSummary();

      // Assertions
      expect(result).toEqual(expected);
    });
  });
});
