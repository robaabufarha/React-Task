export const request = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    const errorMessage = `Error fetching countries: ${error.message}`;
    throw new Error(errorMessage);
    return [];
  }
};
