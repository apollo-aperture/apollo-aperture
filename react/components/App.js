import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Header from './header';
import Hierarchy from './hierarchy';

const App = () => (
  <div className="container">
    <Router>
      <div>
        <Header/>
        <Switch>
          <Route exact path="/" component={Hierarchy} />
        </Switch>
      </div>
    </Router>
  </div>
);

export default App;