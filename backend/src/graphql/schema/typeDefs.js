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
    createUser(name: String!, email: String!, password: String!): User
    addTransaction(amount: Float!, description: String!): Transaction
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
  }
`;

module.exports = typeDefs;
