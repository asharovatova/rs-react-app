// import { useGetAllPokemonsQuery } from '../api/pokemonApi';
import Link from 'next/link';
import styles from '../app/page.module.scss';
import { ThemeToggle } from './ThemeToggle';

export const Header = () => {
  // const { refetch } = useGetAllPokemonsQuery();

  return (
    <header className={styles.top}>
      <h1>Pokedex</h1>

      <div className={styles.flexRow}>
        <Link href="about">About</Link>
        <ThemeToggle />
        {/* <button onClick={() => refetch()} className={styles.refreshButton}>
          ↻ Refresh
        </button> */}
      </div>
    </header>
  );
};
