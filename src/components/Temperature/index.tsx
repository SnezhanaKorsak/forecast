import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppRootStateType } from "../../state/store";
import { setTemperature, TemperatureUnit } from "../../state/unitsReducer";
import { TemperatureProps } from "./types";
import "./styles.scss";

export const conversionToCelsius = (temperature: number) => {
  return Math.round(temperature - 273.15);
};
export const conversionToFahrenheit = (temperature: number) => {
  return Math.round(((temperature - 273.15) * 9) / 5 + 32);
};

export const Temperature: React.FC<TemperatureProps> = ({ temperature }) => {
  const dispatch = useDispatch();

  const temperatureUnits = useSelector<AppRootStateType, string>(
    (state) => state.units.temperatureUnits
  );

  useEffect(() => {
    dispatch(setTemperature());
  }, []);

  if (temperatureUnits === TemperatureUnit.Celsius) {
    temperature = conversionToCelsius(temperature);
  } else {
    temperature = conversionToFahrenheit(temperature);
  }

  return (
    <div className="temp">
      {temperature}
      <span>{temperatureUnits}</span>
    </div>
  );
};
