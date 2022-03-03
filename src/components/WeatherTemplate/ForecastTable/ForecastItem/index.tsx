import React, { useEffect, useState } from "react";
import { Temperature } from "../../../Temperature";
import { Preloader } from "../../../../common/Preloader";
import { ForecastItemProps } from "./types";
import "./styles.scss";

export const ForecastItem: React.FC<ForecastItemProps> = ({
  dt,
  dayTemp,
  nightTemp,
  icon,
}) => {
  const currentLanguage = localStorage.getItem("i18nextLng");
  const [language, setLanguage] = useState<string>("en");

  useEffect(() => {
    if (currentLanguage) {
      setLanguage(currentLanguage);
    }
  }, [currentLanguage]);

  const date = new Date(dt * 1000).toLocaleString(language, {
    day: "numeric",
    month: "2-digit",
    weekday: "short",
  });

  const today = new Date(Date.now()).toLocaleString("en", {
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
