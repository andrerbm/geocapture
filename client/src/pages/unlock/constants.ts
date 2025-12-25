import { LocationInfo, Testimonial } from "./types";

export const LOCATION_DATA: Record<string, LocationInfo> = {
  "11": { city: "São Paulo", state: "SP", operator: "Vivo" },
  "21": { city: "Rio de Janeiro", state: "RJ", operator: "Claro" },
  "31": { city: "Belo Horizonte", state: "MG", operator: "TIM" },
  "41": { city: "Curitiba", state: "PR", operator: "Vivo" },
  "51": { city: "Porto Alegre", state: "RS", operator: "Claro" },
  "61": { city: "Brasília", state: "DF", operator: "TIM" },
  "71": { city: "Salvador", state: "BA", operator: "Oi" },
  "81": { city: "Recife", state: "PE", operator: "Vivo" },
  "84": { city: "Natal", state: "RN", operator: "Claro" },
  "85": { city: "Fortaleza", state: "CE", operator: "TIM" },
  "91": { city: "Belém", state: "PA", operator: "Oi" },
  "92": { city: "Manaus", state: "AM", operator: "Vivo" },
};

export const TESTIMONIALS: Testimonial[] = [
  { name: "João", city: "São Paulo" },
  { name: "Maria", city: "Rio de Janeiro" },
  { name: "Carlos", city: "Belo Horizonte" },
  { name: "Ana", city: "Curitiba" },
  { name: "Pedro", city: "Porto Alegre" },
  { name: "Julia", city: "Brasília" },
  { name: "Roberto", city: "Salvador" },
  { name: "Fernanda", city: "Recife" },
];

export const DEFAULT_LOCATION: IPLocationData = {
  status: "success",
  lat: -5.7945,
  lon: -35.211,
  city: "Natal",
  region: "RN",
  regionName: "Rio Grande do Norte",
  country: "Brazil",
  countryCode: "BR",
};

// Re-export type for convenience
import { IPLocationData } from "./types";

