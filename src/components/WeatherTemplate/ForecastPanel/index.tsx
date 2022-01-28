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

export const enum RoutePath {
  Table = "/forecast-table",
  Graph = "/forecast-graph",
  Map = "/forecast-map",
}

export const ForecastPanel: React.FC<ForecastPanelProps> = ({ panelId }) => {
  const dispatch = useDispatch();
  const forecastPanels = useSelector<AppRootStateType, ForecastPanelType[]>(
    (state) => state.forecast
  );
  const currentForecast = forecastPanels.find((pl) => pl.id === panelId);

  if (!currentForecast) {
    return null;
  }

  const [active, setActive] = useState<boolean>(true);
  const timezone = currentForecast.timezone;

  const removePanel = () => {
    if (!active) {
      dispatch(removeForecastPanel(panelId));
    }
  };

  return (
    <div
      className={`forecast-panel-container ${active ? "" : "mod-hiding"}`}
      onAnimationEnd={removePanel}
    >
      <Router>
        <CityWeather panelId={panelId} setActive={setActive} />

        <Routes>
          <Route
            path={"/"}
            element={
              <ForecastTable
                currentForecast={currentForecast}
                timezone={timezone}
              />
            }
          />

          <Route
            path={RoutePath.Table}
            element={
              <ForecastTable
                currentForecast={currentForecast}
                timezone={timezone}
              />
            }
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
