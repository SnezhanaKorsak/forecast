import React from "react";
import DropdownToggle from "../DropdownToggle";
import SettingsToggle from "./SettingsToggle";
import "./styles.scss";

const SettingBlock = () => {
  return (
    <div className="settings-block">
      <DropdownToggle />
      <SettingsToggle />
    </div>
  );
};

export default SettingBlock;
