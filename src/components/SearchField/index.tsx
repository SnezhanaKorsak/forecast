import React, { useState } from "react";
import { Button } from "../../common/Button";
import "./styles.scss";
import { ParamsSearchType } from "./types";
import { SearchFieldByCoordinates } from "./SearchFieldByCoordinates";
import { SearchByZipCode } from "./SearchByZipCode";
import { SearchFieldByCityName } from "./SearchFieldByCityName";
import { FeaturesType } from "../../api/geocoding-api/types";
import { fetchDailyForecast } from "../../state/forecastReducer";
import { setError } from "../../state/appReducer";
import { useDispatch } from "react-redux";

const SearchField = () => {
  const dispatch = useDispatch();

  const [paramsSearch, setParamsSearch] =
    useState<ParamsSearchType>("cityName");

  const changeParamsForSearch = (value: ParamsSearchType) => {
    setParamsSearch(value);
  };

  const getForecast = (locationForForecast: FeaturesType | null) => {
    if (locationForForecast) {
      const id = locationForForecast.id;
      const placeName = locationForForecast.place_name;
      const coordinates = {
        lat: locationForForecast.geometry.coordinates[1],
        lon: locationForForecast.geometry.coordinates[0],
      };
      dispatch(fetchDailyForecast(id, placeName, coordinates));
    } else {
      dispatch(setError("Please  select one of the options in the list"));
    }
  };

  return (
    <div className="search-container">
      <div className="button-group">
        <Button callback={() => changeParamsForSearch("cityName")}>
          <span className={paramsSearch === "cityName" ? "active" : ""}>
            City name
          </span>
        </Button>
        <Button callback={() => changeParamsForSearch("coordinates")}>
          <span className={paramsSearch === "coordinates" ? "active" : ""}>
            Coordinates
          </span>
        </Button>
        <Button callback={() => changeParamsForSearch("zipCode")}>
          <span className={paramsSearch === "zipCode" ? "active" : ""}>
            ZIP code
          </span>
        </Button>
      </div>

      {paramsSearch === "cityName" && (
        <SearchFieldByCityName getForecast={getForecast} />
      )}

      {paramsSearch === "coordinates" && (
        <SearchFieldByCoordinates getForecast={getForecast} />
      )}

      {paramsSearch === "zipCode" && (
        <SearchByZipCode getForecast={getForecast} />
      )}
    </div>
  );
};

export default SearchField;
