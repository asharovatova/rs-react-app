'use client';

// import styles from '../../app/page.module.scss';
import { Main } from './Main/Main';
import { Flyout } from './Flyout';

export const MainPage = () => (
  <div>
    {/* <div data-testid="main-page-container" className={styles.mainPageContainer}> */}
    <Main />
    <Flyout />
  </div>
);
