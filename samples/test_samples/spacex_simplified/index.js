import React from 'react';
import ReactDOM from 'react-dom';
import App from './src/components/App';
import { ApolloProvider } from 'react-apollo';
import ApolloClient from 'apollo-boost';
import { gql } from 'apollo-boost';

const client = new ApolloClient({
  uri: 'https://api.spacex.land/graphql/'
});

const Wrapper = () => (
  <ApolloProvider client={client}>
    <div>
      <App />
    </div>
  </ApolloProvider>
);

ReactDOM.render(<Wrapper />, document.getElementById('root'));