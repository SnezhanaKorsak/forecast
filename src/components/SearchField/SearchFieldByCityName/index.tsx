import React, { useEffect, useState } from "react";
import { Button } from "../../../common/Button";
import { debounce } from "lodash";
import { useDispatch } from "react-redux";
import { fetchDailyForecast } from "../../../state/forecastReducer";
import { getLocationsByName } from "../../../services/location-service";
import { FeaturesType } from "../../../api/geocoding-api/types";

export const SearchFieldByCityName = () => {
  const dispatch = useDispatch();

  const [address, setAddress] = useState<string>("");
  const [locations, setLocations] = useState<FeaturesType[]>([]);
  const [locationForForecast, setLocationForForecast] =
    useState<FeaturesType | null>(null);
  const [disabled, setDisabled] = useState<boolean>(true);

  useEffect(() => {
    const selectedLocation = locations.find((f) => f.place_name === address);

    if (!selectedLocation && address !== "") {
      getLocationsByName(address).then((res) =>
        setLocations(res.data.features)
      );
      setDisabled(true);
    }

    if (selectedLocation) {
      setLocationForForecast(selectedLocation);
      setDisabled(false);
    }
  }, [dispatch, address]);

  const changeAddressHandler = debounce((value: string) => {
    setAddress(value);
  }, 1000);

  const mappedOptions = locations.map((l) => (
    <option key={l.id}>{l.place_name}</option>
  ));

  const getForecast = () => {
    if (locationForForecast) {
      const id = locationForForecast.id;
      const placeName = locationForForecast.place_name;
      const coordinates = {
        lat: locationForForecast.geometry.coordinates[1],
        lon: locationForForecast.geometry.coordinates[0],
      };
      dispatch(fetchDailyForecast(id, placeName, coordinates));
    }
  };

  return (
    <div className="input-button-group">
      <div className="input-group">
        <div>
          <input
            list="select"
            className="search-byName"
            placeholder="Enter and select from the list"
            onChange={(e) => changeAddressHandler(e.currentTarget.value)}
          />
          <datalist id="select">{mappedOptions}</datalist>
        </div>
      </div>
      <Button callback={getForecast} disabled={disabled}>
        <span>SEARCH</span>
      </Button>
    </div>
  );
};
