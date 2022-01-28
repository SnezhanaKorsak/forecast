import React from "react";
import "./styles.scss";
import { useSelector } from "react-redux";
import { AppRootStateType } from "../../state/store";
import { ForecastPanelType } from "../../state/forecastReducer";
import { ForecastPanel } from "./ForecastPanel";

const WeatherTemplate = () => {
  const forecastPanels = useSelector<AppRootStateType, ForecastPanelType[]>(
    (state) => state.forecast
  );

  const panels = forecastPanels.map((pl) => (
    <ForecastPanel key={pl.id} panelId={pl.id} />
  ));

  return <>{panels}</>;
};

export default WeatherTemplate;
