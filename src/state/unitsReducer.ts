import { UnitsActionsType } from "./actionsTypes";

type InitialStateType = {
  temperatureUnits: TemperatureUnit;
  windUnits: WindUnit;
};

export enum TemperatureUnit {
  Kelvin = "°K",
  Celsius = "°C",
  Fahrenheit = "°F",
}

export enum WindUnit {
  Meters = "m/s",
  Kilometers = "km/h",
}

const initialState: InitialStateType = {
  temperatureUnits: TemperatureUnit.Celsius,
  windUnits: WindUnit.Meters,
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

export const changeTemperatureUnits = (value: TemperatureUnit) => {
  return {
    type: "CHANGE-TEMPERATURE-UNITS",
    value,
  } as const;
};
