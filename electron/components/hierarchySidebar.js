import React from 'react';
import {Link} from 'react-router-dom';

const openDialog = () => {
  window.electron.dialog.showOpenDialog({
    properties: ['openFile'],
    filters: [
      { name: 'JavaScript Files', extensions: ['js']}
    ]
  }).then(result => {
    console.log('result: ', result);
  });
}

const HierarchySidebar = () => (
  <>
    <div className="flex-inner">
      Open directory to generate component hierarchy
      <button type="button" onClick={openDialog}>Select index.js</button>
    </div>
    <div className="flex-inner">
      <hr />
      <p>
        Select a sample application
      </p>
      <ul>
        <li><Link to="/">Todo App</Link></li>
        <li>SpaceX App</li>
      </ul>
    </div>
  </>
);

export default HierarchySidebar;