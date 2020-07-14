import React, { useState, useEffect } from 'react';
import { render } from 'react-dom';
import { ipcRenderer } from 'electron';
import electron from 'electron';

const App = () => {
  const [message, updateMessage] = useState('foo');
  useEffect(() => {
    ipcRenderer.on('async-reply', (event, arg) => {
      console.log('react reply', arg);
      updateMessage('updated');
    })
  });
  const clickHandler = (e) => {
    e.preventDefault();
    electron.remote.dialog.showOpenDialog({
      properties: ['openFile'],
      filters: [{ name: 'JavaScript Files', extensions: ['js'] }],
    })
      .then(result => {
        ipcRenderer.send('async-message', result.filePaths[0]);
      })
    // console.log('sent message', ipcRenderer.send('async-message', ));
  };
  return (
    <div>
      <h1>Hello World</h1>
      <div>{message}</div>
      <button type="button" onClick={(e) => clickHandler(e)}>
        Click me!
      </button>
    </div>
  );
};

render(
  <div>
    <App />
  </div>,
  document.getElementById('app'),
);
