import { Dispatch } from "redux";
import { LocationActionsTypes } from "./actionsTypes";
import { geocodingAPI } from "../api/geocoding-api/geocodingAPI";
import { FeaturesType } from "../api/geocoding-api/types";
import { CoordinatesType } from "../api/weather-api/types";

export interface LocationType {
  id: string;
  placeName: string;
  coordinates: CoordinatesType;
}

type InitialStateType = {
  currentCity: string;
  location: null | LocationType;
};
const initialState: InitialStateType = {
  currentCity: "",
  location: null,
};

export const locationReducer = (
  state = initialState,
  action: LocationActionsTypes
): InitialStateType => {
  switch (action.type) {
    case "SET-CURRENT-CITY-NAME":
      return { ...state, currentCity: action.cityName };

    case "SET-LOCATION":
      return {
        ...state,
        location: {
          id: action.location.id,
          placeName: action.location.place_name,
          coordinates: {
            lon: action.location.geometry.coordinates[0],
            lat: action.location.geometry.coordinates[1],
          },
        },
      };

    default:
      return state;
  }
};

// actions
export const setCurrentCity = (cityName: string) => {
  return {
    type: "SET-CURRENT-CITY-NAME",
    cityName,
  } as const;
};

export const setSelectedLocation = (location: FeaturesType) => {
  return {
    type: "SET-LOCATION",
    location,
  } as const;
};

// thunk
export const fetchCityName = (lon: number, lat: number) => {
  return (dispatch: Dispatch) => {
    geocodingAPI.searchPlaceByCoordinates(lon, lat).then((res) => {
      dispatch(setCurrentCity(res.data.features[0].place_name));
    });
  };
};
