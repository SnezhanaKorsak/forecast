import React, { useState } from "react";
import "./styles.scss";
import CityWeather from "../CityWeather";
import ForecastTable from "../ForecastTable";
import WeatherNav from "../WeatherNav";
import { ForecastGraphItemType, ForecastPanelProps } from "./types";
import { useDispatch, useSelector } from "react-redux";
import {
  ForecastPanelType,
  removeForecastPanel,
} from "../../../state/forecastReducer";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ForecastGraph from "../ForecastGraph";
import ForecastMap from "../ForecastMap";
import { AppRootStateType } from "../../../state/store";
import { DailyForecastType } from "../../../api/weather-api/types";

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

  const currentForecast = forecastPanels.find((pl) => pl.id === panelId);

  if (!currentForecast) {
    return null;
  }

  const [active, setActive] = useState<boolean>(true);
  const [forecastGraphItems, setForecastGraphItems] = useState<
    ForecastGraphItemType[]
  >([
    {
      id: currentForecast.id,
      placeName: currentForecast.placeName,
      daily: currentForecast.daily,
    },
  ]);

  const removePanel = () => {
    if (!active) {
      dispatch(removeForecastPanel(panelId));
    }
  };

  const addDailyForecast = (
    id: string,
    placeName: string,
    daily: DailyForecastType[]
  ) => {
    const newForecastGraphItem: ForecastGraphItemType = {
      id,
      placeName,
      daily,
    };
    !forecastGraphItems.find((item) => item.id === id) &&
      setForecastGraphItems([...forecastGraphItems, newForecastGraphItem]);
  };

  const removeItemForecast = (placeName: string) => {
    setForecastGraphItems(
      forecastGraphItems.filter(
        (item) => item.placeName.split(",")[0] !== placeName
      )
    );
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
            element={
              <ForecastGraph
                forecastGraphItems={forecastGraphItems}
                removeItem={removeItemForecast}
              />
            }
          />
          <Route
            path={RoutePath.Map}
            element={<ForecastMap currentForecast={currentForecast} />}
          />
        </Routes>

        <WeatherNav addDailyForecast={addDailyForecast} />
      </Router>
    </div>
  );
};
