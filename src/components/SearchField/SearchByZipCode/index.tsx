import React, { useEffect, useState } from "react";
import { debounce } from "lodash";
import { useDispatch } from "react-redux";
import { getCoordinatesByZipCod } from "../../../services/location-service";
import { Button } from "../../../common/Button";
import { SearchFieldPropsType, ZipCodeType } from "../types";
import { FeaturesType } from "../../../api/geocoding-api/types";
import { AxiosError } from "axios";
import { setError } from "../../../state/appReducer";

export const SearchByZipCode: React.FC<SearchFieldPropsType> = ({
  getForecast,
}) => {
  const dispatch = useDispatch();

  const [zipCode, setZipCode] = useState<ZipCodeType>({
    postalCode: "",
    countryCode: "",
  });
  const [locationForForecast, setLocationForForecast] =
    useState<FeaturesType | null>(null);
  const [disabled, setDisabled] = useState<boolean>(true);

  useEffect(() => {
    if (
      zipCode.postalCode !== "" &&
      zipCode.postalCode.length >= 5 &&
      zipCode.countryCode !== ""
    ) {
      getCoordinatesByZipCod(
        zipCode.postalCode,
        zipCode.countryCode.toUpperCase()
      )
        .then((res) => {
          if (res) {
            setLocationForForecast(res.data.features[0]);
            setDisabled(false);
          } else {
            throw new Error("Please check the ZIP code for the search");
          }
        })
        .catch((error: AxiosError) => {
          dispatch(setError(error.message));
        });
    }
  }, [dispatch, zipCode]);

  const setZipCodeHandler = debounce(
    ({
      postalCode = zipCode.postalCode,
      countryCode = zipCode.countryCode,
    }) => {
      setZipCode({ postalCode, countryCode });
    },
    1000
  );

  const callbackHandler = () => {
    getForecast(locationForForecast);
  };

  return (
    <div className="input-button-group">
      <div className="input-group">
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
      </div>
      <Button callback={callbackHandler} disabled={disabled}>
        <span>SEARCH</span>
      </Button>
    </div>
  );
};
