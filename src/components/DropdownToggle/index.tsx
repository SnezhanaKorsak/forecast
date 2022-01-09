import React, { useState } from "react";
import { Transition, CSSTransition } from "react-transition-group";
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
      <CSSTransition
        in={activeMode}
        timeout={{ enter: 300, exit: 2000 }}
        classNames="favourites-container"
        unmountOnExit
      >
        <FavoritesMenu setActive={setActiveMode} />
      </CSSTransition>
      {/*<FavoritesMenu active={activeMode} setActive={setActiveMode} />*/}
    </div>
  );
};

export default DropdownToggle;
