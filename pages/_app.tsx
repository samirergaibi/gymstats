import type { AppProps } from "next/app";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import Layout from "../components/Layout";

const cssVariables = `
  :root {
    --box-shadow-main: 0 15px 35px 0 rgba(60, 66, 87, 0.08),
    0 5px 15px 0 rgba(0, 0, 0, 0.12);
    --purple-gradient: linear-gradient(#9877ff, #71b2f7);
    --orange-gradient: linear-gradient(to right, #f76863, #f78c63);
  }
`;

const GlobalStyle = createGlobalStyle`
  ${cssVariables}
  * {
    box-sizing: border-box;
    margin: 0;
    font-family: 'Spartan', sans-serif;
  }
  
  html, body, #__next {
    height: 100%;
  }

  body {
    line-height: 1.5;
  }

  input, button, textarea, select {
    font: inherit;
  }

  p, h1, h2, h3, h4, h5, h6 {
    overflow-wrap: break-word;
  }
`;

const theme = {
  colors: {
    primary: "#0070f3",
  },
};

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </>
  );
}
