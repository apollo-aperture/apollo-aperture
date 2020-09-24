import { createGlobalStyle } from 'styled-components';
import { normalize } from 'styled-normalize';

const GlobalStyle = createGlobalStyle`
  // @import url('https://fonts.googleapis.com/css2?family=Source+Sans+Pro&display=swap');
  // ${ normalize }
  *, *::before, *::after {
    box-sizing: border-box;
  }
  html, body {
    font-family: 'Source Sans Pro', 'Arial', sans-serif;
    line-height: 1.3;
    color: rgb(72,72,72);
    width: 100vw;
    height: 100vh;
    padding: 0;
    margin: 0;
  }
  ul, ol, dd {
    margin: 0;
    padding: 0;
    list-style: none;
  }
  h1,h2,h3,h4,h5,h6 {
    margin: 0;
    font-size: inherit;
    font-weight: inherit;
  }
  p {
    margin: 0;
  }
  a:visited, a {
    color: #efefef;
    text-decoration: none;
    transition: color .2s;
  }
  a:hover {
    color: #fdd5b4;
    text-decoration: none;
    transition: color .2s;
  }
`;

export default GlobalStyle;
