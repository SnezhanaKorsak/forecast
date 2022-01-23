export interface WeatherType {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface CoordinatesType {
  lon: number;
  lat: number;
}

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

export interface DailyForecastType {
  dt: number;
  temp: TempForecastType;
}

export interface GetWeatherResponseType {
  coordinates: CoordinatesType;
  weather: WeatherType[];
  base: string;
  main: MainType;
  visibility: number;
  wind: WindType;
  clouds: { all: number };
  dt: number;
  timezone: number;
  id: number;
  name: string;
  cod: number;
}

export interface GetForecastResponseType {
  lat: number;
  lon: number;
  timezone: string;
  daily: DailyForecastType;
  humidity: number;
  weather: WeatherType[];
}
