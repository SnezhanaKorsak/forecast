import React from "react";
import "./styles.scss";
import { ConditionItem } from "./ConditionItem";
import { ConditionsType } from "./ConditionItem/types";
import { useSelector } from "react-redux";
import { AppRootStateType } from "../../state/store";
import { GetWeatherResponseType } from "../../api/weather-api/types";
import { Temperature } from "../Temperature";
import TemperatureToggle from "../TemperatureToggle";

const CurrentWeatherConditions = () => {
  const currentWeather = useSelector<
    AppRootStateType,
    GetWeatherResponseType | null
  >((state) => state.currentWeather.data);
  const temperatureFeelsLike = currentWeather
    ? currentWeather?.main.feels_like
    : 0;
  const weatherDescription = currentWeather?.weather[0].description;
  const windSpeed = currentWeather && currentWeather.wind.speed;
  const windUnits = useSelector<AppRootStateType, string>(
    (state) => state.units.windUnits
  );
  const humidity = currentWeather && currentWeather.main.humidity;
  const visibility =
    currentWeather && +(currentWeather.visibility / 1000).toFixed(1);
  const pressure = currentWeather && currentWeather.main.pressure;
  const cloudiness = currentWeather && currentWeather.clouds.all;

  const conditions: ConditionsType[] = [
    { id: 1, name: "WIND", value: windSpeed, units: windUnits },
    { id: 2, name: "HUMIDITY", value: humidity, units: "%" },
    { id: 3, name: "VISIBILITY", value: visibility, units: "km" },
    { id: 4, name: "PRESSURE", value: pressure, units: "hPa" },
    { id: 5, name: "CLOUDINESS", value: cloudiness, units: "%" },
  ];
  const conditionItem = conditions.map((m) => (
    <ConditionItem
      key={m.id}
      conditionName={m.name}
      value={m.value}
      units={m.units}
    />
  ));
  return (
    <>
      <div className="summary-caption-container">
        <div className="summary-content">
          <div className="weather-description">{weatherDescription}</div>
          <span>Feels like: </span>
          <Temperature
            temperatureInKelvin={temperatureFeelsLike}
            role="-feelsLike"
          />
        </div>
      </div>
      <div className="conditions-items">
        {conditionItem}
        <TemperatureToggle />
      </div>
    </>
  );
};

export default CurrentWeatherConditions;
