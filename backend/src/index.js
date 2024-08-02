const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const bodyParser = require('body-parser');

// Define your schema and resolvers
const typeDefs = gql`
  type Query {
    hello: String
  }
`;

const resolvers = {
  Query: {
    hello: () => 'Hello world!',
  },
};

// Create an ApolloServer instance
const server = new ApolloServer({ typeDefs, resolvers });

// Create an Express app
const app = express();

// Apply middleware
app.use(bodyParser.json());

// Apply Apollo GraphQL middleware
server.start().then(() => {
  server.applyMiddleware({ app });

  // Define a POST route for testing
  app.post('/test', (req, res) => {
    res.send('POST /test route is working');
  });

  // Start the server
  app.listen({ port: 4000 }, () =>
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
  );
});
