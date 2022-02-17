import React from "react";
import { Marker, Popup, useMapEvents } from "react-leaflet";
import { LocationMarkerPropsType } from "./types";
import { CurrentWeatherType } from "../types";
import { ConditionsType } from "../../../CurrentWeatherConditions/ConditionItem/types";
import "./styles.scss";
import { Temperature } from "../../../Temperature";

function getWeatherConditions(weather: CurrentWeatherType) {
  return {
    temp: weather.main.temp,
    country: weather.sys.country,
    name: weather.name,
    windSpeed: weather.wind.speed,
    pressure: weather.main.pressure,
    humidity: weather.main.humidity,
    cloudiness: weather.clouds.all,
  };
}

export const LocationMarker: React.FC<LocationMarkerPropsType> = ({
  position,
  setPosition,
  locationWeather,
}) => {
  const map = useMapEvents({
    click({ latlng }) {
      setPosition(latlng);
      map.flyTo(latlng, map.getZoom());
      map.locate();
    },
  });
  const { lat, lon: lng } = position;

  const { temp, country, name, windSpeed, pressure, humidity, cloudiness } =
    getWeatherConditions(locationWeather);

  const currentWeatherConditions: ConditionsType[] = [
    { id: 1, name: "WIND", value: windSpeed, units: "m/s" },
    { id: 2, name: "HUMIDITY", value: humidity, units: "%" },
    { id: 3, name: "PRESSURE", value: pressure, units: "hPa" },
    { id: 4, name: "CLOUDINESS", value: cloudiness, units: "%" },
  ];

  const conditionsItem = currentWeatherConditions.map((c) => (
    <div key={c.id} className="condition-item">
      {c.name}: {c.value} {c.units}
    </div>
  ));

  return (
    <Marker position={{ lat, lng }}>
      <Popup>
        <div className="popup-weather-description">
          <div className="popup-label">
            <div className="temp">
              <Temperature temperature={temp} />
            </div>
            <span>{name}</span>
          </div>
          <span>COUNTRY: {country}</span>
          {conditionsItem}
        </div>
      </Popup>
    </Marker>
  );
};
