import { useState, useEffect } from "react";
import { CountryCode } from "libphonenumber-js";

// Mapeamento de códigos ISO de país para códigos do libphonenumber-js
// Se o código não estiver mapeado, usa o próprio código como fallback
const countryCodeMap: Record<string, CountryCode> = {
  BR: "BR",
  US: "US",
  GB: "GB",
  CA: "CA",
  AU: "AU",
  DE: "DE",
  FR: "FR",
  IT: "IT",
  ES: "ES",
  PT: "PT",
  MX: "MX",
  AR: "AR",
  CL: "CL",
  CO: "CO",
  PE: "PE",
  VE: "VE",
  EC: "EC",
  BO: "BO",
  PY: "PY",
  UY: "UY",
  CN: "CN",
  JP: "JP",
  KR: "KR",
  IN: "IN",
  ID: "ID",
  PH: "PH",
  VN: "VN",
  TH: "TH",
  MY: "MY",
  SG: "SG",
  RU: "RU",
  UA: "UA",
  PL: "PL",
  RO: "RO",
  NL: "NL",
  BE: "BE",
  CZ: "CZ",
  GR: "GR",
  SE: "SE",
  HU: "HU",
  AT: "AT",
  CH: "CH",
  BG: "BG",
  DK: "DK",
  FI: "FI",
  SK: "SK",
  NO: "NO",
  IE: "IE",
  HR: "HR",
  BA: "BA",
  RS: "RS",
  LT: "LT",
  SI: "SI",
  LV: "LV",
  EE: "EE",
  ZA: "ZA",
  EG: "EG",
  NG: "NG",
  KE: "KE",
  MA: "MA",
  TN: "TN",
  GH: "GH",
  DZ: "DZ",
  AO: "AO",
  UG: "UG",
  ET: "ET",
  TZ: "TZ",
  TR: "TR",
  SA: "SA",
  AE: "AE",
  IL: "IL",
  IQ: "IQ",
  IR: "IR",
  PK: "PK",
  BD: "BD",
  NZ: "NZ",
  FJ: "FJ",
};

/**
 * Converte código ISO de país para código do libphonenumber-js
 * Se não encontrar mapeamento, tenta usar o código diretamente
 */
function mapCountryCode(isoCode: string): CountryCode | null {
  // Se já está mapeado, retorna
  if (countryCodeMap[isoCode]) {
    return countryCodeMap[isoCode];
  }
  
  // Tenta usar o código diretamente (pode funcionar para muitos países)
  // Valida se é um código válido de 2 letras
  if (isoCode && isoCode.length === 2 && /^[A-Z]{2}$/.test(isoCode)) {
    return isoCode as CountryCode;
  }
  
  return null;
}

interface CountryDetectionResult {
  countryCode: CountryCode;
  isLoading: boolean;
  error: string | null;
}

/**
 * Hook para detectar o país do usuário baseado no IP
 * Usa múltiplas APIs como fallback para garantir confiabilidade
 */
export function useCountryDetection(): CountryDetectionResult {
  const [countryCode, setCountryCode] = useState<CountryCode>("BR");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const detectCountry = async () => {
      // Verificar se já está salvo no localStorage
      const savedCountry = localStorage.getItem("detectedCountry");
      if (savedCountry) {
        const mappedCode = mapCountryCode(savedCountry);
        if (mappedCode) {
          if (isMounted) {
            setCountryCode(mappedCode);
            setIsLoading(false);
          }
          return;
        }
      }

      // Tentar múltiplas APIs como fallback
      const apis = [
        // API 1: ipapi.co (gratuita, 1000 req/dia)
        async () => {
          const response = await fetch("https://ipapi.co/json/");
          if (!response.ok) throw new Error("API 1 failed");
          const data = await response.json();
          return data.country_code;
        },
        // API 2: ip-api.com (gratuita, sem autenticação)
        async () => {
          const response = await fetch("http://ip-api.com/json/?fields=countryCode");
          if (!response.ok) throw new Error("API 2 failed");
          const data = await response.json();
          return data.countryCode;
        },
        // API 3: geojs.io (gratuita)
        async () => {
          const response = await fetch("https://get.geojs.io/v1/ip/country.json");
          if (!response.ok) throw new Error("API 3 failed");
          const data = await response.json();
          return data.country;
        },
      ];

      // Tentar cada API sequencialmente
      for (const api of apis) {
        try {
          const code = await api();
          if (code) {
            const mappedCode = mapCountryCode(code);
            if (mappedCode) {
              if (isMounted) {
                setCountryCode(mappedCode);
                setIsLoading(false);
                // Salvar no localStorage para próximas visitas
                localStorage.setItem("detectedCountry", mappedCode);
              }
              return;
            }
          }
        } catch (err) {
          // Continuar para próxima API
          continue;
        }
      }

      // Se todas as APIs falharem, usar BR como padrão
      if (isMounted) {
        setCountryCode("BR");
        setIsLoading(false);
        setError("Não foi possível detectar o país. Usando Brasil como padrão.");
      }
    };

    detectCountry();

    return () => {
      isMounted = false;
    };
  }, []);

  return { countryCode, isLoading, error };
}

