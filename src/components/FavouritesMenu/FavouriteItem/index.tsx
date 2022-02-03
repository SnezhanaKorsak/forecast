import React from "react";
import "./styles.scss";
import { FavouriteItemProps } from "./types";
import { Button } from "../../../common/Button";
import { useDispatch } from "react-redux";
import {
  fetchDailyForecast,
  removeFromFavoriteLS,
} from "../../../state/forecastReducer";

const FavouriteItem: React.FC<FavouriteItemProps> = ({ favouriteItem }) => {
  const dispatch = useDispatch();

  const removeFavouriteItem = () => {
    dispatch(removeFromFavoriteLS(favouriteItem.id, favouriteItem.placeName));
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
      <div className={"exit-btn"}>
        <Button callback={removeFavouriteItem}>
          <span>×</span>
        </Button>
      </div>
    </div>
  );
};

export default FavouriteItem;
