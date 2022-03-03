import { ForecastPanelType } from "../../../state/forecastReducer";
import {
  CoordinatesType,
  MainType,
  CountryItem,
  WindType,
} from "../../../api/weather-api/types";

export interface ForecastMapProps {
  currentForecast: ForecastPanelType;
}

export interface CurrentWeatherType {
  id: number;
  coordinates: CoordinatesType;
  main: MainType;
  wind: WindType;
  clouds: { all: number };
  sys: CountryItem;
  name: string;
}
