import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './containers/App';
import { ApolloClient } from 'apollo-client';
import { withClientState } from 'apollo-link-state';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from 'react-apollo';
import { resolvers, defaults } from './resolvers';
import routes from './routes';
import './App.css';
import 'flexboxgrid/css/flexboxgrid.css';

// cache, Schema, and Apollo Store
const cache = new InMemoryCache();

export const typeDefs = `
  type User {
    id: Int!
    text: String!
    name: String
    userName: String
    department: String
    access: String
    completed: Boolean!
  }

  type Mutation {
    addUser(
      text: String!,
      name: String,
      userName: String,
      department: String,
      access: String,
      ): User
    updateUser(
      id:ID!
      text: String!,
      name: String,
      userName: String,
      department: String,
      access: String,
      ): User
    toggleUser(id: Int!): User
    deleteUser(id:Int!):User
  }

  type Query {
    visibilityFilter: String
    Users: [User]
  }
`;

export const client = new ApolloClient({
  cache,
  link: withClientState({ resolvers, defaults, cache, typeDefs}),
});

render(
  <ApolloProvider client={client}>
    <Router routes={routes}>
    <App />
    </Router>
  </ApolloProvider>,
  document.getElementById('app'),
);

export default client;
