import React from 'react';
import { Route } from 'react-router-dom';
import HierarchySidebar from './hierarchySidebar';
import MutationSidebar from './mutationSidebar';


const SidebarContainer = () => {
  return (
    <section className="sidebar-container">
      <Route exact path="/" component={ HierarchySidebar }/>
      <Route exact path="/mutation" component={ MutationSidebar }/>
    </section>
  )
};

export default SidebarContainer;