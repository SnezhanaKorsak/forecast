import React from "react";
import "./styles.scss";
import { ForecastGraphProps } from "./types";

const ForecastGraph: React.FC<ForecastGraphProps> = ({ currentForecast }) => {
  return (
    <div className="graph-container">
      Weather forecast in the form of a graph
    </div>
  );
};

export default ForecastGraph;
