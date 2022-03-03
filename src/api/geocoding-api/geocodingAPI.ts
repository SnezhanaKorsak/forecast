import axios from "axios";
import { getCurrentLanguage } from "../api-helpers";
import { GeocodingResponseType } from "./types";

const APIkey =
  "pk.eyJ1Ijoic25lemhhbmEyOCIsImEiOiJja3liZHo0NjIwZW9jMzBvZDY0MjdveXVtIn0.Z9GOZIEWFStUHnAT-COL2g";

const instance = axios.create({
  baseURL: "https://api.mapbox.com/geocoding/v5/mapbox.places/",
});

export const geocodingAPI = {
  searchByForwardGeocoding(value: string) {
    const currentLanguage = getCurrentLanguage();

    return instance.get<GeocodingResponseType>(
      `${value}.json?language=${currentLanguage}&access_token=${APIkey}`
    );
  },
  searchPlaceByCoordinates(longitude: number, latitude: number) {
    const currentLanguage = getCurrentLanguage();

    return instance.get<GeocodingResponseType>(
      `${longitude},${latitude}.json?types=place&language=${currentLanguage}&access_token=${APIkey}`
    );
  },
};
