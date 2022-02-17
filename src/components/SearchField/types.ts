import { FeaturesType } from "../../api/geocoding-api/types";

export interface ZipCodeType {
  postalCode: string;
  countryCode: string;
}

export interface SearchFieldPropsType {
  getForecast: (locationForForecast: FeaturesType | null) => void;
}

export type ParamsSearchType = "cityName" | "coordinates" | "zipCode";
