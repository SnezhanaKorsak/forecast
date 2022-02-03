import React from "react";
import CurrentWeather from "../CurrentWeather";
import SearchField from "../SearchField/index";
import SettingBlock from "../SettingsBlock";
import CurrentWeatherConditions from "../CurrentWeatherConditions";
import "./styles.scss";

const Header = () => {
  return (
    <header className="header">
      <div className="background-img" />
      <div className="root-container">
        <div className="top-container">
          <CurrentWeather />
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
