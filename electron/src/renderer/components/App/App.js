import React from 'react';
import { HashRouter as Router } from 'react-router-dom';
import Header from '../Header';
import Content from '../Content';
import StyledApp from './App.styled';

const App = () =>
  <StyledApp>
    <Router>
      <Header />
      <Content />
    </Router>
  </StyledApp>;

export default App;