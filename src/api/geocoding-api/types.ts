export interface FeaturesType {
  id: string;
  place_type: string[];
  relevance: number;
  text: string;
  place_name: string;
  center: number[];
  geometry: {
    type: string;
    coordinates: number[];
  };
}

export interface GeocodingResponseType {
  features: FeaturesType[];
}
