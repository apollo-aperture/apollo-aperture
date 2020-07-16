import React from 'react';
// import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import {
  StyledHeaderContainer,
  StyledNav,
  StyledLink,
} from './Header.styled';

const Header = () => {
  return (
    <StyledHeaderContainer>
      <h1>Apollo Aperture</h1>
      <StyledNav>
        <StyledLink to="/">Component Hierarchy</StyledLink>
        <StyledLink to="/mutation">Mutations and Queries</StyledLink>
      </StyledNav>
      <div>
        <a
          href="https://github.com/apollo-aperture/apollo-aperture"
          target="_blank"
        >
          <FontAwesomeIcon icon={faGithub} /> Star us on Github
        </a>
      </div>
    </StyledHeaderContainer>
  );
};

export default Header;
