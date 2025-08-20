import Link from 'next/link';
import styles from './not-found.module.scss';
import Image from 'next/image';

export default function NotFoundPage() {
  return (
    <main className={styles.mainContainer}>
      <Image
        src="https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/054.png"
        alt="Page not found"
        className={styles.img}
        width={300}
        height={300}
      />

      <h2>Oops!</h2>
      <p>Page not found.</p>

      <Link href="/">Go to Home Page</Link>
    </main>
  );
}
