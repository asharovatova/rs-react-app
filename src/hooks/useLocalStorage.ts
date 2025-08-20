'use client';

import { useEffect, useState } from 'react';

export const useLocalStorage = (key: string, initialValue: string) => {
  const [searchStr, setSearchStr] = useState(initialValue);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const storedValue = localStorage.getItem(key);
    if (storedValue) {
      setSearchStr(storedValue);
    }
    setIsLoaded(true);
  }, [key]);

  useEffect(() => {
    if (isLoaded) {
      if (!searchStr) {
        localStorage.removeItem(key);
      } else {
        localStorage.setItem(key, searchStr);
      }
    }
  }, [key, searchStr, isLoaded]);

  return { searchStr, setSearchStr };
};
