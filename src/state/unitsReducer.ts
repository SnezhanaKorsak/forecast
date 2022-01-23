import { UnitsActionsType } from "./actionsTypes";

type InitialStateType = {
  temperatureUnits: "°C" | "°F";
  windUnits: "m/s" | "km/h";
};
const initialState: InitialStateType = {
  temperatureUnits: "°C",
  windUnits: "m/s",
};

export const unitsReducer = (
  state = initialState,
  action: UnitsActionsType
): InitialStateType => {
  switch (action.type) {
    case "CHANGE-TEMPERATURE-UNITS":
      return { ...state, temperatureUnits: action.value };

    default:
      return state;
  }
};

export const changeTemperatureUnits = (value: "°C" | "°F") => {
  return {
    type: "CHANGE-TEMPERATURE-UNITS",
    value,
  } as const;
};
