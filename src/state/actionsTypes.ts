import {
  setCurrentCity,
  setCurrentWeatherData,
  setWeatherIcon,
} from "./currentWeatherReducer";
import { changeTemperatureUnits } from "./unitsReducer";
import { setSelectedLocation } from "./locationReducer";
import {
  addForecastPanel,
  changeOrderForecastPanel,
  removeForecastPanel,
} from "./forecastReducer";

export type WeatherActionsTypes =
  | SetCurrentWeatherDataActionType
  | SetWeatherIconActionType;
export type LocationActionsTypes =
  | SetCurrentCityActionType
  | SetLocationsActionType;

export type UnitsActionsType = ChangeTemperatureUnitsActionType;
// export type SettingsActionsType = SetParamsSearchActionType;
export type ForecastActionsType =
  | AddForecastPanelActionType
  | RemoveForecastPanelActionType
  | ChangeOrderForecastPanelActionType;

// for WeatherActionsTypes
type SetCurrentWeatherDataActionType = ReturnType<typeof setCurrentWeatherData>;
type SetWeatherIconActionType = ReturnType<typeof setWeatherIcon>;

// for LocationActionsTypes
type SetCurrentCityActionType = ReturnType<typeof setCurrentCity>;
type SetLocationsActionType = ReturnType<typeof setSelectedLocation>;

// for UnitsActionsType
type ChangeTemperatureUnitsActionType = ReturnType<
  typeof changeTemperatureUnits
>;

// for SettingsActionsType
//type SetParamsSearchActionType = ReturnType<typeof setParamsSearch>;

// for ForecastActionsTypes
type AddForecastPanelActionType = ReturnType<typeof addForecastPanel>;
type RemoveForecastPanelActionType = ReturnType<typeof removeForecastPanel>;
type ChangeOrderForecastPanelActionType = ReturnType<
  typeof changeOrderForecastPanel
>;
