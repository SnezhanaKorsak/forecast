import React, { useEffect, useState } from "react";
import { CurrentWeatherType, ForecastMapProps } from "./types";
import { LatLng } from "leaflet";
import { MapContainer, TileLayer } from "react-leaflet";
import { getCurrentWeather } from "../../../services/location-service";
import { LocationMarker } from "./LocationMarker";
import { setRootError } from "../../../state/appReducer";
import { AxiosError } from "axios";
import { useDispatch } from "react-redux";
import { Preloader } from "../../../common/Preloader";
import "./styles.scss";

const ForecastMap: React.FC<ForecastMapProps> = ({ currentForecast }) => {
  const center = {
    lat: currentForecast.lat,
    lng: currentForecast.lon,
  };
  const dispatch = useDispatch();
  const [position, setPosition] = useState<LatLng | typeof center>(center);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [locationsWeather, setLocationsWeather] = useState<
    CurrentWeatherType[]
  >([]);

  const addLocationWeather = (locationWeather: CurrentWeatherType) => {
    setLocationsWeather([...locationsWeather, locationWeather]);
  };

  useEffect(() => {
    setLoading(true);
    getCurrentWeather({ lat: position.lat, lon: position.lng })
      .then((res) => {
        addLocationWeather(res);
      })
      .catch((error: AxiosError) => {
        dispatch(setRootError(error.message));
      })
      .finally(() => {
        setLoading(false);
      });
  }, [position]);

  const markers = locationsWeather.map((location) => (
    <LocationMarker
      key={location.id}
      locationWeather={location}
      position={location.coordinates}
      setPosition={setPosition}
    />
  ));

  return (
    <>
      {isLoading ? (
        <Preloader />
      ) : (
        <MapContainer center={position} zoom={7} className="map-container">
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {markers}
        </MapContainer>
      )}
    </>
  );
};

export default ForecastMap;
