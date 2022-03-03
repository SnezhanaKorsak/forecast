import React, { useState } from "react";
import { useSelector } from "react-redux";
import CurrentWeather from "../CurrentWeather";
import SearchField from "../SearchField/index";
import SettingBlock from "../SettingsBlock";
import CurrentWeatherConditions from "../CurrentWeatherConditions";
import { AppRootStateType } from "../../state/store";
import { CollapsedToggle } from "../../common/CollapsedToggle";
import "./styles.scss";

const Header = () => {
  const theme = useSelector<AppRootStateType, string>(
    (state) => state.theme.themes
  );
  const [isCollapsed, setCollapsed] = useState(false);

  const collapsedHandler = () => {
    setCollapsed(!isCollapsed);
  };

  return (
    <div className="header-container">
      <header className={"header"}>
        {theme !== "dark" && <div className="background-img" />}
        <div className="root-container">
          <div className="top-container">
            <CurrentWeather />
            <SearchField />
            <SettingBlock />
          </div>
          <div className={`weather-conditions-container`}>
            {!isCollapsed && <CurrentWeatherConditions />}
          </div>
        </div>
      </header>
      <div className={`header-toggle ${!isCollapsed ? "mod-hiding" : ""}`}>
        <CollapsedToggle callback={collapsedHandler} />
      </div>
    </div>
  );
};

export default Header;
