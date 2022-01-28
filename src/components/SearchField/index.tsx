import React, { useEffect, useState } from "react";
import "./styles.scss";
import { Button } from "../../common/Button";
import { debounce } from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { LocationType, setSelectedLocation } from "../../state/locationReducer";
import { AppRootStateType } from "../../state/store";
import { CustomSelect } from "../../common/CustomSelect";
import { fetchDailyForecast } from "../../state/forecastReducer";
import { FeaturesType } from "../../api/geocoding-api/types";
import {
  getCoordinatesByZipCod,
  getLocationsByCoordinates,
  getLocationsByName,
} from "../../services/location-service";
import {
  CoordinatesFromInputType,
  ParamsSearchType,
  ZipCodeType,
} from "./types";

const SearchField = () => {
  const [address, setAddress] = useState<string>("");
  const [locations, setLocations] = useState<FeaturesType[]>([]);
  const [coordinatesFromInput, setCoordinatesFromInput] =
    useState<CoordinatesFromInputType>({ lon: 0, lat: 0 });
  const [zipCode, setZipCode] = useState<ZipCodeType>({
    postalCode: "",
    countryCode: "",
  });
  const [paramsSearch, setParamsSearch] =
    useState<ParamsSearchType>("cityName");
  const [disabled, setDisabled] = useState<boolean>(true);

  const dispatch = useDispatch();
  const locationForForecast = useSelector<
    AppRootStateType,
    LocationType | null
  >((state) => state.location.location);

  /* useEffect(() => {
         const selectedLocation = locations.find(f => f.place_name === address)
         //call services   / call api
         if (!selectedLocation && address !== '') {
             dispatch(getVariantsLocation(address))
             setDisabled(true)
         }

         if (selectedLocation) {
             const longitude = selectedLocation.geometry.coordinates[0]
             const latitude = selectedLocation.geometry.coordinates[1]

             dispatch(setCoordinates(longitude, latitude))
             setDisabled(false)
         }
     }, [address])*/

  useEffect(() => {
    const selectedLocation = locations.find((f) => f.place_name === address);

    if (!selectedLocation && address !== "") {
      getLocationsByName(address).then((res) =>
        setLocations(res.data.features)
      );
      setDisabled(true);
    }

    if (selectedLocation) {
      dispatch(setSelectedLocation(selectedLocation));
      setDisabled(false);
    }
  }, [dispatch, address]);

  useEffect(() => {
    if (coordinatesFromInput.lon && coordinatesFromInput.lat) {
      getLocationsByCoordinates({ ...coordinatesFromInput }).then((res) =>
        dispatch(setSelectedLocation(res.data.features[0]))
      );
    }
  }, [dispatch, coordinatesFromInput]);

  useEffect(() => {
    if (
      zipCode.postalCode !== "" &&
      zipCode.postalCode.length >= 5 &&
      zipCode.countryCode !== ""
    ) {
      getCoordinatesByZipCod(
        zipCode.postalCode,
        zipCode.countryCode.toUpperCase()
      ).then((res) => {
        if (res) {
          dispatch(setSelectedLocation(res.data.features[0]));
        }
      });
    }
  }, [dispatch, zipCode]);

  useEffect(() => {
    if (paramsSearch !== "cityName") {
      setDisabled(false);
    }
  }, [paramsSearch]);

  const getForecast = () => {
    if (locationForForecast) {
      dispatch(fetchDailyForecast(locationForForecast));
    }
  };

  const changeParamsForSearch = (value: ParamsSearchType) => {
    setParamsSearch(value);
  };

  const changeAddressHandler = debounce((value: string) => {
    setAddress(value);
  }, 1000);

  const setCoordinatesHandler = debounce(
    ({ lon = coordinatesFromInput.lon, lat = coordinatesFromInput.lat }) => {
      setCoordinatesFromInput({ lon, lat });
    },
    1000
  );

  const setZipCodeHandler = debounce(
    ({
      postalCode = zipCode.postalCode,
      countryCode = zipCode.countryCode,
    }) => {
      setZipCode({ postalCode, countryCode });
    },
    1000
  );

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
      <div className="input-button-group">
        <div className="input-group">
          {paramsSearch === "cityName" && (
            <div>
              <input
                list="select"
                className="search-byName"
                placeholder="Enter and select from the list"
                onChange={(e) => changeAddressHandler(e.currentTarget.value)}
              />
              <CustomSelect options={locations} />
            </div>
          )}

          {paramsSearch === "coordinates" && (
            <div className="search-byCoordinates">
              <input
                placeholder="lat:"
                onChange={(e) =>
                  setCoordinatesHandler({ lat: e.currentTarget.value })
                }
              />
              <input
                placeholder="lon:"
                onChange={(e) =>
                  setCoordinatesHandler({ lon: e.currentTarget.value })
                }
              />
            </div>
          )}

          {paramsSearch === "zipCode" && (
            <div className="search-byCoordinates">
              <input
                placeholder="Postal code:"
                onChange={(e) =>
                  setZipCodeHandler({ postalCode: e.currentTarget.value })
                }
              />
              <input
                placeholder="Country code:"
                onChange={(e) =>
                  setZipCodeHandler({ countryCode: e.currentTarget.value })
                }
              />
            </div>
          )}
        </div>
        <Button callback={getForecast} disabled={disabled}>
          <span>SEARCH</span>
          {disabled && (
            <div className="block-hidden">Please select a location</div>
          )}
        </Button>
      </div>
    </div>
  );
};

export default SearchField;
