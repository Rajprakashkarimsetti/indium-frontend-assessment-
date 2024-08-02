const authResolvers = require('./authResolvers');
const transactionResolvers = require('./transactionResolvers');
const financeResolvers = require('./financeResolvers');

const resolvers = {
  Query: {
    ...authResolvers.Query,
    ...transactionResolvers.Query,
    ...financeResolvers.Query,
  },
  Mutation: {
    ...authResolvers.Mutation,
    ...transactionResolvers.Mutation,
  },
};

module.exports = resolvers;
