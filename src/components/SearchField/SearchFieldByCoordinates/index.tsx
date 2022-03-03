import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AxiosError } from "axios";
import { debounce } from "lodash";
import { useTranslation } from "react-i18next";
import { getLocationsByCoordinates } from "../../../services/location-service";
import { Button } from "../../../common/Button";
import { CoordinatesType } from "../../../api/weather-api/types";
import { FeaturesType } from "../../../api/geocoding-api/types";
import { LoadingStatusType, setRootError } from "../../../state/appReducer";
import { AppRootStateType } from "../../../state/store";
import { SearchFieldProps } from "../types";

export const SearchFieldByCoordinates: React.FC<SearchFieldProps> = ({
  getForecast,
}) => {
  const dispatch = useDispatch();

  const loadingStatus = useSelector<AppRootStateType, LoadingStatusType>(
    (state) => state.app.isLoading
  );

  const [coordinatesFromInput, setCoordinatesFromInput] =
    useState<CoordinatesType | null>(null);
  const [locationForForecast, setLocationForForecast] =
    useState<FeaturesType | null>(null);
  const [disabled, setDisabled] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  const { t } = useTranslation();

  useEffect(() => {
    if (coordinatesFromInput?.lon && coordinatesFromInput?.lat) {
      setDisabled(false);
      getLocationsByCoordinates({ ...coordinatesFromInput })
        .then((res) => {
          if (res.data.features.length !== 0) {
            setLocationForForecast(res.data.features[0]);
          }
        })
        .catch((error: AxiosError) => {
          dispatch(setRootError(error.message));
        });
    }
  }, [dispatch, coordinatesFromInput, loadingStatus]);

  const callbackHandler = () => {
    if (locationForForecast) {
      getForecast(locationForForecast);
    } else {
      setError(true);
      dispatch(setRootError(t("errorMessages.search")));
    }
  };

  const setCoordinatesHandler = debounce(
    ({ lon = coordinatesFromInput?.lon, lat = coordinatesFromInput?.lat }) => {
      dispatch(setRootError(""));
      setError(false);
      setCoordinatesFromInput({ lon, lat });
    },
    1000
  );

  return (
    <div className="input-button-group">
      <div className="input-group">
        <div className={`search-double ${error ? "error" : ""}`}>
          <input
            placeholder={t("inputPlaceholder.lat")}
            onChange={(e) =>
              setCoordinatesHandler({ lat: +e.currentTarget.value })
            }
            disabled={loadingStatus !== "idle"}
          />
          <input
            placeholder={t("inputPlaceholder.lon")}
            onChange={(e) =>
              setCoordinatesHandler({ lon: +e.currentTarget.value })
            }
            disabled={loadingStatus !== "idle"}
          />
        </div>
      </div>
      <Button
        callback={callbackHandler}
        disabled={disabled || loadingStatus !== "idle"}
      >
        <span>{t("buttonNames.search")}</span>
      </Button>
    </div>
  );
};
