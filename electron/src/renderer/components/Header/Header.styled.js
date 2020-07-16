import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const StyledHeaderContainer = styled.div`
  padding: 10px;
  color: #efefef;
  background-color: #59aeca;
  grid-row-start: 1;
  grid-row-end: 2;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid rgb(215,215,215);
`;

export const StyledNav = styled.div`
  display: flex;
  justify-content: space-between;
  height: auto;
`;

export const StyledLink = styled(Link)`
  display: block;
  margin: auto 20px;
`;
