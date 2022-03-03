import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons/faTimes";
import { useDispatch } from "react-redux";
import {
  fetchDailyForecast,
  removeFromFavouriteLS,
} from "../../../state/forecastReducer";
import { getTranslatedCityName } from "../../../services/location-service";
import { FavouriteItemProps } from "./types";
import "./styles.scss";

const FavouriteItem: React.FC<FavouriteItemProps> = ({ favouriteItem }) => {
  const dispatch = useDispatch();

  const currentLanguage = localStorage.getItem("i18nextLng");
  const [placeName, setPlaceName] = useState(favouriteItem.placeName);

  useEffect(() => {
    const { lon, lat } = favouriteItem.coordinates;
    getTranslatedCityName({ lon, lat }).then((res) =>
      setPlaceName(res.data.features[0].place_name)
    );
  }, [currentLanguage]);

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
        {placeName}
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
