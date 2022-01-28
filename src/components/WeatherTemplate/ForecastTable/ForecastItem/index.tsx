import React from "react";
import "./styles.scss";
import { ForecastItemProps } from "./types";

export const ForecastItem: React.FC<ForecastItemProps> = ({
  dt,
  dayTemp,
  nightTemp,
  timezone,
  iconPath,
}) => {
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
  //const activeClassName = date === today ? "forecast-item" + "active" : "forecast-item"
  const activeClassName = `forecast-item ${date === today ? "active" : ""}`;

  return (
    <div className={activeClassName}>
      <div className="date-label">{date}</div>
    </div>
  );
};
