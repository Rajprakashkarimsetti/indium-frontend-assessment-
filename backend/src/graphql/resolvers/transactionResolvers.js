const { v4: uuidv4 } = require('uuid');
const transactions = require('../../data/transactions.json');
const inMemoryDB = require('../../data/inMemoryDB');

const transactionResolvers = {
  Query: {
    getAllTransactions: () => {
      return transactions;
    },
  },
  Mutation: {
    createTransaction: (parent, { amount, description, date }, context) => {
      const newTransaction = {
        id: uuidv4(),
        amount,
        description,
        date,
      };
      transactions.push(newTransaction);
      // If you want to save it in inMemoryDB
      inMemoryDB.saveTransaction(newTransaction);
      return newTransaction;
    },
  },
};

module.exports = transactionResolvers;
