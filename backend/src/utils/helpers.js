const { transactions, users } = require('../data/inMemoryDB');

const findUserByUsername = (username) => users.find(user => user.username === username);
const findTransactionById = (id) => transactions.find(transaction => transaction.id === id);

module.exports = {
  findUserByUsername,
  findTransactionById,
};
