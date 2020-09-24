import React, { useEffect, useState } from 'react';
import { ipcRenderer } from 'electron';
import {
  SidebarDiv,
  StyledButton,
  StyledLink,
  StyledHr,
} from './HierarchySidebar.styled';
import electron from 'electron';

const { dialog } = electron.remote;

const HierarchySidebar = () => {
  const [message, updateMessage] = useState('foo');
  useEffect(() => {
    ipcRenderer.on('hierarchy-result', (event, arg) => {
      console.log('react reply', arg);
      updateMessage('updated');
    });
  });
  const openDialog = e => {
    e.preventDefault();
    electron.remote.dialog
      .showOpenDialog({
        properties: ['openFile'],
        filters: [{ name: 'JavaScript Files', extensions: ['js'] }],
      })
      .then(result => {
        if (!result.canceled) {
          ipcRenderer.send('transmit-react-index', result.filePaths[0]);
        }
      })
      .catch(err => {
        console.log('Error:', err);
      });
    // console.log('sent message', ipcRenderer.send('async-message', ));
  };
  return (
    <>
      <div>
        <p>View the hierarchy of your project</p>
        <StyledButton type="button" onClick={e => openDialog(e)}>
          Select index.js file
        </StyledButton>
      </div>
      <StyledHr />
      <div>
        <p>Open a sample project:</p>
        <StyledLink to="">SpaceX</StyledLink>
        <StyledLink to="">Todo</StyledLink>
      </div>
    </>
  );
};

export default HierarchySidebar;
