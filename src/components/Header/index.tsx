import React from "react";
import CurrentTemperature from "../CurrentWeather";
import SearchField from "../SearchField";
import SettingBlock from "../SettingsBlock";
import CurrentWeatherConditions from "../CurrentWeatherConditions";
import "./styles.scss";

const Header = () => {
  return (
    <header className="header">
      <div className="background-img" />
      <div className="root-container">
        <div className="top-container">
          <CurrentTemperature />
          <SearchField />
          <SettingBlock />
        </div>
        <div className="weather-conditions-container">
          <CurrentWeatherConditions />
        </div>
      </div>
    </header>
  );
};

export default Header;
