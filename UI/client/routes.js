import React from 'react';
import { Route } from 'react-router-dom';
import App from './containers/App';
// import FormPage from './containers/FormPage';
// import TablePage from './containers/TablePage';
// import Dashboard from './containers/DashboardPage';


// All Routes Listed Below
export default (
  <Route>
    <Route path="/" component={App}>
      {/* <Route exact path="/" component={Dashboard}/>
      <Route path="dashboard" component={Dashboard}/>
      <Route path="form" component={FormPage}/>
      <Route path="table" component={TablePage}/> */}
    </Route>
  </Route>
);
