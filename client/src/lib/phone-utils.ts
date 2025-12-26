import {
  AsYouType,
  parsePhoneNumberWithError,
  CountryCode,
  getCountries,
  getCountryCallingCode,
  getExampleNumber,
} from "libphonenumber-js";
import examples from "libphonenumber-js/mobile/examples";
import * as flags from "country-flag-icons/react/3x2";

// =============================================================================
// Types
// =============================================================================

export type Country = {
  code: CountryCode;
  name: string;
  dialCode: string;
  FlagComponent?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

// =============================================================================
// Constants
// =============================================================================

const countryNames: Record<string, string> = {
  US: "United States",
  GB: "United Kingdom",
  CA: "Canada",
  AU: "Australia",
  DE: "Germany",
  FR: "France",
  IT: "Italy",
  ES: "Spain",
  PT: "Portugal",
  BR: "Brazil",
  MX: "Mexico",
  AR: "Argentina",
  CL: "Chile",
  CO: "Colombia",
  PE: "Peru",
  VE: "Venezuela",
  EC: "Ecuador",
  BO: "Bolivia",
  PY: "Paraguay",
  UY: "Uruguay",
  CN: "China",
  JP: "Japan",
  KR: "South Korea",
  IN: "India",
  ID: "Indonesia",
  PH: "Philippines",
  VN: "Vietnam",
  TH: "Thailand",
  MY: "Malaysia",
  SG: "Singapore",
  RU: "Russia",
  UA: "Ukraine",
  PL: "Poland",
  RO: "Romania",
  NL: "Netherlands",
  BE: "Belgium",
  CZ: "Czech Republic",
  GR: "Greece",
  SE: "Sweden",
  HU: "Hungary",
  AT: "Austria",
  CH: "Switzerland",
  BG: "Bulgaria",
  DK: "Denmark",
  FI: "Finland",
  SK: "Slovakia",
  NO: "Norway",
  IE: "Ireland",
  HR: "Croatia",
  BA: "Bosnia and Herzegovina",
  RS: "Serbia",
  LT: "Lithuania",
  SI: "Slovenia",
  LV: "Latvia",
  EE: "Estonia",
  ZA: "South Africa",
  EG: "Egypt",
  NG: "Nigeria",
  KE: "Kenya",
  MA: "Morocco",
  TN: "Tunisia",
  GH: "Ghana",
  DZ: "Algeria",
  AO: "Angola",
  UG: "Uganda",
  ET: "Ethiopia",
  TZ: "Tanzania",
  TR: "Turkey",
  SA: "Saudi Arabia",
  AE: "UAE",
  IL: "Israel",
  IQ: "Iraq",
  IR: "Iran",
  PK: "Pakistan",
  BD: "Bangladesh",
  NZ: "New Zealand",
  FJ: "Fiji",
};

export const countries: Country[] = getCountries()
  .map((code) => {
    const countryCode = code as CountryCode;
    const FlagComponent = (
      flags as Record<
        string,
        React.ComponentType<React.SVGProps<SVGSVGElement>>
      >
    )[countryCode];

    return {
      code: countryCode,
      name: countryNames[countryCode] || countryCode,
      dialCode: `+${getCountryCallingCode(countryCode)}`,
      FlagComponent,
    };
  })
  .sort((a, b) => a.name.localeCompare(b.name));

// =============================================================================
// Phone Helpers (pure functions)
// =============================================================================

export const getMaxLength = (country: CountryCode): number => {
  try {
    const exampleNumber = getExampleNumber(country, examples);
    if (exampleNumber) {
      return exampleNumber.nationalNumber.length;
    }
  } catch {
    // ignore
  }
  return 15;
};

export const formatPhoneNumber = (value: string, country: CountryCode): string => {
  try {
    if (!value || value.trim() === "") return "";

    const digitsOnly = value.replace(/\D/g, "");
    if (!digitsOnly) return "";

    const maxLength = getMaxLength(country);
    const limitedDigits = digitsOnly.slice(0, maxLength);

    if (!limitedDigits) return "";

    const formatter = new AsYouType(country);
    const formatted = formatter.input(limitedDigits);

    return formatted || limitedDigits;
  } catch {
    const digitsOnly = value.replace(/\D/g, "");
    return digitsOnly.slice(0, getMaxLength(country));
  }
};

export const isValidPhoneNumber = (phone: string, country: CountryCode): boolean => {
  if (!phone || phone.trim() === "") return false;

  try {
    const parsed = parsePhoneNumberWithError(phone, country);
    return parsed.isValid();
  } catch {
    return false;
  }
};

export { parsePhoneNumberWithError, type CountryCode };

