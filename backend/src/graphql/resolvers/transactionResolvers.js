const inMemoryDB = require('../../data/inMemoryDB');

const resolvers = {
    Query: {
        getAllTransactions: async () => {
            // Fetch all transactions from the in-memory database
            return inMemoryDB.getTransactions();
        }
    },
    Mutation: {
        createTransaction: async (_, { amount, description, date, category }) => {
            const newTransaction = {
                id: Date.now().toString(), // Generating a unique ID
                amount,
                description,
                date,
                category
            };
            // Save the new transaction and return it
            return inMemoryDB.saveTransaction(newTransaction);
        },
        deleteTransaction: async (_, { id }) => {
            const success = inMemoryDB.deleteTransaction(id);
            if (!success) {
                throw new Error('Transaction not found');
            }
            return { id };
        }
    }
};

module.exports = resolvers;
