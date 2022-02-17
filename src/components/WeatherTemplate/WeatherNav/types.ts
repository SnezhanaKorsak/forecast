import { DailyForecastType } from "../../../api/weather-api/types";

export interface WeatherNavProps {
  addDailyForecast: (
    id: string,
    placeName: string,
    daily: DailyForecastType[]
  ) => void;
}
