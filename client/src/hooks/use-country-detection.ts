import { useEffect, useState } from "react";
import { getCountries, type CountryCode } from "libphonenumber-js";

interface CountryDetectionResult {
  countryCode: CountryCode;
  isLoading: boolean;
}

const VALID_COUNTRIES = new Set<CountryCode>(getCountries() as CountryCode[]);
const STORAGE_KEY = "detectedCountry_v1";
const CACHE_TTL_DAYS = 7;
const API_TIMEOUT_MS = 2000;

function normalizeCountryCode(value: unknown): CountryCode | null {
  if (typeof value !== "string") return null;

  const upper = value.trim().toUpperCase();
  if (!/^[A-Z]{2}$/.test(upper)) return null;

  const code = upper as CountryCode;
  return VALID_COUNTRIES.has(code) ? code : null;
}

function readCachedCountry(): CountryCode | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;

    const parsed = JSON.parse(raw) as { country?: string; exp?: number };
    if (!parsed?.country || !parsed?.exp) return null;

    if (Date.now() > parsed.exp) {
      localStorage.removeItem(STORAGE_KEY);
      return null;
    }

    return normalizeCountryCode(parsed.country);
  } catch {
    return null;
  }
}

function writeCachedCountry(country: CountryCode): void {
  try {
    const exp = Date.now() + CACHE_TTL_DAYS * 24 * 60 * 60 * 1000;
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ country, exp }));
  } catch {
    // ignore
  }
}

/**
 * Fetch com timeout.
 * Usa AbortSignal.timeout/any quando disponível; caso contrário, cai no método clássico.
 */
async function fetchJsonWithTimeout(
  url: string,
  timeoutMs: number,
  signal: AbortSignal
): Promise<unknown> {
  // ✅ caminho moderno (mais limpo)
  const hasAbortTimeout = typeof (AbortSignal as any).timeout === "function";
  const hasAbortAny = typeof (AbortSignal as any).any === "function";

  if (hasAbortTimeout && hasAbortAny) {
    const timeoutSignal = (AbortSignal as any).timeout(
      timeoutMs
    ) as AbortSignal;
    const combined = (AbortSignal as any).any([
      signal,
      timeoutSignal,
    ]) as AbortSignal;

    const res = await fetch(url, { signal: combined });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  }

  // 🛡️ fallback compatível (Safari/ambientes antigos)
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  signal.addEventListener("abort", () => controller.abort(), { once: true });

  try {
    const res = await fetch(url, { signal: controller.signal });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } finally {
    clearTimeout(timer);
  }
}

async function detectCountry(signal: AbortSignal): Promise<CountryCode | null> {
  const tasks: Promise<CountryCode | null>[] = [
    (async () => {
      const data = await fetchJsonWithTimeout(
        "https://ipapi.co/json/",
        API_TIMEOUT_MS,
        signal
      );
      return normalizeCountryCode(
        (data as { country_code?: string })?.country_code
      );
    })(),
    (async () => {
      const data = await fetchJsonWithTimeout(
        "https://get.geojs.io/v1/ip/country.json",
        API_TIMEOUT_MS,
        signal
      );
      return normalizeCountryCode((data as { country?: string })?.country);
    })(),
  ];

  const wrapped = tasks.map((p) =>
    p.then((val) => {
      if (!val) throw new Error("invalid");
      return val;
    })
  );

  try {
    return await Promise.any(wrapped);
  } catch {
    return null;
  }
}

export function useCountryDetection(): CountryDetectionResult {
  const [countryCode, setCountryCode] = useState<CountryCode>("BR");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const cached = readCachedCountry();
    if (cached) {
      setCountryCode(cached);
      setIsLoading(false);
      return;
    }

    const controller = new AbortController();

    (async () => {
      const detected = await detectCountry(controller.signal);
      if (controller.signal.aborted) return;

      if (detected) {
        setCountryCode(detected);
        writeCachedCountry(detected);
      }

      setIsLoading(false);
    })();

    return () => controller.abort();
  }, []);

  return { countryCode, isLoading };
}
