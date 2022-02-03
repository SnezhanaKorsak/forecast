import { Dispatch } from "redux";
import { LocationActionsTypes } from "./actionsTypes";
import { geocodingAPI } from "../api/geocoding-api/geocodingAPI";
import { CoordinatesType } from "../api/weather-api/types";

export interface LocationType {
  id: string;
  placeName: string;
  coordinates: CoordinatesType;
}

type InitialStateType = {
  currentCity: string;
};
const initialState: InitialStateType = {
  currentCity: "",
};

export const locationReducer = (
  state = initialState,
  action: LocationActionsTypes
): InitialStateType => {
  switch (action.type) {
    case "SET-CURRENT-CITY-NAME":
      return { ...state, currentCity: action.cityName };

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

// thunk
export const fetchCityName = (lon: number, lat: number) => {
  return (dispatch: Dispatch) => {
    geocodingAPI.searchPlaceByCoordinates(lon, lat).then((res) => {
      dispatch(setCurrentCity(res.data.features[0].place_name));
    });
  };
};
