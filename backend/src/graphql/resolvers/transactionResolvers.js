const { transactions } = require('../../data/inMemoryDB');

const transactionResolvers = {
  Query: {
    getTransactions: () => transactions,
    getTransaction: (parent, { id }) => transactions.find(t => t.id === id),
  },
  Mutation: {
    addTransaction: (parent, { title, category, amount, date }) => {
      const newTransaction = { id: `${transactions.length + 1}`, title, category, amount, date };
      transactions.push(newTransaction);
      return newTransaction;
    },
    deleteTransaction: (parent, { id }) => {
      const index = transactions.findIndex(t => t.id === id);
      if (index === -1) {
        throw new Error('Transaction not found');
      }
      return transactions.splice(index, 1)[0];
    }
  }
};

module.exports = transactionResolvers;
