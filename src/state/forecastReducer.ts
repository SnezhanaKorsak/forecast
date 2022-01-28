import { ForecastActionsType } from "./actionsTypes";
import { LocationForecastType } from "../api/weather-api/types";
import { Dispatch } from "redux";
import { weatherAPI } from "../api/weather-api/weatherAPI";
import { LocationType } from "./locationReducer";

export type ForecastPanelType = LocationForecastType & {
  id: string;
  placeName: string;
};

type InitialStateType = ForecastPanelType[];

const initialState: InitialStateType = [];

export const forecastReducer = (
  state = initialState,
  action: ForecastActionsType
): InitialStateType => {
  switch (action.type) {
    case "ADD-FORECAST-PANEL": {
      const inState = [...state].some((s) => s.id === action.payload.id);

      if (inState) {
        return [...state];
      }
      // replace then!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      const copy = [...state, action.payload];

      console.log(copy);
      return copy;
    }
    //return [...state, action.payload]

    case "REMOVE-FORECAST-PANEL":
      return state.filter((pl) => pl.id !== action.id);

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

// thunk
export const fetchDailyForecast = (location: LocationType) => {
  const { id, placeName, coordinates } = location;

  return (dispatch: Dispatch) => {
    weatherAPI.getDailyForecastByCoordinates({ ...coordinates }).then((res) => {
      dispatch(addForecastPanel(res.data, id, placeName));
    });
  };
};
