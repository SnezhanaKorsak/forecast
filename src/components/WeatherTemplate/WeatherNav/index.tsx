import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./styles.scss";
import { RoutePath } from "../ForecastPanel";
import { SearchFieldByCityName } from "../../SearchField/SearchFieldByCityName";
import { FeaturesType } from "../../../api/geocoding-api/types";
import { setError } from "../../../state/appReducer";
import { useDispatch } from "react-redux";
import { WeatherNavProps } from "./types";
import { getDailyWeather } from "../../../services/location-service";

const WeatherNav: React.FC<WeatherNavProps> = ({ addDailyForecast }) => {
  const dispatch = useDispatch();

  const [activeSearchField, setActiveSearchField] = useState<boolean>(false);

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
      dispatch(setError("Please check the parameters for the search"));
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
        <Link to={RoutePath.Table} onClick={() => setActiveSearchField(false)}>
          Table
        </Link>
        <Link to={RoutePath.Graph} onClick={() => setActiveSearchField(true)}>
          Graph
        </Link>
        <Link to={RoutePath.Map} onClick={() => setActiveSearchField(false)}>
          Map
        </Link>
      </div>
    </div>
  );
};

export default WeatherNav;
