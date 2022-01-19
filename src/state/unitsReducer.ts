import { SettingActionsType } from "./actionsTypes";

type InitialStateType = {
  temperatureUnits: "Celsius" | "Fahrenheit";
  windUnits: "m/s" | "km/h";
};
const initialState: InitialStateType = {
  temperatureUnits: "Celsius",
  windUnits: "m/s",
};

export const unitsReducer = (
  state = initialState,
  action: SettingActionsType
): InitialStateType => {
  switch (action.type) {
    case "CHANGE-TEMPERATURE-UNITS":
      return { ...state, temperatureUnits: action.value };

    default:
      return state;
  }
};

export const changeTemperatureUnits = (value: "Celsius" | "Fahrenheit") => {
  return {
    type: "CHANGE-TEMPERATURE-UNITS",
    value,
  } as const;
};
