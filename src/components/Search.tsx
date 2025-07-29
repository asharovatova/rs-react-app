import styles from '../pages/Main/MainPage.module.scss';
import { useState, type FormEvent } from 'react';

interface SearchProps {
  initialValue: string;
  onSearch: (searchStr: string) => void;
}

export const Search = ({ initialValue, onSearch }: SearchProps) => {
  const [inputValue, setInputValue] = useState(initialValue);

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
          placeholder="Search Pokemon..."
        />
        <button type="submit">Search</button>
      </form>
    </div>
  );
};
