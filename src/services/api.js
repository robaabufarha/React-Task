// api.js

export const fetchAllCountries = () => {
    return fetch("https://restcountries.com/v3.1/all")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to fetch all countries. Status: ${response.status}`);
        }
        return response.json();
      })
      .catch((error) => {
        console.error("Error fetching all countries:", error);
        throw error;
      });
  };
  
  export const searchCountriesByName = (name) => {
    const apiUrl = `https://restcountries.com/v3.1/name/${name}`;
  
    return fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to search countries by name. Status: ${response.status}`);
        }
        return response.json();
      })
      .catch((error) => {
        console.error("Error searching countries by name:", error);
        throw error;
      });
  };
  export const getCountryByName = (countryName) => {
    const apiUrl = `https://restcountries.com/v3.1/name/${countryName}?fullText=true`;
  
    return fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to get country by name. Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => data[0])
      .catch((error) => {
        console.error("Error getting country by name:", error);
        throw new Error("Error fetching country");
      });
  };
  