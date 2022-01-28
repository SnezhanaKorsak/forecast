import { ForecastPanelType } from "../../../state/forecastReducer";

export interface ForecastTableProps {
  currentForecast: ForecastPanelType;
  timezone: string;
}
