import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getLocationsByCoordinates } from "../../../services/location-service";
import { Button } from "../../../common/Button";
import { CoordinatesType } from "../../../api/weather-api/types";
import { debounce } from "lodash";
import { FeaturesType } from "../../../api/geocoding-api/types";
import { setError } from "../../../state/appReducer";
import { AxiosError } from "axios";
import { SearchFieldPropsType } from "../types";

export const SearchFieldByCoordinates: React.FC<SearchFieldPropsType> = ({
  getForecast,
}) => {
  const dispatch = useDispatch();

  const [coordinatesFromInput, setCoordinatesFromInput] =
    useState<CoordinatesType | null>(null);
  const [locationForForecast, setLocationForForecast] =
    useState<FeaturesType | null>(null);
  const [disabled, setDisabled] = useState<boolean>(true);

  useEffect(() => {
    if (
      coordinatesFromInput &&
      coordinatesFromInput.lon &&
      coordinatesFromInput.lat
    ) {
      getLocationsByCoordinates({ ...coordinatesFromInput })
        .then((res) => {
          setLocationForForecast(res.data.features[0]);
          setDisabled(false);
          if (res.data.features.length === 0) {
            throw new Error("Please check the coordinates for the search");
          }
        })
        .catch((error: AxiosError) => {
          dispatch(setError(error.message));
        });
    }
  }, [dispatch, coordinatesFromInput]);

  const callbackHandler = () => {
    getForecast(locationForForecast);
  };

  const setCoordinatesHandler = debounce(
    ({ lon = coordinatesFromInput?.lon, lat = coordinatesFromInput?.lat }) => {
      setCoordinatesFromInput({ lon, lat });
    },
    1000
  );

  return (
    <div className="input-button-group">
      <div className="input-group">
        <div className="search-byCoordinates">
          <input
            placeholder="lat:"
            onChange={(e) =>
              setCoordinatesHandler({ lat: +e.currentTarget.value })
            }
          />
          <input
            placeholder="lon:"
            onChange={(e) =>
              setCoordinatesHandler({ lon: +e.currentTarget.value })
            }
          />
        </div>
      </div>
      <Button callback={callbackHandler} disabled={disabled}>
        <span>SEARCH</span>
      </Button>
    </div>
  );
};
