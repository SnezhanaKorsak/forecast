import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { zonedTimeToUtc } from "date-fns-tz";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as faStarSolid } from "@fortawesome/free-solid-svg-icons/faStar";
import { faTimes } from "@fortawesome/free-solid-svg-icons/faTimes";
import { faStar } from "@fortawesome/free-regular-svg-icons/faStar";
import { useTranslation } from "react-i18next";
import { AppRootStateType } from "../../../state/store";
import {
  addToFavouriteLS,
  ForecastPanelType,
  removeFromFavouriteLS,
} from "../../../state/forecastReducer";
import { Temperature } from "../../Temperature";
import { WindSpeed } from "../../WindSpeed";
import { Pressure } from "../../Pressure";
import { getTranslatedCityName } from "../../../services/location-service";
import { CityWeatherProps } from "./types";
import { ConditionsType } from "../../CurrentWeatherConditions/ConditionItem/types";
import { CurrentForecastType } from "../../../api/weather-api/types";
import "./styles.scss";
function getWeatherConditions(weather: CurrentForecastType) {
  return {
    temp: weather.temp,
    windSpeed: weather.wind_speed,
    pressure: weather.pressure,
    humidity: weather.humidity,
    cloudiness: weather.clouds,
    visibility: +(weather.visibility / 1000).toFixed(2),
  };
}

const CityWeather: React.FC<CityWeatherProps> = ({ panelId, setActive }) => {
  const dispatch = useDispatch();

  const forecastPanels = useSelector<AppRootStateType, ForecastPanelType[]>(
    (state) => state.forecast.forecastPanels
  );

  const { t } = useTranslation();
  const currentLanguage = localStorage.getItem("i18nextLng");

  const currentPanel = forecastPanels.find((pl) => pl.id === panelId);
  const [placeName, setPlaceName] = useState(
    currentPanel ? currentPanel.placeName : ""
  );

  useEffect(() => {
    const { lon, lat } = currentPanel || { lon: 0, lat: 0 };
    getTranslatedCityName({ lon, lat }).then((res) =>
      setPlaceName(res.data.features[0].place_name)
    );
  }, [currentLanguage, currentPanel]);

  if (!currentPanel) {
    return null;
  }

  const currentWeather = currentPanel.current;
  const isFavouriteStatus = currentPanel.isFavourite;

  const dt = currentWeather.dt * 1000;
  const date = new Date(dt);
  const timeZone = currentPanel.timezone;
  const zonedTime = zonedTimeToUtc(date, timeZone).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  const { temp, windSpeed, pressure, humidity, cloudiness, visibility } =
    getWeatherConditions(currentWeather);

  const currentLocationConditions: ConditionsType[] = [
    { id: 1, name: t("conditions.humidity"), value: humidity, units: "%" },
    {
      id: 2,
      name: t("conditions.visibility"),
      value: visibility,
      units: t("units.km"),
    },
    { id: 3, name: t("conditions.cloudiness"), value: cloudiness, units: "%" },
  ];

  const conditionsItem = currentLocationConditions.map((c) => (
    <div key={c.id} className="condition-item">
      <span className="condition-title">{c.name}:</span>
      <span>
        {c.value} {c.units}
      </span>
    </div>
  ));

  const onClickHandler = (placeName: string) => {
    const { id, lat, lon } = currentPanel;

    !isFavouriteStatus
      ? dispatch(addToFavouriteLS(id, placeName, { lat, lon }))
      : dispatch(removeFromFavouriteLS(id));
  };

  const favouriteClassName = isFavouriteStatus
    ? "forecast-icons favourite"
    : "forecast-icons";

  return (
    <div className="forecast-header">
      <div className="forecast-label">
        <div>{placeName}</div>
        <div className="forecast-temp">
          {temp && <Temperature temperature={temp} />}
        </div>
        <div className="forecast-time">{zonedTime}</div>

        <div className="buttons">
          <div className={favouriteClassName}>
            {isFavouriteStatus ? (
              <FontAwesomeIcon
                icon={faStarSolid}
                onClick={() => onClickHandler(placeName)}
                size={"lg"}
              />
            ) : (
              <FontAwesomeIcon
                icon={faStar}
                onClick={() => onClickHandler(placeName)}
                size={"lg"}
              />
            )}
          </div>
          <div className="forecast-icons">
            <FontAwesomeIcon
              icon={faTimes}
              onClick={() => setActive(false)}
              size={"lg"}
            />
          </div>
        </div>
      </div>
      <div className="forecast-header-container">
        <div className="forecast-conditions">
          <div className="condition-item">
            <p className="condition-title">{t("conditions.wind") + ":"}</p>
            <WindSpeed windSpeed={windSpeed} />
          </div>
          <div className="condition-item">
            <p className="condition-title">{t("conditions.pressure") + ":"}</p>
            <Pressure pressure={pressure} />
          </div>
          {conditionsItem}
        </div>
      </div>
    </div>
  );
};

export default CityWeather;
