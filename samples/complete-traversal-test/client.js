import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import gql from 'graphql-tag';

// const typeDefs = gql``;

// const resolvers = {};

const cache = new InMemoryCache();

const link = new HttpLink({ uri: 'http://localhost:4000/graphql' });

const client = new ApolloClient({
  link,
  cache,
  // resolvers,
  // typeDefs,
});

export default client;
/**/