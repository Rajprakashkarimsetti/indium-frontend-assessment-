// src/graphql/schema/typeDefs.js
const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Query {
    getUser(id: ID!): User
    getAllTransactions: [Transaction]
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
`;

module.exports = typeDefs;
