import React from 'react';
import { Route, Switch } from 'react-router-dom';
import App from './containers/App';
import FormPage from './containers/FormPage';
import TablePage from './containers/TablePage';
import DashboardPage from './containers/DashboardPage';

// All Routes Listed Below
export default (
  <Switch>
    <Route exact path="/" component={App}>
      <Route exact path="/" component={DashboardPage}/>
      <Route exact path="/dashboard" component={DashboardPage}/>
      <Route exact path="/form" component={FormPage}/>
      <Route exact path="/table" component={TablePage}/> 
    </Route>
  </Switch>
);
