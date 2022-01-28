import React from "react";
import "./styles.scss";
import { ForecastTableProps } from "./types";
import { ForecastItem } from "./ForecastItem";

const ForecastTable: React.FC<ForecastTableProps> = ({
  currentForecast,
  timezone,
}) => {
  currentForecast.daily.length = 6;

  const forecastItems = currentForecast.daily.map((fr, index) => (
    <ForecastItem
      key={index}
      dt={fr.dt}
      iconPath={fr.weather.icon}
      dayTemp={fr.temp.day}
      nightTemp={fr.temp.night}
      timezone={timezone}
    />
  ));

  return <div className="table-container">{forecastItems}</div>;
};

export default ForecastTable;
