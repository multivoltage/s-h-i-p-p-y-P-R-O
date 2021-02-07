import '../styles/globals.css'
import 'normalize.css'
import axios from 'axios'
import React, { useState } from 'react'
import Head from 'next/head';
import CssBaseline from '@material-ui/core/CssBaseline';
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { QueryClient, QueryClientProvider } from "react-query";
import { Provider } from "react-redux";
import { store } from '../src/store'

axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_ENDPOINT
axios.defaults.headers = {
  "accept": "application/json",
  "Authorization": `Bearer ${process.env.NEXT_PUBLIC_TOKEN_API}`
};
const queryClient = new QueryClient()

const darkTheme = createMuiTheme({
  palette: {
    primary: {
      main: "#ff0096",
    },
    secondary: {
      main: "#46ebc8"
    },
    type: "dark",
  }
});
const lightTheme = createMuiTheme({
  palette: {
    primary: {
      main: "#ff0096",
    },
    secondary: {
      main: "#46ebc8"
    },
    type: "light",
  }
});

function MyApp({ Component, pageProps }) {

  const [theme, setTheme] = useState("light")
  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  function handleToggleTheme() {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  return (
    <React.Fragment>
      <Head>
        <title>ShippyPro</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <ThemeProvider theme={theme === "dark" ? darkTheme : lightTheme}>
            <CssBaseline />
            <Component {...pageProps} theme={theme} handleToggleTheme={handleToggleTheme} />
          </ThemeProvider>
        </Provider>
      </QueryClientProvider>
    </React.Fragment>
  )
}

export default MyApp
