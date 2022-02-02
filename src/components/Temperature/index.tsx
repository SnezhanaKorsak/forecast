import React from "react";
import "./styles.scss";
import { TemperatureProps } from "./types";
import { useSelector } from "react-redux";
import { AppRootStateType } from "../../state/store";
import { TemperatureUnit } from "../../state/unitsReducer";

const conversionToCelsius = (temperature: number) => {
  return Math.round(temperature - 273.15);
};
const conversionToFahrenheit = (temperature: number) => {
  return Math.round(((temperature - 273.15) * 9) / 5 + 32);
};

export const Temperature: React.FC<TemperatureProps> = ({ temperature }) => {
  const temperatureUnits = useSelector<AppRootStateType, string>(
    (state) => state.units.temperatureUnits
  );

  if (temperatureUnits === TemperatureUnit.Celsius) {
    temperature = conversionToCelsius(temperature);
  } else {
    temperature = conversionToFahrenheit(temperature);
  }

  return (
    <div className="temp">
      {temperature}
      <sup className="unit">{temperatureUnits}</sup>
    </div>
  );
};
