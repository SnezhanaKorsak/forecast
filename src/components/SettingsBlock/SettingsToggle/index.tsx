import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons/faBars";
import Sidebar from "../../Sidebar";
import { SettingsMenu } from "../SettingsMenu";

const SettingsToggle = () => {
  const [activeMode, setActiveMode] = useState<boolean>(false);

  const onActiveMode = () => setActiveMode(!activeMode);

  return (
    <div>
      <div className="star-menu-icons">
        <FontAwesomeIcon icon={faBars} onClick={onActiveMode} size={"2x"} />
      </div>
      <Sidebar active={activeMode} setActive={setActiveMode}>
        <SettingsMenu setActive={setActiveMode} />
      </Sidebar>
    </div>
  );
};

export default SettingsToggle;
