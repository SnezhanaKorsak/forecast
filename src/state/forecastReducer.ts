import { ForecastActionsType } from "./actionsTypes";
import {
  CoordinatesType,
  LocationForecastType,
} from "../api/weather-api/types";
import { Dispatch } from "redux";
import { weatherAPI } from "../api/weather-api/weatherAPI";
import { setLoading, setRootError } from "./appReducer";
import { AxiosError } from "axios";

export type ForecastPanelType = LocationForecastType & {
  id: string;
  placeName: string;
  order: number;
  isFavourite: boolean;
};

export interface FavouriteType {
  id: string;
  placeName: string;
  coordinates: CoordinatesType;
}

type InitialStateType = {
  forecastPanels: ForecastPanelType[];
  favouritesList: FavouriteType[];
};

const initialState: InitialStateType = {
  forecastPanels: [],
  favouritesList: [],
};

export const forecastReducer = (
  state = initialState,
  action: ForecastActionsType
): InitialStateType => {
  switch (action.type) {
    case "ADD-FORECAST-PANEL": {
      const inState = state.forecastPanels.some(
        (s) => s.id === action.payload.id
      );

      if (inState) {
        return { ...state };
      }

      const isFavourite = action.payload.id in localStorage;

      return {
        ...state,
        forecastPanels: [
          {
            ...action.payload,
            order: state.forecastPanels.length,
            //order: 5,
            isFavourite: isFavourite,
          },
          ...state.forecastPanels,
        ],
      };
    }

    case "REMOVE-FORECAST-PANEL":
      return {
        ...state,
        forecastPanels: state.forecastPanels.filter(
          (pl) => pl.id !== action.id
        ),
      };

    case "CHANGE-ORDER-FORECAST-PANEL":
      return {
        ...state,
        forecastPanels: state.forecastPanels.map((pl) =>
          pl.id === action.id ? { ...pl, order: action.order } : pl
        ),
      };

    case "CHANGE-FAVOURITE-STATUS":
      return {
        ...state,
        forecastPanels: state.forecastPanels.map((pl) =>
          pl.id === action.id
            ? { ...pl, isFavourite: action.isFavouriteStatus }
            : pl
        ),
      };

    case "ADD-TO-FAVOURITES-LIST": {
      return { ...state, favouritesList: [...action.favourites] };
    }

    case "REMOVE-FROM-FAVOURITES-LIST":
      return {
        ...state,
        favouritesList: state.favouritesList.filter(
          (pl) => pl.id !== action.id
        ),
      };

    case "CHANGE-ALL-FAVOURITES-STATUSES":
      return {
        ...state,
        forecastPanels: state.forecastPanels.map((pl) =>
          pl.isFavourite ? { ...pl, isFavourite: false } : pl
        ),
      };

    default:
      return state;
  }
};

// actions
export const addForecastPanel = (
  forecast: LocationForecastType,
  id: string,
  placeName: string
) => {
  return {
    type: "ADD-FORECAST-PANEL",
    payload: { ...forecast, id, placeName },
  } as const;
};

export const removeForecastPanel = (id: string) => {
  return {
    type: "REMOVE-FORECAST-PANEL",
    id,
  } as const;
};

export const changeOrderForecastPanel = (id: string, order: number) => {
  return {
    type: "CHANGE-ORDER-FORECAST-PANEL",
    id,
    order,
  } as const;
};

export const changeFavouriteStatus = (
  isFavouriteStatus: boolean,
  id: string
) => {
  return {
    type: "CHANGE-FAVOURITE-STATUS",
    isFavouriteStatus,
    id,
  } as const;
};

export const addToFavouritesList = (favourites: FavouriteType[]) => {
  return {
    type: "ADD-TO-FAVOURITES-LIST",
    favourites,
  } as const;
};

export const removeFromFavouritesList = (id: string) => {
  return {
    type: "REMOVE-FROM-FAVOURITES-LIST",
    id,
  } as const;
};

export const changeAllFavouritesStatuses = () => {
  return {
    type: "CHANGE-ALL-FAVOURITES-STATUSES",
  } as const;
};

// thunk
export const fetchDailyForecast = (
  id: string,
  placeName: string,
  coordinates: CoordinatesType
) => {
  return (dispatch: Dispatch) => {
    dispatch(setLoading("loading-forecast"));
    weatherAPI
      .getDailyForecastByCoordinates({ ...coordinates })
      .then((res) => {
        dispatch(addForecastPanel(res.data, id, placeName));
      })
      .catch((error: AxiosError) => {
        dispatch(setRootError(error.message));
      })
      .finally(() => {
        dispatch(setLoading("idle"));
      });
  };
};

export const setToFavouriteListFromLS = () => {
  return (dispatch: Dispatch) => {
    const keysLS = Object.keys(localStorage).filter(
      (key) => key.indexOf("place.") >= 0 || key.indexOf("region.") >= 0
    );
    const favouritesList = keysLS.map((key) => {
      const cachedFavourites = localStorage.getItem(key);
      return cachedFavourites
        ? { ...JSON.parse(cachedFavourites), id: key }
        : null;
    });
    dispatch(addToFavouritesList(favouritesList));
  };
};

export const addToFavouriteLS = (
  id: string,
  placeName: string,
  coordinates: CoordinatesType
) => {
  return (dispatch: Dispatch) => {
    const favouriteItem = { placeName, coordinates };
    localStorage.setItem(id, JSON.stringify(favouriteItem));
    dispatch(changeFavouriteStatus(true, id));
  };
};

export const removeFromFavouriteLS = (id: string) => {
  return (dispatch: Dispatch) => {
    localStorage.removeItem(id);
    dispatch(removeFromFavouritesList(id));
    dispatch(changeFavouriteStatus(false, id));
  };
};

export const clearAllFavouritesListLS = () => {
  return (dispatch: Dispatch) => {
    const keysLS = Object.keys(localStorage).filter(
      (key) => key.indexOf("place.") >= 0 || key.indexOf("region.") >= 0
    );
    keysLS.forEach((key) => localStorage.removeItem(key));
    dispatch(addToFavouritesList([]));
    dispatch(changeAllFavouritesStatuses());
  };
};
