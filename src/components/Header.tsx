'use client';

import styles from '../app/[locale]/page.module.scss';
import { ThemeToggle } from './ThemeToggle';
import { RefreshButton } from './RefreshButton';
import { LanguageSelect } from './LanguageSelect';
import { Link } from '../i18n/navigation';
import { useTranslations } from 'next-intl';

export const Header = () => {
  const t = useTranslations('header');

  return (
    <header className={styles.top}>
      <h1>Pokedex</h1>

      <div className={styles.flexRow}>
        <Link href="/about">{t('about')}</Link>
        <LanguageSelect />
        <ThemeToggle />
        <RefreshButton />
      </div>
    </header>
  );
};
