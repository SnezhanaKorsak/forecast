import {
  setCurrentCity,
  setCurrentWeatherData,
  setWeatherIcon,
} from "./currentWeatherReducer";
import { changeTemperatureUnits } from "./unitsReducer";

export type WeatherActionsTypes =
  | SetCurrentWeatherDataActionType
  | SetWeatherIconActionType;
export type LocationActionsTypes = SetCurrentCityActionType;
export type SettingActionsType = ChangeTemperatureUnitsActionType;

//for WeatherActionsTypes
type SetCurrentWeatherDataActionType = ReturnType<typeof setCurrentWeatherData>;
type SetWeatherIconActionType = ReturnType<typeof setWeatherIcon>;

//for LocationActionsTypes
type SetCurrentCityActionType = ReturnType<typeof setCurrentCity>;

//for SettingActionsType
type ChangeTemperatureUnitsActionType = ReturnType<
  typeof changeTemperatureUnits
>;
