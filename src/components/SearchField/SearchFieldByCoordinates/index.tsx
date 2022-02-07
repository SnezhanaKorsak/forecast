import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchDailyForecast } from "../../../state/forecastReducer";
import { getLocationsByCoordinates } from "../../../services/location-service";
import { Button } from "../../../common/Button";
import { CoordinatesType } from "../../../api/weather-api/types";
import { debounce } from "lodash";
import { FeaturesType } from "../../../api/geocoding-api/types";
import { setError } from "../../../state/appReducer";
import { AxiosError } from "axios";

export const SearchFieldByCoordinates = () => {
  const dispatch = useDispatch();

  const [coordinatesFromInput, setCoordinatesFromInput] =
    useState<CoordinatesType | null>(null);
  const [locationForForecast, setLocationForForecast] =
    useState<FeaturesType | null>(null);
  const [disabled, setDisabled] = useState<boolean>(true);

  console.log(locationForForecast);
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

  const getForecast = () => {
    if (locationForForecast) {
      const id = locationForForecast.id;
      const placeName = locationForForecast.place_name;
      const coordinates = {
        lat: locationForForecast.geometry.coordinates[1],
        lon: locationForForecast.geometry.coordinates[0],
      };
      dispatch(fetchDailyForecast(id, placeName, coordinates));
    } else {
      dispatch(setError("Please check the coordinates for the search"));
    }
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
      <Button callback={getForecast} disabled={disabled}>
        <span>SEARCH</span>
      </Button>
    </div>
  );
};
