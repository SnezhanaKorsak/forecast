import axios from "axios";

const APIkey = "51f0d780-7d10-11ec-b334-c115b17bef8d";

const instance = axios.create({
  baseURL: "https://app.zipcodebase.com/api/v1/",
});

export const zipCodGeocodingAPI = {
  searchByZipCodGeocoding(postalCode: string, countryCode: string) {
    const codes = `${postalCode},${countryCode}`;
    return instance.get(`search?apikey=${APIkey}&codes=${codes}`);
  },
};
