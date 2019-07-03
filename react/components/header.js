import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

const Header = () => {
  return (
    <header className="container-fluid blue-bg">
      <div className="container">
        <h1>Apollo Aperture</h1>
        <nav className="menu">
          <Link to="/">Component Hierarchy</Link>
          <Link to="/mutation">Mutations and Queries</Link>
        </nav>
        <div>
          <a href="https://github.com/apollo-aperture/apollo-aperture" target="_blank"><FontAwesomeIcon icon={faGithub}/> Star us on Github</a>
        </div>
      </div>
    </header>
  );
};

export default Header;