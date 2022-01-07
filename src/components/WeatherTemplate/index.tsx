import React from "react";
import "./styles.scss";
import CityWeather from "./CityWeather";
import ForecastTable from "./ForecastTable";
import WeatherNav from "./WeatherNav";

const WeatherTemplate = () => {
  return (
    <div className="section-container">
      <div className="weather-template-container">
        <CityWeather />
        <ForecastTable />
        <WeatherNav />
      </div>
    </div>
  );
};

export default WeatherTemplate;
