// src/server.js
const { ApolloServer } = require('apollo-server-express');
const express = require('express');
const typeDefs = require('./graphql/schema/typeDefs');
const resolvers = require('./graphql/resolvers'); // Ensure this path is correct

const app = express();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  // other options
});

server.applyMiddleware({ app });

app.listen({ port: 4000 }, () =>
  console.log(`Server ready at http://localhost:4000${server.graphqlPath}`)
);
