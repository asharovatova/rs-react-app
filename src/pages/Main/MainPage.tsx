import { Main } from '../../components/Main/Main';
import styles from './MainPage.module.scss';

export const MainPage = () => (
  <div data-testid="main-page-container" className={styles.mainPageContainer}>
    <Main />
  </div>
);
