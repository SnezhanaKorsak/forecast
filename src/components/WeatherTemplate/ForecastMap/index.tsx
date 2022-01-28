import React from "react";
import "./styles.scss";
import { ForecastMapProps } from "./types";

const ForecastMap: React.FC<ForecastMapProps> = ({ currentForecast }) => {
  return (
    <div className="map-container">Weather forecast in the form of a map</div>
  );
};

export default ForecastMap;
