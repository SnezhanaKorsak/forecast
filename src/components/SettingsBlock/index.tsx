import React from "react";
import "./styles.scss";
import DropdownToggle from "../DropdownToggle";
import Settings from "../Settings";
import TemperatureToggle from "../TemperatureToggle";

const SettingBlock = () => {
  return (
    <div className="settings-block">
      <TemperatureToggle />
      <DropdownToggle />
      <Settings />
    </div>
  );
};

export default SettingBlock;
