import {
  setCurrentCity,
  setCurrentWeatherData,
  setWeatherIcon,
} from "./currentWeatherReducer";
import { changeTemperatureUnits } from "./unitsReducer";
import { setLocations } from "./locationReducer";

export type WeatherActionsTypes =
  | SetCurrentWeatherDataActionType
  | SetWeatherIconActionType;
export type LocationActionsTypes =
  | SetCurrentCityActionType
  | SetLocationsActionType;
export type UnitsActionsType = ChangeTemperatureUnitsActionType;

//for WeatherActionsTypes
type SetCurrentWeatherDataActionType = ReturnType<typeof setCurrentWeatherData>;
type SetWeatherIconActionType = ReturnType<typeof setWeatherIcon>;

//for LocationActionsTypes
type SetCurrentCityActionType = ReturnType<typeof setCurrentCity>;
//type SetCoordinatesActionType = ReturnType<typeof setCoordinates>;
type SetLocationsActionType = ReturnType<typeof setLocations>;

//for UnitsActionsType
type ChangeTemperatureUnitsActionType = ReturnType<
  typeof changeTemperatureUnits
>;
