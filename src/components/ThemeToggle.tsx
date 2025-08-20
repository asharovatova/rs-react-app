'use client';

import { useTranslations } from 'next-intl';
import { useTheme } from '../context/useTheme';

export const ThemeToggle = () => {
  const t = useTranslations('header');
  const { theme, toggleTheme } = useTheme();

  return (
    <button onClick={toggleTheme}>
      {theme === 'light' ? t('dark') : t('light')}
    </button>
  );
};
