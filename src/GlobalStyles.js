import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
* {
    box-sizing: border-box;
    
}

body {
    background: whitesmoke;
    font-family: sans-serif;
}

a {
    text-decoration:none;
color: black;
}

.active {
    background: hotpink;
    color: white
  }
`;
