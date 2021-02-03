import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { Header } from '../src/components/Header'
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { useState } from 'react';
import { FlyChoser } from '../src/components/Form/FlyChoser';
import { GetStaticProps } from 'next';
import { fetchAllAirports } from '../src/useApi';
import { I_Airport } from '../src/types';

interface I_Home {
  airports: I_Airport[]
}
export default function Home(props: I_Home) {
  return (

    <div className={styles.container}>
      <Header />
      <main>
        <FlyChoser airports={props.airports} />
      </main>
      <footer></footer>
    </div>

  )
}

/**
 * We use this list inside form and probably this data will not change every day.
 * If yes, this part should be converted in server logic or only client
 */
export const getStaticProps: GetStaticProps = async () => {
  const { data } = await fetchAllAirports()

  return {
    props: {
      airports: data.data,
    },
  }
}
