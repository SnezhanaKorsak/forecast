import {
  setCurrentCity,
  setCurrentWeatherData,
  setWeatherIcon,
} from "./currentWeatherReducer";
import { changeTemperatureUnits } from "./unitsReducer";
import {
  addForecastPanel,
  addToFavouritesList,
  changeFavouriteStatus,
  changeOrderForecastPanel,
  changeAllFavouritesStatuses,
  removeForecastPanel,
  removeFromFavouritesList,
} from "./forecastReducer";
import { setError, setLoading } from "./appReducer";

export type WeatherActionsTypes =
  | SetCurrentWeatherDataActionType
  | SetWeatherIconActionType;
export type LocationActionsTypes = SetCurrentCityActionType;

export type UnitsActionsType = ChangeTemperatureUnitsActionType;
export type AppActionsType = SetLoadingActionType | SetErrorActionType;
export type ForecastActionsType =
  | AddForecastPanelActionType
  | RemoveForecastPanelActionType
  | ChangeOrderForecastPanelActionType
  | ChangeFavouriteStatusActionType
  | AddToFavouritesListActionType
  | RemoveFromFavouritesListActionType
  | ClearAllFavouritesListActionType;

// for WeatherActionsTypes
type SetCurrentWeatherDataActionType = ReturnType<typeof setCurrentWeatherData>;
type SetWeatherIconActionType = ReturnType<typeof setWeatherIcon>;

// for LocationActionsTypes
type SetCurrentCityActionType = ReturnType<typeof setCurrentCity>;

// for UnitsActionsType
type ChangeTemperatureUnitsActionType = ReturnType<
  typeof changeTemperatureUnits
>;

// for AppActionsType
type SetLoadingActionType = ReturnType<typeof setLoading>;
type SetErrorActionType = ReturnType<typeof setError>;

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
