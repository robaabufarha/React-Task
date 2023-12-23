export const fetchAllCountries = () => {
  const apiUrl = "https://restcountries.com/v3.1/all";

  return fetch(apiUrl)
    .then((response) => {
      if (!response.ok) {
        const errorMessage = `Failed to fetch all countries. Status: ${response.status}`;
        throw new Error(errorMessage);
      }
      return response.json();
    })
    .catch((error) => {
      const errorMessage = `Error fetching all countries: ${error.message}`;
      throw new Error(errorMessage);
    });
};

export const searchCountriesByName = (name) => {
  const apiUrl = `https://restcountries.com/v3.1/name/${name}`;

  return fetch(apiUrl)
    .then((response) => {
      if (!response.ok) {
        const errorMessage = `Failed to search countries by name. Status: ${response.status}`;
        throw new Error(errorMessage);
      }
      return response.json();
    })
    .catch((error) => {
      const errorMessage = `Error searching countries by name: ${error.message}`;
      throw new Error(errorMessage);
    });
};

export const getCountryByName = (countryName) => {
  const apiUrl = `https://restcountries.com/v3.1/name/${countryName}?fullText=true`;

  return fetch(apiUrl)
    .then((response) => {
      if (!response.ok) {
        const errorMessage = `Failed to get country by name. Status: ${response.status}`;
        throw new Error(errorMessage);
      }
      return response.json();
    })
    .then((data) => data[0])
    .catch((error) => {
      const errorMessage = `Error getting country by name: ${error.message}`;
      throw new Error(errorMessage);
    });
};
