import axios from "axios";
import {
  LocationForecastType,
  GetWeatherResponseType,
  CoordinatesType,
} from "./types";

const APIkey = "912143a6f2471bc4aed9039a5dc6d512";
const instance = axios.create({
  baseURL: "https://api.openweathermap.org/data/2.5/",
});

export const weatherAPI = {
  getCurrentWeatherByGeoCoordinates(lat: number, lon: number) {
    return instance.get<GetWeatherResponseType>(
      `weather?lat=${lat}&lon=${lon}&appid=${APIkey}`
    );
  },

  getDailyForecastByCoordinates({ lat, lon }: CoordinatesType) {
    return instance.get<LocationForecastType>(
      `onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly&appid=${APIkey}`
    );
  },

  getWeatherIcon(path: string) {
    return `https://openweathermap.org/img/wn/${path}@2x.png`;
  },
};
