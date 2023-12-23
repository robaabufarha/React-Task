const setLocalStorageData = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error(
      `Error setting data in localStorage for key "${key}":`,
      error
    );
  }
};
const getLocalStorageData = (key) => {
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
    console.error(
      `Error retrieving data from localStorage for key "${key}":`,
      error
    );
    return [];
  }
};

export { setLocalStorageData, getLocalStorageData };
