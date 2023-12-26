// theme.js

import { useEffect } from "react";
import { setLocalStorageData, getLocalStorageData } from "./storage";
const theme = "theme";
const darkModeClass= "dark-mode";
export const useDarkMode = () => {
  const storedTheme = getLocalStorageData(theme) === true;
  const applyDarkMode = (darkMode) => {
    if (darkMode) {
      document.body.classList.add(darkModeClass);
    } else {
      document.body.classList.remove(darkModeClass);
    }
    setLocalStorageData(theme, darkMode);
  };

  useEffect(() => {
    applyDarkMode(storedTheme);
  }, []); 

  const toggleDarkMode = () => {
    const newDarkMode = !storedTheme;
    applyDarkMode(newDarkMode);
  };

  return { toggleDarkMode };
};
