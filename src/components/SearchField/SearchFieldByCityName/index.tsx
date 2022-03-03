import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { debounce } from "lodash";
import { AxiosError } from "axios";
import { useTranslation } from "react-i18next";
import { Button } from "../../../common/Button";
import { getLocationsByName } from "../../../services/location-service";
import { FeaturesType } from "../../../api/geocoding-api/types";
import { LoadingStatusType, setRootError } from "../../../state/appReducer";
import { AppRootStateType } from "../../../state/store";
import { SearchFieldProps } from "../types";

export const SearchFieldByCityName: React.FC<SearchFieldProps> = ({
  getForecast,
}) => {
  const dispatch = useDispatch();

  const [address, setAddress] = useState<string>("");
  const [locations, setLocations] = useState<FeaturesType[]>([]);
  const [locationForForecast, setLocationForForecast] =
    useState<FeaturesType | null>(null);
  const [disabled, setDisabled] = useState<boolean>(true);
  const [active, setActive] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const loadingStatus = useSelector<AppRootStateType, LoadingStatusType>(
    (state) => state.app.isLoading
  );

  const { t } = useTranslation();

  useEffect(() => {
    const selectedLocation = locations.find((f) => f.place_name === address);
    if (!selectedLocation && address !== "") {
      setDisabled(false);
      getLocationsByName(address)
        .then((res) => {
          if (res.data.features.length !== 0) {
            setLocations(res.data.features);
          }
        })
        .catch((error: AxiosError) => {
          dispatch(setRootError(error.message));
        });
    }

    if (selectedLocation) {
      setLocationForForecast(selectedLocation);
    }
  }, [dispatch, address]);

  const changeAddressHandler = debounce((value: string) => {
    setError(false);
    setAddress(value);
  }, 1000);

  const mappedOptions = locations.map((l) => (
    <option key={l.id}>{l.place_name}</option>
  ));

  const callbackHandler = () => {
    if (locationForForecast) {
      getForecast(locationForForecast);
    } else {
      setError(true);
      dispatch(setRootError(t("errorMessages.search")));
    }
  };

  const list = active ? "select-active" : "select";

  return (
    <div className="input-button-group">
      <div className="input-group">
        <div className={`search-single ${error ? "error" : ""}`}>
          <input
            list={list}
            placeholder={t("inputPlaceholder.cityName")}
            onFocus={() => setActive(true)}
            onBlur={() => setActive(false)}
            onChange={(e) => changeAddressHandler(e.currentTarget.value)}
            disabled={loadingStatus !== "idle"}
          />
          <datalist id={list}>{mappedOptions}</datalist>
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
