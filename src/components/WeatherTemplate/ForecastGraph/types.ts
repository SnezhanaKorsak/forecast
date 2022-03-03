import { ForecastGraphItem } from "../ForecastPanel/types";

export interface ForecastGraphProps {
  forecastGraphItems: ForecastGraphItem[];
  removeItem: (placeName: string) => void;
}

export interface ForecastData {
  [key: string]: number;
}
