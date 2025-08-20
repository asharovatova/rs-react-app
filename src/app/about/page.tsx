import Link from 'next/link';
import styles from './page.module.scss';

export default function AboutPage() {
  return (
    <main className={styles.mainContainer}>
      <h1>About</h1>

      <div>
        <img
          src="https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/079.png"
          alt="Author's portrait"
          className={styles.img}
        />

        {Array.from({ length: 10 }).map((_, index) => (
          <div key={index} className={styles.phrase}>
            I WILL DELIVER PROJECTS ON TIME
          </div>
        ))}
      </div>

      <p>
        This project was built for the{' '}
        <Link href="https://rs.school/courses/reactjs" target="_blank">
          RSSchool React Course
        </Link>
      </p>

      <Link href="/">Go to Home Page</Link>
    </main>
  );
}
