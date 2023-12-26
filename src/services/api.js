import { request } from './request';

const baseUrl = "https://restcountries.com/v3.1";

export const fetchAllCountries = () => {
  const apiUrl = `${baseUrl}/all`;

  return request(apiUrl);
};
let latestRequest = 0;
export const searchCountriesByName = (name) => {
  const apiUrl = `${baseUrl}/name/${name}`;
  let currentRequest=Date.now();
  latestRequest=currentRequest;
  if(currentRequest===latestRequest)
  {
    return request(apiUrl);
  }
  
};

export const getCountryByName = (countryName) => {
  const apiUrl = `${baseUrl}/name/${countryName}?fullText=true`;

  return request(apiUrl)
    .then((data) => data[0]);
};