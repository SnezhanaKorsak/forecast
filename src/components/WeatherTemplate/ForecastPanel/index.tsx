import React, { useEffect, useState } from "react";
import "./styles.scss";
import CityWeather from "../CityWeather";
import ForecastTable from "../ForecastTable";
import WeatherNav from "../WeatherNav";
import { ForecastPanelProps } from "./types";
import { useDispatch } from "react-redux";
import { removeForecastPanel } from "../../../state/forecastReducer";

export const ForecastPanel: React.FC<ForecastPanelProps> = ({ panelId }) => {
  const dispatch = useDispatch();

  const [active, setActive] = useState<boolean>(true);

  const removePanel = () => {
    if (!active) {
      dispatch(removeForecastPanel(panelId));
    }
  };

  return (
    <div
      className={`weather-template-container ${active ? "" : "mod-hiding"}`}
      onAnimationEnd={removePanel}
    >
      <CityWeather panelId={panelId} setActive={setActive} />
      <ForecastTable />
      <WeatherNav />
    </div>
  );
};
