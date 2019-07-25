import React from 'react';
import { Route } from 'react-router-dom';
import HierarchyContent from './hierarchyContent';
import MutationContent from './mutationContent';
import QueryTree from '../d3';

const MainContainer = () => (
  <section className="main-container" width="100%">
    <Route exact path="/" component={HierarchyContent} />
    <Route exact path="/mutation" component={MutationContent} />
    <QueryTree />
  </section>
);

export default MainContainer;