'use client';

import { useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';
import { ChangeEvent } from 'react';

export const LanguageSelect = () => {
  const router = useRouter();
  const currentLocale = useLocale();

  const handleLanguageChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const newLocale = e.target.value;

    router.push(`/${newLocale}`);
  };

  return (
    <select name="locale" value={currentLocale} onChange={handleLanguageChange}>
      <option value="en">EN</option>
      <option value="ru">RU</option>
    </select>
  );
};
