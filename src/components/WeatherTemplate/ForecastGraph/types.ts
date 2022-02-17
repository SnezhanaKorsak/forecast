import { ForecastGraphItemType } from "../ForecastPanel/types";

export interface ForecastGraphProps {
  forecastGraphItems: ForecastGraphItemType[];
  removeItem: (placeName: string) => void;
}

export interface ForecastData {
  [x: string]: number;
}
