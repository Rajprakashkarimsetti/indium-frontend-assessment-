// src/apollo/client.js
import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql', // Ensure this URL matches your backend's GraphQL endpoint
  cache: new InMemoryCache(),
});

export default client;
