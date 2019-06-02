import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

// Apollo functionality begins here

import { ApolloProvider } from "react-apollo";
import ApolloClient from "apollo-boost";
import { gql } from "apollo-boost";

const client = new ApolloClient({
  uri: "https://48p1r2roz4.sse.codesandbox.io"
});

client
  .query({
    query: gql`
      {
        rates(currency: "USD") {
          currency
        }
      }
    `
  })
  .then(result => console.log(result));


const Wrapper = () => (
  <ApolloProvider client={client}>
    <div>
      <App />
    </div>
  </ApolloProvider>
);


ReactDOM.render(<Wrapper />, document.getElementById('root'));