import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext({
  studioTheme: 'dark',
  setStudioTheme: () => {},
  toggleStudioTheme: () => {}
});

export function ThemeProvider({ children }) {
  const [studioTheme, setStudioThemeState] = useState(() => {
    return localStorage.getItem('stackfolio_studio_theme') || 'dark';
  });

  useEffect(() => {
    localStorage.setItem('stackfolio_studio_theme', studioTheme);
    const root = document.documentElement;
    if (studioTheme === 'light') {
      root.classList.add('light-studio');
      root.classList.remove('dark');
    } else {
      root.classList.remove('light-studio');
      root.classList.add('dark');
    }
  }, [studioTheme]);

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

  return (
    <ThemeContext.Provider value={{ studioTheme, setStudioTheme, toggleStudioTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useStudioTheme() {
  return useContext(ThemeContext);
}

export default ThemeContext;
