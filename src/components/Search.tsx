import { useTranslations } from 'next-intl';
import styles from '../app/[locale]/page.module.scss';
import { useState, type FormEvent } from 'react';

interface SearchProps {
  initialValue: string;
  onSearch: (searchStr: string) => void;
}

export const Search = ({ initialValue, onSearch }: SearchProps) => {
  const [inputValue, setInputValue] = useState(initialValue);
  const t = useTranslations('main');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSearch(inputValue);
  };

  return (
    <div className={styles.searchWrapper}>
      <form className={styles.searchForm} onSubmit={handleSubmit}>
        <input
          className={styles.searchInput}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder={t('placeholder')}
        />
        <button type="submit">{t('searchButton')}</button>
      </form>
    </div>
  );
};
