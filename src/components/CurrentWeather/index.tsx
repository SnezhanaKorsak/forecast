import React, { useEffect } from "react";
import "./styles.scss";
import { useDispatch, useSelector } from "react-redux";
import { fetchWeatherData } from "../../state/currentWeatherReducer";
import { fetchCityName } from "../../state/locationReducer";
import { AppRootStateType } from "../../state/store";
import { GetWeatherResponseType } from "../../api/weather-api/types";
import { Temperature } from "../Temperature";

const CurrentWeather = () => {
  const dispatch = useDispatch();

  const currentWeather = useSelector<
    AppRootStateType,
    GetWeatherResponseType | null
  >((state) => state.currentWeather.data);
  const icon = useSelector<AppRootStateType, string>(
    (state) => state.currentWeather.icon
  );
  const cityName = useSelector<AppRootStateType, string>(
    (state) => state.location.currentCity
  );
  const time = new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  const temperature = currentWeather && currentWeather?.main.temp;

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((res) => {
      const latitude = res.coords.latitude;
      const longitude = res.coords.longitude;
      dispatch(fetchWeatherData(latitude, longitude));
      dispatch(fetchCityName(longitude, latitude));
    });
  }, []);

  return (
    <div className="current-weather-container">
      <div className="label-container">
        <div className="label-weather">CURRENT WEATHER</div>
        <div className="label-update-time">{time}</div>
        <div className="location-name">{cityName}</div>
      </div>
      <div className="overview-weather-container">
        <img className="weather-icon" src={icon} alt="icon" />
        <Temperature temperatureInKelvin={temperature} role="-current" />
      </div>
    </div>
  );
};

export default CurrentWeather;
