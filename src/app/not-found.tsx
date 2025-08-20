import Link from 'next/link';
import styles from './not-found.module.scss';

export default function NotFoundPage() {
  return (
    <main className={styles.mainContainer}>
      <img
        src="https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/054.png"
        alt="Page not found"
        className={styles.img}
      />

      <h1>Oops!</h1>
      <p>Page not found.</p>

      <Link href="/">Go to Home Page</Link>
    </main>
  );
}
