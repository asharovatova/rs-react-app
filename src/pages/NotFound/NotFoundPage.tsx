import styles from './NotFoundPage.module.scss';
import { Link } from 'react-router-dom';

export const NotFoundPage = () => {
  return (
    <main className={styles.mainContainer}>
      <h1>Oops!</h1>
      <p>Page not found.</p>

      <Link to="/">Go to Home Page</Link>
    </main>
  );
};
