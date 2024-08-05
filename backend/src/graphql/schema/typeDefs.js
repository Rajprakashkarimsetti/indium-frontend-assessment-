const { gql } = require('apollo-server-express');
const authTypes = require('./authTypes');
const financeTypes = require('./financeTypes');
const transactionTypes = require('./transactionTypes');

const typeDefs = gql`
  type Query {
    getUser(id: ID!): User
    getAllTransactions: [Transaction]
    financeSummary: FinanceSummary
    getTransactionById(id: ID!): Transaction
  }

  type Mutation {
    login(email: String!, password: String!): AuthPayload
    register(name: String!, email: String!, password: String!): AuthPayload
    createTransaction(amount: Float!, category: String!, description: String!, date: String!): Transaction
    deleteTransaction(id: ID!): TransactionResponse
    updateTransaction(id: ID!, amount: Float, category: String, description: String, date: String): Transaction
    getTransactionById(id:ID!): Transaction
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
    category: String!
    description: String!
    date: String!
  }

  type FinanceSummary {
    totalIncome: Float
    totalExpenses: Float
    balance: Float
    category: [String!]
  }

  type TransactionResponse {
    id: ID!
  }
`;

module.exports = typeDefs;
