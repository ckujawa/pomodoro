import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    @import url('https://fonts.googleapis.com/css?family=Righteous&display=swap');
    :root {
        --main: #024059;
        --light: #C5CBD8;
        --dark: #023859;
        --secondary-dark: #015059;
        --secondary-light: #028C7E;
    }

    body{
        width: 100vw;
        height: 100vh;
        padding: .2rem;
        margin: 0;
        background-color: var(--main);
    }
`;

export default GlobalStyle;
