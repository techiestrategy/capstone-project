// context/ThemeContext.js
import AsyncStorage from '@react-native-async-storage/async-storage'; // To persist theme choice
import { createContext, useContext, useEffect, useState } from 'react';
import { useColorScheme } from 'react-native'; // To detect system theme preference

import { darkTheme, lightTheme } from '@/constants/ThemeColors';

// You'll need to install AsyncStorage if you haven't already:
// expo install @react-native-async-storage/async-storage

const ThemeContext = createContext();

const THEME_KEY = 'userThemePreference';

export const ThemeProvider = ({ children }) => {
  const systemColorScheme = useColorScheme(); // 'light', 'dark', or null
  const [theme, setTheme] = useState(lightTheme); // Default to lightTheme initially
  const [isThemeLoaded, setIsThemeLoaded] = useState(false);

  useEffect(() => {
    const loadThemePreference = async () => {
      try {
        const storedTheme = await AsyncStorage.getItem(THEME_KEY);
        if (storedTheme) {
          setTheme(storedTheme === 'dark' ? darkTheme : lightTheme);
        } else {
          // If no preference stored, use system preference
          setTheme(systemColorScheme === 'dark' ? darkTheme : lightTheme);
        }
      } catch (error) {
        console.error('Failed to load theme preference:', error);
        // Fallback to system theme if loading fails
        setTheme(systemColorScheme === 'dark' ? darkTheme : lightTheme);
      } finally {
        setIsThemeLoaded(true);
      }
    };

    loadThemePreference();
  }, [systemColorScheme]); // Rerun if system scheme changes

  const toggleTheme = async () => {
    const newThemeMode = theme === lightTheme ? 'dark' : 'light';
    try {
      await AsyncStorage.setItem(THEME_KEY, newThemeMode);
      setTheme(newThemeMode === 'dark' ? darkTheme : lightTheme);
    } catch (error) {
      console.error('Failed to save theme preference:', error);
    }
  };

  // Provide a flag indicating whether the theme has been loaded from storage/system
  if (!isThemeLoaded) {
    return null; // Or a loading spinner if you prefer
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);