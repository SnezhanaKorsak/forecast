import { GetWeatherResponseType } from "../api/weather-api/types";
import { WeatherActionsTypes } from "./actionsTypes";
import { Dispatch } from "redux";
import { weatherAPI } from "../api/weather-api/weatherAPI";

type InitialStateType = {
  data: GetWeatherResponseType | null;
  icon: string;
};
const initialState: InitialStateType = {
  data: null,
  icon: "",
};

export const currentWeatherReducer = (
  state = initialState,
  action: WeatherActionsTypes
): InitialStateType => {
  switch (action.type) {
    case "SET-CURRENT-WEATHER-DATA":
      return { ...state, data: action.data };

    case "SET-WEATHER-ICON":
      return { ...state, icon: action.path };

    default:
      return state;
  }
};

export const setCurrentWeatherData = (data: null | GetWeatherResponseType) => {
  return {
    type: "SET-CURRENT-WEATHER-DATA",
    data,
  } as const;
};

export const setWeatherIcon = (path: string) => {
  return {
    type: "SET-WEATHER-ICON",
    path,
  } as const;
};
export const setCurrentCity = (cityName: string) => {
  return {
    type: "SET-CURRENT-CITY-NAME",
    cityName,
  } as const;
};
export const fetchWeatherData = (lat: number, lon: number) => {
  return (dispatch: Dispatch) => {
    weatherAPI.getCurrentWeatherByGeoCoordinates(lat, lon).then((res) => {
      dispatch(setCurrentWeatherData(res.data));
      dispatch(
        setWeatherIcon(weatherAPI.getWeatherIcon(res.data.weather[0].icon))
      );
    });
  };
};
