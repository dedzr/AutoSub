// src/styles/GlobalStyle.js
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Roboto', sans-serif;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    background-color: #f5f7fa;
    color: #333;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  h1, h2 {
    font-family: 'Roboto', sans-serif;
    font-weight: 600;
  }

  p {
    font-size: 16px;
    line-height: 1.5;
  }
`;

export default GlobalStyle;
