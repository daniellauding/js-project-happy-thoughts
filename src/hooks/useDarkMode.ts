import { useEffect, useState, useRef } from 'react';

export const useDarkMode = () => {
  // Check if user has manually set a preference
  const hasUserPreference = useRef<boolean>(localStorage.getItem('darkMode') !== null);
  
  const [isDark, setIsDark] = useState<boolean>(() => {
    // Check localStorage first
    const stored = localStorage.getItem('darkMode');
    if (stored !== null) {
      return stored === 'true';
    }
    // If no stored preference, detect OS preference
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    // Apply dark mode class to document
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    // Only save to localStorage if user has manually set preference
    if (hasUserPreference.current) {
      localStorage.setItem('darkMode', String(isDark));
    }
  }, [isDark]);

  useEffect(() => {
    // Listen for OS preference changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      // Only update if user hasn't manually set a preference
      if (!hasUserPreference.current) {
        setIsDark(e.matches);
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const toggleDarkMode = () => {
    hasUserPreference.current = true; // Mark that user has manually set preference
    setIsDark((prev) => !prev);
  };

  return { isDark, toggleDarkMode };
};

