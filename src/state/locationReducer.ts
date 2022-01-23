import { Dispatch } from "redux";
import { LocationActionsTypes } from "./actionsTypes";
import { geocodingAPI } from "../api/geocoding-api/geocodingAPI";
import { FeaturesType } from "../api/geocoding-api/types";

type InitialStateType = {
  currentCity: string;
  variantsLocations: FeaturesType[];
  // coordinates: {
  //     lon: number | null
  //     lat: number | null
  // };
};
const initialState: InitialStateType = {
  currentCity: "",
  variantsLocations: [],
  // coordinates: {
  //     lon: null,
  //     lat: null
  // },
};

export const locationReducer = (
  state = initialState,
  action: LocationActionsTypes
): InitialStateType => {
  switch (action.type) {
    case "SET-CURRENT-CITY-NAME":
      return { ...state, currentCity: action.cityName };

    // case "SET-COORDINATES":
    //     return {...state, coordinates: action.payload}

    case "SET-LOCATIONS":
      return { ...state, variantsLocations: action.locations };

    default:
      return state;
  }
};

export const setCurrentCity = (cityName: string) => {
  return {
    type: "SET-CURRENT-CITY-NAME",
    cityName,
  } as const;
};

// export const setCoordinates = (lon: number, lat: number) => {
//     return {
//         type: "SET-COORDINATES",
//         payload: {lon, lat}
//     } as const;
// }

export const setLocations = (locations: FeaturesType[]) => {
  return {
    type: "SET-LOCATIONS",
    locations,
  } as const;
};

export const fetchCityName = (lon: number, lat: number) => {
  return (dispatch: Dispatch) => {
    geocodingAPI.searchPlaceByCoordinates(lon, lat).then((res) => {
      dispatch(setCurrentCity(res.data.features[0].place_name));
    });
  };
};

export const getVariantsLocation = (address: string) => {
  return (dispatch: Dispatch) => {
    geocodingAPI.searchByForwardGeocoding(address).then((res) => {
      if (res.data.features.length !== 0) {
        dispatch(setLocations(res.data.features));
        // remove then
        // res.data.features.forEach(el => console.log(el.place_name));
      }
    });
  };
};
