import React, { useEffect, useState } from "react";
import { debounce } from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { getCoordinatesByZipCod } from "../../../services/location-service";
import { Button } from "../../../common/Button";
import { FeaturesType } from "../../../api/geocoding-api/types";
import { LoadingStatusType, setRootError } from "../../../state/appReducer";
import { AppRootStateType } from "../../../state/store";
import { SearchFieldProps, ZipCodeType } from "../types";

export const SearchByZipCode: React.FC<SearchFieldProps> = ({
  getForecast,
}) => {
  const dispatch = useDispatch();

  const loadingStatus = useSelector<AppRootStateType, LoadingStatusType>(
    (state) => state.app.isLoading
  );

  const [zipCode, setZipCode] = useState<ZipCodeType>({
    postalCode: "",
    countryCode: "",
  });
  const [locationForForecast, setLocationForForecast] =
    useState<FeaturesType | null>(null);

  const [disabled, setDisabled] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  const { t } = useTranslation();

  useEffect(() => {
    if (zipCode.postalCode !== "" && zipCode.countryCode !== "") {
      setDisabled(false);
      getCoordinatesByZipCod(
        zipCode.postalCode,
        zipCode.countryCode.toUpperCase()
      ).then((res) => {
        if (res) {
          setLocationForForecast(res.data.features[0]);
        }
      });
    }
  }, [dispatch, zipCode]);

  const setZipCodeHandler = debounce(
    ({
      postalCode = zipCode.postalCode,
      countryCode = zipCode.countryCode,
    }) => {
      dispatch(setRootError(""));
      setError(false);
      setZipCode({ postalCode, countryCode });
    },
    1000
  );

  const callbackHandler = () => {
    if (locationForForecast) {
      getForecast(locationForForecast);
    } else {
      setError(true);
      dispatch(setRootError(t("errorMessages.search")));
    }
  };

  return (
    <div className="input-button-group">
      <div className="input-group">
        <div className={`search-double ${error ? "error" : ""}`}>
          <input
            placeholder={t("inputPlaceholder.postalCode")}
            onChange={(e) =>
              setZipCodeHandler({ postalCode: e.currentTarget.value })
            }
            disabled={loadingStatus !== "idle"}
          />
          <input
            placeholder={t("inputPlaceholder.countryCode")}
            onChange={(e) =>
              setZipCodeHandler({ countryCode: e.currentTarget.value })
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
