import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons/faTrash";
import { useTranslation } from "react-i18next";
import { SidebarHeader } from "../Sidebar/SidebarHeader";
import FavouriteItem from "./FavouriteItem";
import { AppRootStateType } from "../../state/store";
import {
  clearAllFavouritesListLS,
  FavouriteType,
  setToFavouriteListFromLS,
} from "../../state/forecastReducer";

import { FavoritesMenuProps } from "./types";
import "./styles.scss";

export const FavouritesMenu: React.FC<FavoritesMenuProps> = ({ setActive }) => {
  const dispatch = useDispatch();
  const favouritesList = useSelector<AppRootStateType, FavouriteType[]>(
    (state) => state.forecast.favouritesList
  );
  const { t } = useTranslation();

  const favouritesCounter = localStorage.length;

  useEffect(() => {
    dispatch(setToFavouriteListFromLS());
  }, [favouritesCounter]);

  const favourites = favouritesList.map((item) => (
    <FavouriteItem key={item.id} favouriteItem={item} />
  ));

  const clearFavourites = () => {
    dispatch(clearAllFavouritesListLS());
  };

  return (
    <div>
      <SidebarHeader setActive={setActive}>
        <span className="favourite-title">
          <span>{t("title.favourites")}</span>
          <div className="trash-icon">
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
