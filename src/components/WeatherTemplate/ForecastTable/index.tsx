import React from "react";
import { ForecastItem } from "./ForecastItem";
import { ForecastTableProps } from "./types";
import "./styles.scss";

const ForecastTable: React.FC<ForecastTableProps> = ({ currentForecast }) => {
  currentForecast.daily.length = 6;

  const forecastItems = currentForecast.daily.map((fr, index) => (
    <ForecastItem
      key={index}
      dt={fr.dt}
      icon={fr.weather[0].icon}
      dayTemp={fr.temp.day}
      nightTemp={fr.temp.night}
    />
  ));

  return <div className="table-container">{forecastItems}</div>;
};

export default ForecastTable;
