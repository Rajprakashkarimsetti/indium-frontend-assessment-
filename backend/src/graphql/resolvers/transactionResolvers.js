const inMemoryDB = require('../../data/inMemoryDB');


const resolvers = {
    Mutation: {
        createTransaction: async (_, { amount, description, date }) => {
            const newTransaction = {
                id: Date.now().toString(), // Generating a unique ID
                amount,
                description,
                date
            };
            return inMemoryDB.saveTransaction(newTransaction);
        }
    },
    Query: {
        // Define other queries here
    }
};

module.exports = resolvers;
