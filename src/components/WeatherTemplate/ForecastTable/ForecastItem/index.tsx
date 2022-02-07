import React from "react";
import "./styles.scss";
import { ForecastItemProps } from "./types";
import { Temperature } from "../../../Temperature";
import { useSelector } from "react-redux";
import { AppRootStateType } from "../../../../state/store";
import { LoadingStatusType } from "../../../../state/appReducer";
import { Preloader } from "../../../../common/Preloader";

export const ForecastItem: React.FC<ForecastItemProps> = ({
  dt,
  dayTemp,
  nightTemp,
  icon,
}) => {
  const loadingStatus = useSelector<AppRootStateType, LoadingStatusType>(
    (state) => state.app.isLoading
  );

  const date = new Date(dt * 1000).toLocaleString("en-GB", {
    day: "numeric",
    month: "2-digit",
    weekday: "short",
  });

  const today = new Date(Date.now()).toLocaleString("en-GB", {
    day: "numeric",
    month: "2-digit",
    weekday: "short",
  });

  const activeClassName = `forecast-item ${date === today ? "active" : ""}`;

  return (
    <div className={activeClassName}>
      <div className="date-label">{date}</div>
      <div className="forecast-summary">
        <div className="forecast-icon">
          {icon ? (
            <img
              src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
              alt="icon"
            />
          ) : (
            <Preloader />
          )}
        </div>
        <div className="forecast-temp-block">
          {dayTemp && <Temperature temperature={dayTemp} />}
          {nightTemp && <Temperature temperature={nightTemp} />}
        </div>
      </div>
    </div>
  );
};
