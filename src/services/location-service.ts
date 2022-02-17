import { geocodingAPI } from "../api/geocoding-api/geocodingAPI";
import { zipCodGeocodingAPI } from "../api/zipCodGeocoding-api/zipCodGeocodingAPI";
import { resultByZipCod } from "./types";
import { CoordinatesType } from "../api/weather-api/types";
import { weatherAPI } from "../api/weather-api/weatherAPI";

export const getLocationsByName = (address: string) => {
  return geocodingAPI.searchByForwardGeocoding(address);
};

export const getLocationsByCoordinates = ({ lon, lat }: CoordinatesType) => {
  return geocodingAPI.searchPlaceByCoordinates(lon, lat);
};

export const getCoordinatesByZipCod = (
  postalCode: string,
  countryCode: string
) => {
  return zipCodGeocodingAPI
    .searchByZipCodGeocoding(postalCode, countryCode)
    .then((res) => {
      const codes = res.data.query.codes;
      const results: resultByZipCod[] = res.data.results[codes[0]];
      const currentResult = results.find((f) => f.country_code === countryCode);

      if (currentResult) {
        const lon = +currentResult.longitude;
        const lat = +currentResult.latitude;
        return getLocationsByCoordinates({ lon, lat });
      }
    });
};

export const getCurrentWeather = ({ lat, lon }: CoordinatesType) => {
  return weatherAPI.getCurrentWeatherByGeoCoordinates(lat, lon).then((res) => {
    const locationWeather = {
      id: res.data.id,
      coordinates: res.data.coord,
      main: res.data.main,
      wind: res.data.wind,
      clouds: res.data.clouds,
      sys: res.data.sys,
      name: res.data.name,
    };
    return Promise.resolve(locationWeather);
  });
};

export const getDailyWeather = ({ lat, lon }: CoordinatesType) => {
  return weatherAPI
    .getDailyForecastByCoordinates({ lat, lon })
    .then((res) => res.data.daily);
};
