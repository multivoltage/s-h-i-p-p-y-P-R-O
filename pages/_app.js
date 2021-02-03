import '../styles/globals.css'
import 'normalize.css'
import axios from 'axios'
import React from 'react'
import Head from 'next/head';
import CssBaseline from '@material-ui/core/CssBaseline';
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_ENDPOINT
axios.defaults.headers = {
  "accept": "application/json",
  "Authorization": `Bearer ${process.env.NEXT_PUBLIC_TOKEN_API}`
};

const palletType = "light";
const lightTheme = createMuiTheme({
  palette: {
    primary: {
      main: "#ff0096",
    },
    secondary: {
      main: "#46ebc8"
    },
    type: palletType,
  }
});

function MyApp({ Component, pageProps }) {

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <React.Fragment>
      <Head>
        <title>test</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={lightTheme}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </React.Fragment>
  )
}

export default MyApp
