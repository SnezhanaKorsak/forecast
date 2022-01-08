import React, { useState } from "react";
import "./styles.scss";
import FavoritesMenu from "../FavouritesMenu";

const DropdownToggle = () => {
  const [activeMode, setActiveMode] = useState(false);

  const onActiveMode = () => setActiveMode(!activeMode);

  return (
    <div>
      <button className="favourites-open-btn" onClick={onActiveMode}>
        <span />
      </button>
      {activeMode && <FavoritesMenu setActive={setActiveMode} />}
    </div>
  );
};

export default DropdownToggle;
