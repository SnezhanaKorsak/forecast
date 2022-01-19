import React, { useState } from "react";
import "./styles.scss";
import Sidebar from "../../Sidebar";
import { SettingsMenu } from "../SettingsMenu";

const SettingsToggle = () => {
  const [activeMode, setActiveMode] = useState<boolean>(false);

  const onActiveMode = () => setActiveMode(!activeMode);

  return (
    <div>
      <button className="toggle-btn" onClick={onActiveMode}>
        <span className="burger-icon" />
      </button>
      <Sidebar active={activeMode} setActive={setActiveMode}>
        <SettingsMenu setActive={setActiveMode} />
      </Sidebar>
    </div>
  );
};

export default SettingsToggle;
