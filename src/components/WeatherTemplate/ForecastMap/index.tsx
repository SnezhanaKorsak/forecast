import React, { useEffect, useState } from "react";
import "./styles.scss";
import { CurrentWeatherType, ForecastMapProps } from "./types";
import { LatLng } from "leaflet";
import { MapContainer, TileLayer } from "react-leaflet";
import { getCurrentWeather } from "../../../services/location-service";
import { LocationMarker } from "./LocationMarker";

const ForecastMap: React.FC<ForecastMapProps> = ({ currentForecast }) => {
  const center = {
    lat: currentForecast.lat,
    lng: currentForecast.lon,
  };

  const [position, setPosition] = useState<LatLng | typeof center>(center);
  const [locationsWeather, setLocationsWeather] = useState<
    CurrentWeatherType[]
  >([]);

  const addLocationWeather = (locationWeather: CurrentWeatherType) => {
    setLocationsWeather([...locationsWeather, locationWeather]);
  };

  useEffect(() => {
    getCurrentWeather({ lat: position.lat, lon: position.lng }).then((res) => {
      addLocationWeather(res);
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
    <MapContainer center={center} zoom={7} className="map-container">
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {markers}
    </MapContainer>
  );
};

export default ForecastMap;
