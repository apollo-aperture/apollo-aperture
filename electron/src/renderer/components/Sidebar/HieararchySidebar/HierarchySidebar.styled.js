import styled from 'styled-components';
import {Link} from 'react-router-dom';

export const SidebarDiv = styled.div`
  padding: 20px;
  background-color: #f2f7fc;
  border-right: 1px solid #e3e8ee;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
`;

export const StyledButton = styled.button`
  margin-top: 10px;
  padding: 10px;
  font-size: 14px;
  background-color: #e9e9e9;
  border: 1px solid #d7d7d7;
  border-radius: 3px;
  cursor: pointer;
  outline: none;
  transition: background-color .2s;
  :hover {
    transition: background-color .2s;
    background-color: #dedede;
  }
`;

export const StyledLink = styled(Link)`
  margin-top: 10px;
  display: block;
  color: #cb864e;
  text-decoration: underline;
  transition: color .2s;
  :hover {
    color: #996438;
    transition: color .2s;
    text-decoration: underline;
  }
`;

export const StyledHr = styled.hr`
  border: .5px solid rgba(89,174,202,0.14);
  width: 100%;
`;