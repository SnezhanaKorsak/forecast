import React, { useState } from "react";
import { FavouritesMenu } from "../FavouritesMenu";
import Sidebar from "../Sidebar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-regular-svg-icons/faStar";

const DropdownToggle = () => {
  const [activeMode, setActiveMode] = useState<boolean>(false);

  const onActiveMode = () => setActiveMode(!activeMode);

  return (
    <div>
      <div className="star-menu-icons">
        <FontAwesomeIcon icon={faStar} onClick={onActiveMode} size={"2x"} />
      </div>
      <Sidebar active={activeMode} setActive={setActiveMode}>
        <FavouritesMenu setActive={setActiveMode} />
      </Sidebar>
    </div>
  );
};

export default DropdownToggle;
