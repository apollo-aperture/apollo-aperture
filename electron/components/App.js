import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './header';
import SidebarContainer from './sidebarContainer';
import MainContainer from './mainContainer';
import Footer from './footer';

const App = () => (
  <Router>
    <div>
      <Header />
      <div className="content-container">
        <SidebarContainer />
        <MainContainer />
      </div>
    </div>
  </Router>
);

export default App;