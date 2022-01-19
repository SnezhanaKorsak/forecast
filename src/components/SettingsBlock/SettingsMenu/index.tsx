import React from "react";
import { SidebarHeader } from "../../Sidebar/SidebarHeader";
import { SettingsMenuProps } from "./types";
import TemperatureToggle from "../../TemperatureToggle";

export const SettingsMenu: React.FC<SettingsMenuProps> = ({ setActive }) => {
  return (
    <>
      <SidebarHeader setActive={setActive}>
        <span>Settings:</span>
      </SidebarHeader>
      <TemperatureToggle />
    </>
  );
};
