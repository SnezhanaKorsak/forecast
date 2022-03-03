import React from "react";
import { useTranslation } from "react-i18next";
import { ConditionItem } from "./ConditionItem";
import { ConditionsType } from "./ConditionItem/types";
import { useSelector } from "react-redux";
import { AppRootStateType } from "../../state/store";
import { GetWeatherResponseType } from "../../api/weather-api/types";
import { Temperature } from "../Temperature";
import TemperatureToggle from "../TemperatureToggle";
import { WindSpeed } from "../WindSpeed";
import { Pressure } from "../Pressure";
import "./styles.scss";

const CurrentWeatherConditions = () => {
  const currentWeather = useSelector<
    AppRootStateType,
    GetWeatherResponseType | null
  >((state) => state.currentWeather.data);

  const { t } = useTranslation();

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
    { id: 1, name: t("conditions.humidity"), value: humidity, units: "%" },
    {
      id: 2,
      name: t("conditions.visibility"),
      value: visibility,
      units: t("units.km"),
    },
    { id: 3, name: t("conditions.cloudiness"), value: cloudiness, units: "%" },
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
          <span>{t("conditions.feelsLike")}</span>
          <div className="conditions-temp-container">
            {temperatureFeelsLike && (
              <Temperature temperature={temperatureFeelsLike} />
            )}
          </div>
        </div>
      </div>
      <div className="conditions-items">
        <div className="condition">
          <p className="condition-title">{t("conditions.wind")}</p>
          <WindSpeed windSpeed={windSpeed} />
        </div>
        <div className="condition">
          <p className="condition-title">{t("conditions.pressure")}</p>
          <Pressure pressure={pressure} />
        </div>
        {conditionItems}
        <TemperatureToggle />
      </div>
    </>
  );
};

export default CurrentWeatherConditions;
