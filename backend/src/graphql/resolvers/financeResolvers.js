// src/graphql/resolvers/financeResolvers.js
const transactions = require('../../data/transactions.json');

const financeResolvers = {
  Query: {
    financeSummary: () => {
      let totalIncome = 0;
      let totalExpenses = 0;

      transactions.forEach(transaction => {
        if (transaction.amount > 0) {
          totalIncome += transaction.amount;
        } else {
          totalExpenses += Math.abs(transaction.amount);
        }
      });

      const balance = totalIncome - totalExpenses;

      return {
        totalIncome,
        totalExpenses,
        balance,
      };
    },
  },
};

module.exports = financeResolvers;
