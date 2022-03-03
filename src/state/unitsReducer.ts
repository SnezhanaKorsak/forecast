import { UnitsActionsType } from "./actionsTypes";
import { Dispatch } from "redux";

type InitialStateType = {
  temperatureUnits: TemperatureUnit;
  windUnits: WindUnit;
  pressureUnit: PressureUnit;
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

export enum PressureUnit {
  Millimeters = "mmHg",
  Pascal = "hPa",
}

const initialState: InitialStateType = {
  temperatureUnits: TemperatureUnit.Celsius,
  windUnits: WindUnit.Meters,
  pressureUnit: PressureUnit.Pascal,
};

export const unitsReducer = (
  state = initialState,
  action: UnitsActionsType
): InitialStateType => {
  switch (action.type) {
    case "SET-TEMPERATURE-UNITS":
    case "CHANGE-TEMPERATURE-UNITS":
      return { ...state, temperatureUnits: action.value };

    case "SET-WIND-UNITS":
    case "CHANGE-WIND-UNITS":
      return { ...state, windUnits: action.value };

    case "SET-PRESSURE-UNITS":
    case "CHANGE-PRESSURE-UNITS":
      return { ...state, pressureUnit: action.value };

    default:
      return state;
  }
};

//actions
export const setTemperatureUnits = (value: TemperatureUnit) => {
  return {
    type: "SET-TEMPERATURE-UNITS",
    value,
  } as const;
};

export const setWindSpeedUnits = (value: WindUnit) => {
  return {
    type: "SET-WIND-UNITS",
    value,
  } as const;
};

export const setPressureUnits = (value: PressureUnit) => {
  return {
    type: "SET-PRESSURE-UNITS",
    value,
  } as const;
};

export const changeTemperatureUnits = (value: TemperatureUnit) => {
  return {
    type: "CHANGE-TEMPERATURE-UNITS",
    value,
  } as const;
};

export const changeWindSpeedUnits = (value: WindUnit) => {
  return {
    type: "CHANGE-WIND-UNITS",
    value,
  } as const;
};

export const changePressuredUnits = (value: PressureUnit) => {
  return {
    type: "CHANGE-PRESSURE-UNITS",
    value,
  } as const;
};

//thunk
export const setTemperature = () => {
  return (dispatch: Dispatch) => {
    const temperatureUnitsLS = localStorage.getItem("temperatureUnits");
    if (temperatureUnitsLS) {
      const temperatureUnits = JSON.parse(temperatureUnitsLS);
      dispatch(setTemperatureUnits(temperatureUnits));
    }
  };
};

export const setWindSpeed = () => {
  return (dispatch: Dispatch) => {
    const windSpeedUnitsLS = localStorage.getItem("windUnits");
    if (windSpeedUnitsLS) {
      const windSpeedUnits = JSON.parse(windSpeedUnitsLS);
      dispatch(setWindSpeedUnits(windSpeedUnits));
    }
  };
};

export const setPressure = () => {
  return (dispatch: Dispatch) => {
    const pressureUnitsLS = localStorage.getItem("pressureUnits");
    if (pressureUnitsLS) {
      const pressureUnits = JSON.parse(pressureUnitsLS);
      dispatch(setPressureUnits(pressureUnits));
    }
  };
};
