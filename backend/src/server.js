const { ApolloServer } = require('apollo-server-express');
const express = require('express');
const typeDefs = require('./graphql/schema/typeDefs'); // Ensure this path is correct
const resolvers = require('./graphql/resolvers'); // Ensure this path is correct

const app = express();

// Initialize Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    // Optional: Add any context setup if needed, e.g., authentication
    return {};
  },
  // Enable playground for development purposes
  playground: true,
  // Enable introspection for development purposes
  introspection: true,
});

// Apply middleware to the Express app
server.applyMiddleware({ app });

// Start the server
app.listen({ port: 4000 }, () => {
  console.log(`Server ready at http://localhost:4000${server.graphqlPath}`);
});
