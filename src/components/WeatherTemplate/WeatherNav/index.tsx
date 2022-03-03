import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "./styles.scss";
import { RoutePath } from "../ForecastPanel";
import { SearchFieldByCityName } from "../../SearchField/SearchFieldByCityName";
import { FeaturesType } from "../../../api/geocoding-api/types";
import { setRootError } from "../../../state/appReducer";
import { useDispatch } from "react-redux";
import { WeatherNavProps } from "./types";
import { getDailyWeather } from "../../../services/location-service";
import { useTranslation } from "react-i18next";

const WeatherNav: React.FC<WeatherNavProps> = ({ addDailyForecast }) => {
  const dispatch = useDispatch();

  const [activeSearchField, setActiveSearchField] = useState<boolean>(false);
  const { t } = useTranslation();

  useEffect(() => {
    const url = window.location.toString();
    if (url.indexOf(RoutePath.Graph) > 0) {
      setActiveSearchField(true);
    }
  }, []);

  const getForecastForOtherLocations = (
    locationForForecast: FeaturesType | null
  ) => {
    if (locationForForecast) {
      const { id, place_name: placeName } = locationForForecast;
      const coordinates = {
        lat: locationForForecast.geometry.coordinates[1],
        lon: locationForForecast.geometry.coordinates[0],
      };
      getDailyWeather({ ...coordinates }).then((res) =>
        addDailyForecast(id, placeName, res)
      );
    } else {
      dispatch(setRootError(t("errorMessages.search")));
    }
  };

  return (
    <div className="nav-container">
      {activeSearchField && (
        <div className="field-compare">
          <SearchFieldByCityName getForecast={getForecastForOtherLocations} />
        </div>
      )}
      <div className="nav-link">
        <NavLink
          to={RoutePath.Table}
          onClick={() => setActiveSearchField(false)}
          className={({ isActive }) => (isActive ? "active" : "inactive")}
        >
          {t("buttonNames.table")}
        </NavLink>
        <NavLink
          to={RoutePath.Graph}
          onClick={() => setActiveSearchField(true)}
        >
          {t("buttonNames.graph")}
        </NavLink>
        <NavLink to={RoutePath.Map} onClick={() => setActiveSearchField(false)}>
          {t("buttonNames.worldMap")}
        </NavLink>
      </div>
    </div>
  );
};

export default WeatherNav;
