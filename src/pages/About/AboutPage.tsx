import styles from './AboutPage.module.scss';
import { Link } from 'react-router-dom';

export const AboutPage = () => {
  return (
    <main className={styles.mainContainer}>
      <h1>About</h1>

      <div>
        <img
          src="https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/079.png"
          alt="Author's portrait"
          className={styles.img}
        />
        <div className={styles.phrase}>I WILL DELIVER PROJECTS ON TIME</div>
        <div className={styles.phrase}>I WILL DELIVER PROJECTS ON TIME</div>
        <div className={styles.phrase}>I WILL DELIVER PROJECTS ON TIME</div>
        <div className={styles.phrase}>I WILL DELIVER PROJECTS ON TIME</div>
        <div className={styles.phrase}>I WILL DELIVER PROJECTS ON TIME</div>
        <div className={styles.phrase}>I WILL DELIVER PROJECTS ON TIME</div>
        <div className={styles.phrase}>I WILL DELIVER PROJECTS ON TIME</div>
        <div className={styles.phrase}>I WILL DELIVER PROJECTS ON TIME</div>
        <div className={styles.phrase}>I WILL DELIVER PROJECTS ON TIME</div>
        <div className={styles.phrase}>I WILL DELIVER PROJECTS ON TIME</div>
      </div>

      <p>
        This project was built for the{' '}
        <Link to="https://rs.school/courses/reactjs" target="_blank">
          RSSchool React Course
        </Link>
      </p>

      <Link to="/">Go to Home Page</Link>
    </main>
  );
};
