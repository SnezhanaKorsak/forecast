import React, { useEffect, useState } from "react";
import "./styles.scss";
import { Button } from "../../common/Button";
import { debounce } from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { getVariantsLocation } from "../../state/locationReducer";
import { AppRootStateType } from "../../state/store";
import { FeaturesType } from "../../api/geocoding-api/types";
import { CustomSelect } from "../../common/CustomSelect";

const SearchField = () => {
  const [address, setAddress] = useState("");
  const [coordinates, setCoordinates] = useState<number[]>([]);

  const dispatch = useDispatch();
  const locations = useSelector<AppRootStateType, FeaturesType[]>(
    (state) => state.location.variantsLocations
  );

  console.log(locations);

  useEffect(() => {
    if (address !== "" && locations.length === 0) {
      dispatch(getVariantsLocation(address));
    } else if (locations.length >= 1) {
      const selectedLocation = locations.find((f) => f.place_name === address);

      if (selectedLocation) {
        setCoordinates(selectedLocation.geometry.coordinates);
      }
    }
  }, [address, locations]);

  const searchByCityName = () => {
    console.log("City Name");
  };
  const searchByCoordinates = () => {
    console.log("Coordinates");
  };
  const searchByZIPCode = () => {
    console.log("ZIP code");
  };

  const getForecastForOtherCity = () => {
    console.log("SEARCH");
  };

  const changeAdressHandler = debounce((value: string) => {
    setAddress(value);
  }, 1000);

  return (
    <div className="search-container">
      <div className="button-group">
        <Button callback={searchByCityName}>
          <span>City name</span>
        </Button>
        <Button callback={searchByCoordinates}>
          <span>Coordinates</span>
        </Button>
        <Button callback={searchByZIPCode}>
          <span>ZIP code</span>
        </Button>
      </div>
      <div className="input-button-group">
        <div className="input-group">
          <input
            list="select"
            onChange={(e) => changeAdressHandler(e.currentTarget.value)}
          />
          <CustomSelect options={locations} />
        </div>
        <Button callback={getForecastForOtherCity}>
          <span>SEARCH</span>
        </Button>
      </div>
    </div>
  );
};

export default SearchField;
