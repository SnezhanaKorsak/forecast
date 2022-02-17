import { ForecastPanelType } from "../../../state/forecastReducer";
import {
  CoordinatesType,
  MainType,
  SystemType,
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
  sys: SystemType;
  name: string;
}
