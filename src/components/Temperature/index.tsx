import React from "react";
import "./styles.scss";
import { TemperatureProps } from "./types";
import { useSelector } from "react-redux";
import { AppRootStateType } from "../../state/store";

export const Temperature: React.FC<TemperatureProps> = ({
  temperatureInKelvin,
  role,
}) => {
  const temperatureUnits = useSelector<AppRootStateType, string>(
    (state) => state.units.temperatureUnits
  );

  let temperature = temperatureInKelvin;

  if (temperatureUnits === "°C" && temperatureInKelvin) {
    temperature = Math.round(temperatureInKelvin - 273.15);
  } else if (temperatureInKelvin) {
    temperature = Math.round(((temperatureInKelvin - 273.15) * 9) / 5 + 32);
  }

  return (
    <div className={`temp${role}`}>
      {temperature}
      <span className="unit">{temperatureUnits}</span>
    </div>
  );
};
