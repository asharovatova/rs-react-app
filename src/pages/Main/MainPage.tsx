import styles from './MainPage.module.scss';
import { Main } from '../../components/Main/Main';
import { Flyout } from '../../components/Flyout';

export const MainPage = () => (
  <div data-testid="main-page-container" className={styles.mainPageContainer}>
    <Main />
    <Flyout />
  </div>
);
