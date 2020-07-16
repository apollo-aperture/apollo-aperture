import React from 'react';
import StyledContentDiv from './Content.styled';
import Sidebar from '../Sidebar';
import Visualization from '../Visualization';

const Content = () =>
  <StyledContentDiv>
    <Sidebar />
    <Visualization />
  </StyledContentDiv>;

export default Content;