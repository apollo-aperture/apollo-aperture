import React from 'react';
import {Link} from 'react-router-dom';

const HierarchySidebar = () => (
  <>
    <div className="flex-inner">
      Open directory to generate component hierarchy
      <button>Select folder</button>
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