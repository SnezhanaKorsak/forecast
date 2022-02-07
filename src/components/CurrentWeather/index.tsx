import React, { useEffect } from "react";
import "./styles.scss";
import { useDispatch, useSelector } from "react-redux";
import { fetchWeatherData } from "../../state/currentWeatherReducer";
import { fetchCityName } from "../../state/locationReducer";
import { AppRootStateType } from "../../state/store";
import { GetWeatherResponseType } from "../../api/weather-api/types";
import { Temperature } from "../Temperature";
import { Preloader } from "../../common/Preloader";
import { LoadingStatusType } from "../../state/appReducer";

const CurrentWeather = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((res) => {
      const latitude = res.coords.latitude;
      const longitude = res.coords.longitude;
      dispatch(fetchWeatherData(latitude, longitude));
      dispatch(fetchCityName(longitude, latitude));
    });
  }, []);

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
  const loadingStatus = useSelector<AppRootStateType, LoadingStatusType>(
    (state) => state.app.isLoading
  );

  if (currentWeather === null) {
    return null;
  }

  const time = new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  const temperature = currentWeather.main.temp;

  return (
    <div className="current-weather-container">
      <div className="label-container">
        <div className="label-weather">CURRENT WEATHER</div>
        <div className="label-update-time">{time}</div>
        <div className="location-name">{cityName}</div>
      </div>
      {loadingStatus === "loading-weather" ? (
        <Preloader />
      ) : (
        <div className="overview-weather-container">
          <img className="weather-icon" src={icon} alt="icon" />
          <div className="current-temp-container">
            {temperature && <Temperature temperature={temperature} />}
          </div>
        </div>
      )}
    </div>
  );
};

export default CurrentWeather;
