import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

const Header = () => {
  return (
    <div className="container-fluid">
      <div className="container">
        <h1>Apollo Aperture</h1>
        <div className="menu">

            <Link to="/">Component Hierarchy</Link>

            <Link to="/invoke">Mutations and Queries</Link>

        </div>
        <div>
          <Link to="/"><FontAwesomeIcon icon={ faGithub }/> Star us on Github</Link>
        </div>
      </div>
    </div>
  );
};

export default Header;