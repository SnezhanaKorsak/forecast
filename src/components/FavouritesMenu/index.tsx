import React from "react";
import "./styles.scss";
import { IFavoritesMenuProps } from "./types";
import FavouriteItem from "./FavouriteItem";

const FavouritesMenu: React.FC<IFavoritesMenuProps> = (props) => {
  const { setActive } = props;

  return (
    <div className="favourites-container">
      <div className="favourites-content">
        <div className="favourites-header">
          Favourites:
          <button className="exit-btn" onClick={() => setActive(false)}>
            ×
          </button>
        </div>
        <FavouriteItem />
      </div>
    </div>
  );
};

export default FavouritesMenu;
