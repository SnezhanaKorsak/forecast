import React, { useState } from "react";
import { Button } from "../../common/Button";
import "./styles.scss";
import { ParamsSearchType } from "./types";
import { SearchFieldByCoordinates } from "./SearchFieldByCoordinates";
import { SearchByZipCode } from "./SearchByZipCode";
import { SearchFieldByCityName } from "./SearchFieldByCityName";

const SearchField = () => {
  const [paramsSearch, setParamsSearch] =
    useState<ParamsSearchType>("cityName");

  const changeParamsForSearch = (value: ParamsSearchType) => {
    setParamsSearch(value);
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

      {paramsSearch === "cityName" && <SearchFieldByCityName />}

      {paramsSearch === "coordinates" && <SearchFieldByCoordinates />}

      {paramsSearch === "zipCode" && <SearchByZipCode />}
    </div>
  );
};

export default SearchField;
