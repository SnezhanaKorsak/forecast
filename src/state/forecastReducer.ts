import { ForecastActionsType } from "./actionsTypes";
import {
  CoordinatesType,
  LocationForecastType,
} from "../api/weather-api/types";
import { Dispatch } from "redux";
import { weatherAPI } from "../api/weather-api/weatherAPI";

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
//const cachedFavourites = localStorage.getItem("favourites")

const initialState: InitialStateType = {
  forecastPanels: [],
  favouritesList: [],
};
// favourites: cachedFavourites ? JSON.parse(cachedFavourites) : [],
export const forecastReducer = (
  state = initialState,
  action: ForecastActionsType
): InitialStateType => {
  switch (action.type) {
    case "ADD-FORECAST-PANEL": {
      // const inState = [...state].some((s) => s.id === action.payload.id);
      const inState = state.forecastPanels.some(
        (s) => s.id === action.payload.id
      );

      if (inState) {
        return { ...state };
      }

      const isFavourite = action.payload.placeName in localStorage;

      // replace then!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

      //const copy = [...state, {...action.payload, order: state.length, isFavourite: false}];
      const copy = {
        ...state,
        forecastPanels: [
          ...state.forecastPanels,
          {
            ...action.payload,
            order: state.forecastPanels.length,
            isFavourite: isFavourite,
          },
        ],
      };

      console.log(copy);
      return copy;
    }
    //return [...state, action.payload]

    case "REMOVE-FORECAST-PANEL":
      //return state.filter((pl) => pl.id !== action.id)
      return {
        ...state,
        forecastPanels: state.forecastPanels.filter(
          (pl) => pl.id !== action.id
        ),
      };

    case "CHANGE-ORDER-FORECAST-PANEL":
      /*return state.map((pl) => pl.id === action.id ? {
                ...pl,
                order: action.order
            } : pl)*/
      return {
        ...state,
        forecastPanels: state.forecastPanels.map((pl) =>
          pl.id === action.id ? { ...pl, order: action.order } : pl
        ),
      };

    case "CHANGE-FAVOURITE-STATUS":
      // return state.map(pl => pl.id === action.id ? {...pl, isFavourite: action.isFavouriteStatus} : pl)
      return {
        ...state,
        forecastPanels: state.forecastPanels.map((pl) =>
          pl.id === action.id
            ? { ...pl, isFavourite: action.isFavouriteStatus }
            : pl
        ),
      };

    case "ADD-TO-FAVOURITES-LIST": {
      /*   const inState = state.favouritesList.some((s) => s.id === action.favourites);

               if (inState) {
                   return {...state};
               }*/
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
    weatherAPI.getDailyForecastByCoordinates({ ...coordinates }).then((res) => {
      dispatch(addForecastPanel(res.data, id, placeName));
    });
  };
};

export const setToFavouriteListFromLS = () => {
  return (dispatch: Dispatch) => {
    const keysLS = Object.keys(localStorage);
    const favouritesList = keysLS.map((key) => {
      const cachedFavourites = localStorage.getItem(key);
      return cachedFavourites ? JSON.parse(cachedFavourites) : null;
    });
    dispatch(addToFavouritesList(favouritesList));
  };
};

export const addToFavoriteLS = (
  id: string,
  placeName: string,
  coordinates: CoordinatesType
) => {
  return (dispatch: Dispatch) => {
    const favouriteItem = { id, placeName, coordinates };
    localStorage.setItem(placeName, JSON.stringify(favouriteItem));
    dispatch(changeFavouriteStatus(true, id));
  };
};

export const removeFromFavoriteLS = (id: string, placeName: string) => {
  return (dispatch: Dispatch) => {
    localStorage.removeItem(placeName);
    dispatch(removeFromFavouritesList(id));
    dispatch(changeFavouriteStatus(false, id));
  };
};

export const clearAllFavoritesListLS = () => {
  return (dispatch: Dispatch) => {
    localStorage.clear();
    if (localStorage.length === 0) {
      dispatch(addToFavouritesList([]));
      dispatch(changeAllFavouritesStatuses());
    }
  };
};
