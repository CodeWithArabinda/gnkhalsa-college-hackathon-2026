import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext({
  studioTheme: 'dark',
  isLight: false,
  setStudioTheme: () => {},
  toggleStudioTheme: () => {}
});

export function ThemeProvider({ children }) {
  const [studioTheme, setStudioThemeState] = useState(() => {
    return localStorage.getItem('stackfolio_studio_theme') || 'dark';
  });

  const setStudioTheme = (theme) => {
    setStudioThemeState(theme);
  };

  const toggleStudioTheme = (overrideTheme) => {
    if (overrideTheme) {
      setStudioThemeState(overrideTheme);
    } else {
      setStudioThemeState((prev) => (prev === 'dark' ? 'light' : 'dark'));
    }
  };

  useEffect(() => {
    const root = document.documentElement;
    if (studioTheme === 'light') {
      root.classList.remove('dark');
      root.classList.add('light');
    } else {
      root.classList.remove('light');
      root.classList.add('dark');
    }
    localStorage.setItem('stackfolio_studio_theme', studioTheme);
  }, [studioTheme]);

  return (
    <ThemeContext.Provider value={{ studioTheme, isLight: studioTheme === 'light', setStudioTheme, toggleStudioTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useStudioTheme = () => useContext(ThemeContext);

export default ThemeContext;
