import React, { useState } from "react";
import "./styles.scss";
import CityWeather from "../CityWeather";
import ForecastTable from "../ForecastTable";
import WeatherNav from "../WeatherNav";
import { ForecastPanelProps } from "./types";
import { useDispatch, useSelector } from "react-redux";
import {
  ForecastPanelType,
  removeForecastPanel,
} from "../../../state/forecastReducer";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ForecastGraph from "../ForecastGraph";
import ForecastMap from "../ForecastMap";
import { AppRootStateType } from "../../../state/store";

export enum RoutePath {
  Table = "/forecast-table",
  Graph = "/forecast-graph",
  Map = "/forecast-map",
}

export const ForecastPanel: React.FC<ForecastPanelProps> = ({ panelId }) => {
  const dispatch = useDispatch();
  const forecastPanels = useSelector<AppRootStateType, ForecastPanelType[]>(
    (state) => state.forecast.forecastPanels
  );

  const [active, setActive] = useState<boolean>(true);

  const currentForecast = forecastPanels.find((pl) => pl.id === panelId);

  if (!currentForecast) {
    return null;
  }

  const removePanel = () => {
    if (!active) {
      dispatch(removeForecastPanel(panelId));
    }
  };

  return (
    <div
      className={`forecast-panel ${active ? "" : "mod-hiding"}`}
      onAnimationEnd={removePanel}
    >
      <Router>
        <CityWeather panelId={panelId} setActive={setActive} />

        <Routes>
          <Route
            path={"/"}
            element={<ForecastTable currentForecast={currentForecast} />}
          />

          <Route
            path={RoutePath.Table}
            element={<ForecastTable currentForecast={currentForecast} />}
          />
          <Route
            path={RoutePath.Graph}
            element={<ForecastGraph currentForecast={currentForecast} />}
          />
          <Route
            path={RoutePath.Map}
            element={<ForecastMap currentForecast={currentForecast} />}
          />
        </Routes>

        <WeatherNav />
      </Router>
    </div>
  );
};
