import {
  setCurrentCity,
  setCurrentWeatherData,
  setWeatherIcon,
} from "./currentWeatherReducer";
import {
  changePressuredUnits,
  setTemperatureUnits,
  changeWindSpeedUnits,
  changeTemperatureUnits,
  setWindSpeedUnits,
  setPressureUnits,
} from "./unitsReducer";
import {
  addForecastPanel,
  addToFavouritesList,
  changeAllFavouritesStatuses,
  changeFavouriteStatus,
  changeOrderForecastPanel,
  removeForecastPanel,
  removeFromFavouritesList,
} from "./forecastReducer";
import { setRootError, setLoading } from "./appReducer";
import { changeTheme, setTheme } from "./themeReducer";

export type WeatherActionsTypes =
  | SetCurrentWeatherDataActionType
  | SetWeatherIconActionType;
export type LocationActionsTypes = SetCurrentCityActionType;

export type UnitsActionsType =
  | ChangeTemperatureUnitsActionType
  | ChangeWindSpeedUnitsActionType
  | ChangePressuredUnitsActionType
  | SetTemperatureUnitsActionType
  | SetWindSpeedUnitsActionType
  | SetPressuredUnitsActionType;
export type AppActionsType = SetLoadingActionType | SetErrorActionType;
export type ForecastActionsType =
  | AddForecastPanelActionType
  | RemoveForecastPanelActionType
  | ChangeOrderForecastPanelActionType
  | ChangeFavouriteStatusActionType
  | AddToFavouritesListActionType
  | RemoveFromFavouritesListActionType
  | ClearAllFavouritesListActionType;

export type ThemeActionsType = ChangeThemeActionType | SetThemeActionType;

// for WeatherActionsTypes
type SetCurrentWeatherDataActionType = ReturnType<typeof setCurrentWeatherData>;
type SetWeatherIconActionType = ReturnType<typeof setWeatherIcon>;

// for LocationActionsTypes
type SetCurrentCityActionType = ReturnType<typeof setCurrentCity>;

// for UnitsActionsType
type ChangeTemperatureUnitsActionType = ReturnType<
  typeof changeTemperatureUnits
>;
type ChangeWindSpeedUnitsActionType = ReturnType<typeof changeWindSpeedUnits>;
type ChangePressuredUnitsActionType = ReturnType<typeof changePressuredUnits>;
type SetTemperatureUnitsActionType = ReturnType<typeof setTemperatureUnits>;
type SetWindSpeedUnitsActionType = ReturnType<typeof setWindSpeedUnits>;
type SetPressuredUnitsActionType = ReturnType<typeof setPressureUnits>;

// for AppActionsType
type SetLoadingActionType = ReturnType<typeof setLoading>;
type SetErrorActionType = ReturnType<typeof setRootError>;

// for ForecastActionsTypes
type AddForecastPanelActionType = ReturnType<typeof addForecastPanel>;
type RemoveForecastPanelActionType = ReturnType<typeof removeForecastPanel>;
type ChangeOrderForecastPanelActionType = ReturnType<
  typeof changeOrderForecastPanel
>;
type ChangeFavouriteStatusActionType = ReturnType<typeof changeFavouriteStatus>;
type AddToFavouritesListActionType = ReturnType<typeof addToFavouritesList>;
type RemoveFromFavouritesListActionType = ReturnType<
  typeof removeFromFavouritesList
>;
type ClearAllFavouritesListActionType = ReturnType<
  typeof changeAllFavouritesStatuses
>;

// for ThemeActionsTypes
type ChangeThemeActionType = ReturnType<typeof changeTheme>;
type SetThemeActionType = ReturnType<typeof setTheme>;
