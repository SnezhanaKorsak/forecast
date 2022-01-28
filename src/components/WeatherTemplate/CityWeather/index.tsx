import React from "react";
import "./styles.scss";
import { Button } from "../../../common/Button";
import { CityWeatherProps } from "./types";
import { useSelector } from "react-redux";
import { AppRootStateType } from "../../../state/store";
import { ForecastPanelType } from "../../../state/forecastReducer";

const CityWeather: React.FC<CityWeatherProps> = ({ panelId, setActive }) => {
  const forecastPanels = useSelector<AppRootStateType, ForecastPanelType[]>(
    (state) => state.forecast
  );

  const currentPanel = forecastPanels.find((pl) => pl.id === panelId);

  if (!currentPanel) {
    return null;
  }
  const placeName = currentPanel.placeName;
  const currentWeather = currentPanel.current;

  return (
    <div className="forecast-header">
      <div className="forecast-label">
        <p>{placeName}</p>
        <p>11:52</p>
        <div className="buttons">
          <button className="star-btn">
            <span className="star-icon" />
          </button>
          <div className={"exit-btn"}>
            <Button callback={() => setActive(false)}>
              <span>×</span>
            </Button>
          </div>
        </div>
      </div>
      <div className="forecast-header-container">
        <div className="forecast-conditions">Weather conditions</div>
      </div>
    </div>
  );
};

export default CityWeather;
