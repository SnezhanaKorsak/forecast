import React from "react";
import "./styles.scss";
import DropdownToggle from "../DropdownToggle";
import SettingsToggle from "./SettingsToggle";

const SettingBlock = () => {
  return (
    <div className="settings-block">
      <DropdownToggle />
      <SettingsToggle />
    </div>
  );
};

export default SettingBlock;
