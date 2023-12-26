const setStorageData = (key, data) => {
  const errorMessage = "Error setting data in localStorage for key";
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error(` ${errorMessage} "${key}":`, error);
  }
};
const getStorageData = (key) => {
  const errorMessage = "Error retrieving data from localStorage for key";
  try {
    const data = JSON.parse(localStorage.getItem(key));
    if (data === "false") {
      return false;
    }
    if (data === "true") {
      return true;
    }
    return data || [];
  } catch (error) {
    console.error(`${errorMessage} "${key}":`, error);
    return [];
  }
};

export { setStorageData, getStorageData };
