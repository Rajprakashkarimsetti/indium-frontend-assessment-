// src/graphql/resolvers/index.js
const { mergeResolvers } = require('@graphql-tools/merge');
const authResolvers = require('./authResolvers');
const transactionResolvers = require('./transactionResolvers');
const financeResolvers = require('./financeResolvers');

const resolvers = mergeResolvers([authResolvers, transactionResolvers, financeResolvers]);

module.exports = resolvers;
