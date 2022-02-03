import React from "react";
import "./styles.scss";
import { CityWeatherProps } from "./types";
import { useDispatch, useSelector } from "react-redux";
import { AppRootStateType } from "../../../state/store";
import {
  addToFavoriteLS,
  ForecastPanelType,
  removeFromFavoriteLS,
} from "../../../state/forecastReducer";
import { zonedTimeToUtc } from "date-fns-tz";
import { ConditionsType } from "../../CurrentWeatherConditions/ConditionItem/types";
import { Temperature } from "../../Temperature";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as faStarSolid } from "@fortawesome/free-solid-svg-icons/faStar";
import { faTimes } from "@fortawesome/free-solid-svg-icons/faTimes";
import { faStar } from "@fortawesome/free-regular-svg-icons/faStar";

const CityWeather: React.FC<CityWeatherProps> = ({ panelId, setActive }) => {
  const dispatch = useDispatch();

  const forecastPanels = useSelector<AppRootStateType, ForecastPanelType[]>(
    (state) => state.forecast.forecastPanels
  );

  const currentPanel = forecastPanels.find((pl) => pl.id === panelId);

  if (!currentPanel) {
    return null;
  }

  const placeName = currentPanel.placeName;
  const currentWeather = currentPanel.current;
  const isFavouriteStatus = currentPanel.isFavourite;

  // get current time
  const dt = currentWeather.dt * 1000;
  const date = new Date(dt);
  const timeZone = currentPanel.timezone;
  const zonedTime = zonedTimeToUtc(date, timeZone).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  //get current weather conditions
  const temp = currentWeather.temp;
  const windSpeed = currentWeather.wind_speed;
  const pressure = currentWeather.pressure;
  const humidity = currentWeather.humidity;
  const cloudiness = currentWeather.clouds;
  const visibility = +(currentWeather.visibility / 1000).toFixed(2);

  const currentLocationConditions: ConditionsType[] = [
    { id: 1, name: "WIND", value: windSpeed, units: "m/s" },
    { id: 2, name: "HUMIDITY", value: humidity, units: "%" },
    { id: 3, name: "VISIBILITY", value: visibility, units: "km" },
    { id: 4, name: "PRESSURE", value: pressure, units: "hPa" },
    { id: 5, name: "CLOUDINESS", value: cloudiness, units: "%" },
  ];

  const conditionsItem = currentLocationConditions.map((c) => (
    <div key={c.id} className="condition-item">
      {c.name}: {c.value} {c.units}
    </div>
  ));

  const onClickHandler = () => {
    const { id, placeName, lat, lon } = currentPanel;

    !isFavouriteStatus
      ? dispatch(addToFavoriteLS(id, placeName, { lat, lon }))
      : dispatch(removeFromFavoriteLS(id, placeName));
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
                onClick={onClickHandler}
                size={"lg"}
              />
            ) : (
              <FontAwesomeIcon
                icon={faStar}
                onClick={onClickHandler}
                size={"lg"}
              />
            )}
          </div>
          <div className={"forecast-icons"}>
            <FontAwesomeIcon
              icon={faTimes}
              onClick={() => setActive(false)}
              size={"lg"}
            />
          </div>
        </div>
      </div>
      <div className="forecast-header-container">
        <div className="forecast-conditions">{conditionsItem}</div>
        <span></span>
      </div>
    </div>
  );
};

export default CityWeather;
