const { gql } = require('apollo-server-express');
const authTypes = require('./authTypes');
const financeTypes = require('./financeTypes');
const transactionTypes = require('./transactionTypes');

const typeDefs = gql`
  type Query {
    getUser(id: ID!): User
    getAllTransactions: [Transaction]
    financeSummary: FinanceSummary
  }

  type Mutation {
    login(email: String!, password: String!): AuthPayload
    register(name: String!, email: String!, password: String!): AuthPayload
    createTransaction(amount: Float!, description: String!, date: String!): Transaction
  }

  type AuthPayload {
    token: String
    user: User
  }

  type User {
    id: ID!
    name: String!
    email: String!
  }

  type Transaction {
    id: ID!
    amount: Float!
    description: String!
    date: String!
  }

  type FinanceSummary {
    totalIncome: Float
    totalExpenses: Float
    balance: Float
  }
`;

module.exports = typeDefs;
