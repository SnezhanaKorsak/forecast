import React from "react";
import CurrentTemperature from "../CurrentTemperature";
import SearchField from "../SearchField";
import SettingBlock from "../SettingsBlock";
import "./styles.scss";
import { IHeaderProps } from "./types";
import CurrentWeatherConditions from "../CurrentWeatherConditions";

const Header = ({ title }: IHeaderProps) => {
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
