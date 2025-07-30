import { useEffect, useState } from 'react';

export const useLocalStorage = (key: string, initialValue: string) => {
  const [searchStr, setSearchStr] = useState(() => {
    const storedValue = localStorage.getItem(key);

    if (storedValue) {
      return storedValue;
    }

    return initialValue;
  });

  useEffect(() => {
    if (!searchStr) {
      localStorage.removeItem(key);
    } else {
      localStorage.setItem(key, searchStr);
    }
  }, [key, searchStr]);

  return { searchStr, setSearchStr };
};
