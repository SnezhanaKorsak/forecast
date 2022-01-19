import React from "react";
import { FavoritesMenuProps } from "./types";
import FavouriteItem from "./FavouriteItem";
import { SidebarHeader } from "../Sidebar/SidebarHeader";

export const FavouritesMenu: React.FC<FavoritesMenuProps> = ({ setActive }) => {
  return (
    <>
      <SidebarHeader setActive={setActive}>
        <span>Favourites:</span>
      </SidebarHeader>
      <FavouriteItem />
    </>
  );
};
