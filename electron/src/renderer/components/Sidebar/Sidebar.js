import React from 'react';
import { Route } from 'react-router-dom';
import StyledSidebar from './Sidebar.styled';
import HierarchySidebar from './HieararchySidebar';
import MutationSidebar from './MutationSidebar';

const Sidebar = () =>
  <StyledSidebar>
    <Route exact path="/" component={ HierarchySidebar } />
    <Route exact path="/mutation" component={ MutationSidebar} />
  </StyledSidebar>;
  
export default Sidebar;