import React from 'react';
import {Route} from 'react-router-dom';
import HierarchyContent from './hierarchyContent';
import MutationContent from './mutationContent';

const MainContainer = () => (
  <section className="main-container">
    <Route exact path="/" component={HierarchyContent} />
    <Route exact path="/mutation" component={MutationContent} />
  </section>
);

export default MainContainer;