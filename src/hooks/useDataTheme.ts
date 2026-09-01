import { useEffect } from 'react';

export const useDataTheme = (themeMode: 'light' | 'dark'): void => {
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', themeMode);
  }, [themeMode]);
};
