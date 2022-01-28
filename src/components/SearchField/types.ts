export interface CoordinatesFromInputType {
  lon: number;
  lat: number;
}
export interface ZipCodeType {
  postalCode: string;
  countryCode: string;
}
export type ParamsSearchType = "cityName" | "coordinates" | "zipCode";
