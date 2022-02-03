import React, { useEffect } from "react";
import { FavoritesMenuProps } from "./types";
import { SidebarHeader } from "../Sidebar/SidebarHeader";
import FavouriteItem from "./FavouriteItem";
import { useDispatch, useSelector } from "react-redux";
import { AppRootStateType } from "../../state/store";
import {
  clearAllFavoritesListLS,
  FavouriteType,
  setToFavouriteListFromLS,
} from "../../state/forecastReducer";
import "./styles.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons/faTrash";

export const FavouritesMenu: React.FC<FavoritesMenuProps> = ({ setActive }) => {
  const dispatch = useDispatch();
  const favouritesList = useSelector<AppRootStateType, FavouriteType[]>(
    (state) => state.forecast.favouritesList
  );

  const favouritesCounter = localStorage.length;

  useEffect(() => {
    dispatch(setToFavouriteListFromLS());
  }, [favouritesCounter]);

  const favourites = favouritesList.map((item) => (
    <FavouriteItem key={item.id} favouriteItem={item} />
  ));

  const clearFavourites = () => {
    dispatch(clearAllFavoritesListLS());
  };

  return (
    <div>
      <SidebarHeader setActive={setActive}>
        <span className="favourite-title">
          <span>Favourites:</span>
          <div className={"trash-icon"}>
            <FontAwesomeIcon
              icon={faTrash}
              onClick={clearFavourites}
              size={"sm"}
            />
          </div>
        </span>
      </SidebarHeader>
      {favourites}
    </div>
  );
};
