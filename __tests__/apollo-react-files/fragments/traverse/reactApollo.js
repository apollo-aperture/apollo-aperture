import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import ReactApolloImport from './reactApolloImport';
import { ApolloProvider } from '@apollo/react-hooks';
import client from './client';
import * as serviceWorker from './serviceWorker';

/*
* ReactApolloExport =
* {
*   reactComponent: 'Component',
*   children: []
* }
*
* */

/*
* {
*   reactComponent: 'React',
*   children: [
*     {
*       reactComponent: 'Apollo Provider',
*       children: [
*         {
*           reactComponent: 'ReactApolloExport',
*           children: []
*         }
*       ]
*     }
*   ]
* }
* */

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <ReactApolloImport />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
