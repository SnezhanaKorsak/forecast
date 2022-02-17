export interface WeatherType {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export type CoordinatesType = {
  lat: number;
  lon: number;
};

export interface MainType {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
}

export interface WindType {
  speed: number;
  deg: number;
}

export interface TempForecastType {
  day: number;
  night: number;
}

export interface SystemType {
  id: number;
  country: string;
}

export interface DailyForecastType {
  dt: number;
  temp: TempForecastType;
  feels_like: TempForecastType;
  pressure: number;
  humidity: number;
  dew_point: number;
  wind_speed: number;
  wind_deg: number;
  wind_gust: number;
  weather: WeatherType[];
  clouds: number;
}

export interface CurrentForecastType {
  dt: number;
  temp: number;
  feels_like: number;
  pressure: number;
  humidity: number;
  dew_point: number;
  clouds: number;
  visibility: number;
  wind_speed: number;
  wind_deg: number;
  wind_gust: number;
  weather: WeatherType[];
}

export interface GetWeatherResponseType {
  coord: CoordinatesType;
  weather: WeatherType[];
  main: MainType;
  visibility: number;
  wind: WindType;
  clouds: { all: number };
  dt: number;
  id: number;
  sys: SystemType;
  name: string;
}

export interface LocationForecastType {
  lat: number;
  lon: number;
  timezone: string;
  current: CurrentForecastType;
  daily: DailyForecastType[];
}
