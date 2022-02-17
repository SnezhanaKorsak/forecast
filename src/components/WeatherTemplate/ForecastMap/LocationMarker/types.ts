import { LatLng } from "leaflet";
import { CurrentWeatherType } from "../types";

export interface LocationMarkerPropsType {
  locationWeather: CurrentWeatherType;
  position: { lat: number; lon: number };
  setPosition: (latlng: LatLng) => void;
}
