import styles from '../styles/Home.module.css'
import { Header } from '../src/components/Header'
import { FlyChoser } from '../src/components/FlyChoser';
import { GetStaticProps } from 'next';
import { fetchAllAirlines, fetchAllAirports } from '../src/useApi';
import { I_Airline, I_Airport } from '../src/types';
import { GlobalSnackbar } from '../src/components/GlobalSnackbar';

interface I_Home {
  airports: I_Airport[]
  airlines: I_Airline[]
  handleToggleTheme: () => void
  theme: "dark" | "light"
}
export default function Home(props: I_Home) {
  return (
    <div className={styles.container}>
      <Header handleToggleTheme={props.handleToggleTheme} theme={props.theme} />
      <main>
        <FlyChoser airports={props.airports} airlines={props.airlines} />
      </main>
      <footer></footer>
      <GlobalSnackbar />
    </div>
  )
}

/**
 * We use this list inside form and probably this data will not change every day.
 * If yes, this part should be converted in server logic or only client
 */
export const getStaticProps: GetStaticProps = async () => {
  const { data: dataAirports } = await fetchAllAirports()
  const { data: dataAirlines } = await fetchAllAirlines()


  return {
    props: {
      airports: dataAirports.data,
      airlines: dataAirlines.data
    },
  }
}
