import axios from "axios";
import { GetForecastResponseType, GetWeatherResponseType } from "./types";

const APIkey = "912143a6f2471bc4aed9039a5dc6d512";
const instance = axios.create({
  baseURL: "https://api.openweathermap.org/data/2.5/",
});

export const weatherAPI = {
  getCurrentWeatherByCityName(cityName: string) {
    return instance.get<GetWeatherResponseType>(
      `weather?q=${cityName}&appid=${APIkey}`
    );
  },
  getCurrentWeatherByGeoCoordinates(lat: number, lon: number) {
    return instance.get<GetWeatherResponseType>(
      `weather?lat=${lat}&lon=${lon}&appid=${APIkey}`
    );
  },
  getCurrentWeatherByZIPCode(zipCode: number, countryCode: number) {
    return instance.get<GetWeatherResponseType>(
      `weather?zip=${zipCode},${countryCode}&appid=${APIkey}`
    );
  },
  getDailyForecastWeather(lat: number, lon: number) {
    return instance.get<GetForecastResponseType>(
      `onecall?lat=${lat}&lon=${lon}&exclude=daily&appid=${APIkey}`
    );
  },
  getWeatherIcon(path: string) {
    return `https://openweathermap.org/img/wn/${path}@2x.png`;
  },
};
