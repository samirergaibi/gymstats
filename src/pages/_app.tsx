import type { AppProps } from 'next/app';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import Layout from '@components/Layout';
import { UserContextProvider } from '@contexts/UserContext';

const cssVariables = `
  :root {
    --primary: #087E8B;
    --secondary: #4EA685;
    --blue: #2B70C1;
    --peach: #F76863;
    --dark: #323232;

    --error: #F76863;

    --gradient-primary: linear-gradient(var(--secondary), var(--primary));
    --gradient-orange: linear-gradient(to right, var(--peach), #f78c63);

    --medium-bold: 600;

    --border-medium: 8px;

    --box-shadow-primary: 0 15px 35px 0 rgba(60, 66, 87, 0.08),
    0 5px 15px 0 rgba(0, 0, 0, 0.12);
    --box-shadow-strong: 0 4px 4px 0 rgba(0, 0, 0, 0.4);
  }
`;

const GlobalStyle = createGlobalStyle`
  ${cssVariables}
  * {
    box-sizing: border-box;
    margin: 0;
    font-family: 'Spartan', sans-serif;
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
    primary: '#0070f3',
  },
};

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <UserContextProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </UserContextProvider>
      </ThemeProvider>
    </>
  );
}
