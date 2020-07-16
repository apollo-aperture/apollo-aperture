import React from 'react';
import { SidebarDiv, StyledButton, StyledLink, StyledHr } from './HierarchySidebar.styled';
import electron from 'electron';
const { dialog } = electron.remote;

const HierarchySidebar = () => {
  const openDialog = e => {
    console.log('pressed');
  };
  return (
    <>
      <div>
        <p>View the hierarchy of your project</p>
        <StyledButton type="button" onClick={e => openDialog(e)}>
          Select index.js file
        </StyledButton>
      </div>
      <StyledHr/>
      <div>
        <p>Open a sample project:</p>
        <StyledLink to="">SpaceX</StyledLink>
        <StyledLink to="">Todo</StyledLink>
      </div>
    </>
  );
};

export default HierarchySidebar;
