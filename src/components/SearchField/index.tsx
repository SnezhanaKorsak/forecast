import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { Button } from "../../common/Button";
import { ParamsSearchType } from "./types";
import { SearchFieldByCoordinates } from "./SearchFieldByCoordinates";
import { SearchByZipCode } from "./SearchByZipCode";
import { SearchFieldByCityName } from "./SearchFieldByCityName";
import { FeaturesType } from "../../api/geocoding-api/types";
import { fetchDailyForecast } from "../../state/forecastReducer";
import { setRootError } from "../../state/appReducer";
import "./styles.scss";

const SearchField = () => {
  const dispatch = useDispatch();

  const [paramsSearch, setParamsSearch] =
    useState<ParamsSearchType>("cityName");

  const { t } = useTranslation();

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
      dispatch(setRootError(t("errorMessages.search")));
    }
  };

  return (
    <div className={"search-container"}>
      <div className="button-group">
        <Button callback={() => changeParamsForSearch("cityName")}>
          <span className={paramsSearch === "cityName" ? "active" : ""}>
            {t("buttonNames.cityName")}
          </span>
        </Button>
        <Button callback={() => changeParamsForSearch("coordinates")}>
          <span className={paramsSearch === "coordinates" ? "active" : ""}>
            {t("buttonNames.coordinates")}
          </span>
        </Button>
        <Button callback={() => changeParamsForSearch("zipCode")}>
          <span className={paramsSearch === "zipCode" ? "active" : ""}>
            {t("buttonNames.ZIPCode")}
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
