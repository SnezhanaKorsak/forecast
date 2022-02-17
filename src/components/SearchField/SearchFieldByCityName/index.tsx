import React, { useEffect, useState } from "react";
import { Button } from "../../../common/Button";
import { debounce } from "lodash";
import { useDispatch } from "react-redux";
import { getLocationsByName } from "../../../services/location-service";
import { FeaturesType } from "../../../api/geocoding-api/types";
import { AxiosError } from "axios";
import { setError } from "../../../state/appReducer";
import { SearchFieldPropsType } from "../types";

export const SearchFieldByCityName: React.FC<SearchFieldPropsType> = ({
  getForecast,
}) => {
  const dispatch = useDispatch();

  const [address, setAddress] = useState<string>("");
  const [locations, setLocations] = useState<FeaturesType[]>([]);
  const [locationForForecast, setLocationForForecast] =
    useState<FeaturesType | null>(null);
  const [disabled, setDisabled] = useState<boolean>(true);
  const [active, setActive] = useState<boolean>(false);

  useEffect(() => {
    const selectedLocation = locations.find((f) => f.place_name === address);
    if (!selectedLocation && address !== "") {
      getLocationsByName(address)
        .then((res) => {
          setLocations(res.data.features);
          if (res.data.features.length === 0) {
            throw new Error("Please check the address for the search");
          }
        })
        .catch((error: AxiosError) => {
          dispatch(setError(error.message));
        });
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

  const callbackHandler = () => {
    getForecast(locationForForecast);
  };

  const list = active ? "select-active" : "select";

  return (
    <div className="input-button-group">
      <div className="input-group">
        <div>
          <input
            list={list}
            className="search-byName"
            placeholder="Enter and select from the list"
            onFocus={() => setActive(true)}
            onBlur={() => setActive(false)}
            onChange={(e) => changeAddressHandler(e.currentTarget.value)}
          />
          <datalist id={list}>{mappedOptions}</datalist>
        </div>
      </div>
      <Button callback={callbackHandler} disabled={disabled}>
        <span>SEARCH</span>
      </Button>
    </div>
  );
};
