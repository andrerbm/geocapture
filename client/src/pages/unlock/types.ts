export interface IPLocationData {
  status: string;
  lat?: number;
  lon?: number;
  city?: string;
  region?: string;
  regionName?: string;
  country?: string;
  countryCode?: string;
}

export interface LocationInfo {
  city: string;
  state: string;
  operator: string;
}

export interface Testimonial {
  name: string;
  city: string;
}

