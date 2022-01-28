import React from "react";
import { Link } from "react-router-dom";
import "./styles.scss";
import { RoutePath } from "../ForecastPanel";

const WeatherNav = () => {
  return (
    <div className="nav-container">
      <div className="nav-link">
        <Link to={RoutePath.Table}>Table</Link>
        <Link to={RoutePath.Graph}>Graph</Link>
        <Link to={RoutePath.Map}>Map</Link>
      </div>
    </div>
  );
};

export default WeatherNav;
