
import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  // Always use light theme
  const [theme] = useState<Theme>('light');

  useEffect(() => {
    const root = window.document.documentElement;
    // Always remove dark class to ensure light theme
    root.classList.remove('dark');
    localStorage.setItem('theme', 'light');
  }, []);

  // Disabled toggle function - does nothing
  const toggleTheme = () => {
    // No-op function, does nothing
    return;
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
