import { DailyForecastType } from "../../../api/weather-api/types";

export interface ForecastPanelProps {
  panelId: string;
}

export interface ForecastGraphItem {
  id: string;
  placeName: string;
  daily: DailyForecastType[];
}
