import React, { useState } from "react";
import "./styles.scss";
import { FavouritesMenu } from "../FavouritesMenu";
import Sidebar from "../Sidebar";

const DropdownToggle = () => {
  const [activeMode, setActiveMode] = useState<boolean>(false);

  const onActiveMode = () => setActiveMode(!activeMode);

  return (
    <div>
      <button className="toggle-btn" onClick={onActiveMode}>
        <span className="star-icon" />
      </button>
      <Sidebar active={activeMode} setActive={setActiveMode}>
        <FavouritesMenu setActive={setActiveMode} />
      </Sidebar>
    </div>
  );
};

export default DropdownToggle;
