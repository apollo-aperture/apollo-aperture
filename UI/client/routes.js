import React from 'react';
import { Route } from 'react-router-dom';
import App from './containers/App';
import FormPage from './containers/FormPage';
// import TablePage from './containers/TablePage';
import DashboardPage from './containers/DashboardPage';

// All Routes Listed Below
export default (
  <Route>
    <Route path="/" component={App}>
      <Route exact path="/" component={DashboardPage}/>
      <Route path="/dashboard" component={DashboardPage}/>
      <Route path="/form" component={FormPage}/>
      <Route path="/table" component={FormPage}/> 
    </Route>
  </Route>
);
