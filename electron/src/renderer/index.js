import React from 'react';
import { render } from 'react-dom';
import App from './components/App';
import GlobalStyle from './globalStyle';

render(
  <>
  <GlobalStyle/>
    <App />
  </>,
  document.getElementById('app'),
);
