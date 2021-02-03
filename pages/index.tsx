import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { Header } from '../src/components/Header'
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { useState } from 'react';


export default function Home() {
  const [darkState,] = useState(false);
  const palletType = darkState ? "dark" : "light";
  const darkTheme = createMuiTheme({
    palette: {
      type: palletType,
    }
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <div className={styles.container}>
        <Head>
          <title>shippypro test</title>
          <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
          <link rel="manifest" href="/site.webmanifest" />
          <meta name="msapplication-TileColor" content="#da532c" />
          <meta name="theme-color" content="#ffffff"></meta>
        </Head>

        <Header />
        <main>

        </main>
        <footer></footer>
      </div>
    </ThemeProvider>
  )
}
