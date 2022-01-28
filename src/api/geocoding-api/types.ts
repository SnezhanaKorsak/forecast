export interface FeaturesType {
  id: string;
  place_name: string;
  geometry: {
    type: string;
    coordinates: number[];
  };
}

export interface GeocodingResponseType {
  features: FeaturesType[];
}
