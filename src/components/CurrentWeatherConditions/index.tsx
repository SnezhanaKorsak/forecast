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
  const windUnits = useSelector<AppRootStateType, string>(
    (state) => state.units.windUnits
  );

  if (!currentWeather) {
    return null;
  }

  const temperatureFeelsLike = currentWeather.main.feels_like;
  const weatherDescription = currentWeather.weather[0].description;
  const windSpeed = currentWeather.wind.speed;
  const humidity = currentWeather.main.humidity;
  const visibility =
    +(currentWeather.visibility / 1000) <= 1
      ? +(currentWeather.visibility / 1000).toFixed(2)
      : +(currentWeather.visibility / 1000).toFixed(1);
  const pressure = currentWeather.main.pressure;
  const cloudiness = currentWeather.clouds.all;

  const conditions: ConditionsType[] = [
    { id: 1, name: "WIND", value: windSpeed, units: windUnits },
    { id: 2, name: "HUMIDITY", value: humidity, units: "%" },
    { id: 3, name: "VISIBILITY", value: visibility, units: "km" },
    { id: 4, name: "PRESSURE", value: pressure, units: "hPa" },
    { id: 5, name: "CLOUDINESS", value: cloudiness, units: "%" },
  ];
  const conditionItems = conditions.map((m) => (
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
          <div className="conditions-temp-container">
            {temperatureFeelsLike && (
              <Temperature temperature={temperatureFeelsLike} />
            )}
          </div>
        </div>
      </div>
      <div className="conditions-items">
        {conditionItems}
        <TemperatureToggle />
      </div>
    </>
  );
};

export default CurrentWeatherConditions;
