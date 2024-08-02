// src/graphql/resolvers/index.js
const authResolvers = require('./authResolvers');
const transactionResolvers = require('./transactionResolvers');

const resolvers = {
  Query: {
    ...authResolvers.Query,
    ...transactionResolvers.Query,
  },
  Mutation: {
    ...authResolvers.Mutation,
    ...transactionResolvers.Mutation,
  },
};

module.exports = resolvers;
