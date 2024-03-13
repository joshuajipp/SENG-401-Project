export default interface Location {
  latitude: number;
  longitude: number;
}

export interface LocationInfo {
  city?: string;
  province?: string;
  country?: string;
}

export interface GoogleAPILocation {
  long_name: string;
  short_name: string;
  types: string[];
}
