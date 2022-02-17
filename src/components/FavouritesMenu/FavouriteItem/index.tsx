import React from "react";
import "./styles.scss";
import { FavouriteItemProps } from "./types";
import { useDispatch } from "react-redux";
import {
  fetchDailyForecast,
  removeFromFavouriteLS,
} from "../../../state/forecastReducer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons/faTimes";

const FavouriteItem: React.FC<FavouriteItemProps> = ({ favouriteItem }) => {
  const dispatch = useDispatch();

  const removeFavouriteItem = () => {
    dispatch(removeFromFavouriteLS(favouriteItem.id));
  };

  const showForecast = () => {
    const { id, placeName, coordinates } = favouriteItem;
    dispatch(fetchDailyForecast(id, placeName, coordinates));
  };

  return (
    <div className="favourite-item">
      <div className="place-name" onClick={showForecast}>
        {favouriteItem.placeName}
      </div>
      <div className="exit-icon">
        <FontAwesomeIcon
          icon={faTimes}
          onClick={removeFavouriteItem}
          size={"lg"}
        />
      </div>
    </div>
  );
};

export default FavouriteItem;
