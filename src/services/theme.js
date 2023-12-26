import { useEffect } from "react";
import { setStorageData, getStorageData } from "./storage";
const theme = "theme";
const darkModeClass = "dark-mode";
export const useTheme = () => {
  const storedTheme = getStorageData(theme) === true;
  const applyDarkMode = (darkMode) => {
    if (darkMode) {
      document.body.classList.add(darkModeClass);
    } else {
      document.body.classList.remove(darkModeClass);
    }
    setStorageData(theme, darkMode);
  };

  useEffect(() => {
    applyDarkMode(storedTheme);
  }, []);

  const toggleDarkMode = () => {
    const newTheme = !storedTheme;
    applyDarkMode(newTheme);
  };

  return { toggleDarkMode };
};
