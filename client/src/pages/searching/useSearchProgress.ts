// useSearchProgress.ts
import { useEffect, useMemo, useState, useCallback } from "react";
import { useLocation } from "wouter";
import { useTranslation } from "react-i18next";
import { PhoneInfo, Step } from "./types";

const getSearchSteps = (
  t: (key: string, options?: Record<string, string>) => string,
  region?: string,
  carrier?: string
): Step[] => [
  { text: t("searching.connecting"), status: "pending", duration: 1500 },
  {
    text: carrier
      ? t("searching.carrierIdentified", { carrier })
      : t("searching.identifying"),
    status: "pending",
    duration: 1500,
  },
  {
    text: region
      ? t("searching.triangulatingRegion", { region })
      : t("searching.triangulating"),
    status: "pending",
    duration: 2000,
  },
];

export function useSearchProgress(phoneNumber: string) {
  const { t } = useTranslation();
  const [, setLocation] = useLocation();

  const [progress, setProgress] = useState(0);
  const [steps, setSteps] = useState<Step[]>(() => getSearchSteps(t));
  const [phoneInfo, setPhoneInfo] = useState<PhoneInfo | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchPhoneInfo = useCallback(
    async (phone: string) => {
      try {
        const cleanPhone = phone.replace(/\D/g, "");
        const formattedPhone = `+${cleanPhone}`;

        const response = await fetch(
          `https://portal-cdn.geozilla.com/api/v1/phone-number-info/${formattedPhone}`
        );

        if (!response.ok) throw new Error("Failed to fetch phone info");

        const data: PhoneInfo = await response.json();
        setPhoneInfo(data);

        // Atualiza textos mantendo status
        setSteps((prev) => {
          const fresh = getSearchSteps(t, data.data.region, data.data.carrier);
          return fresh.map((s, i) => ({
            ...s,
            status: prev[i]?.status ?? "pending",
          }));
        });

        return data;
      } catch (err) {
        console.error("Error fetching phone info:", err);
        setError(t("searching.error"));
        return null;
      }
    },
    [t]
  );

  const totalDuration = useMemo(
    () => steps.reduce((sum, s) => sum + s.duration, 0),
    [steps]
  );

  useEffect(() => {
    let cancelled = false;

    setError(null);
    setPhoneInfo(null);

    const baseSteps = getSearchSteps(t);

    // Reset
    setSteps(
      baseSteps.map((s, i) => ({
        ...s,
        status: i === 0 ? "active" : "pending",
      }))
    );
    setProgress(0);

    // Fetch em paralelo
    fetchPhoneInfo(phoneNumber);

    // Sobe pra 100% uma vez (CSS anima)
    const kick = window.setTimeout(() => {
      if (!cancelled) setProgress(100);
    }, 50);

    // Steps por timeouts (poucos setState)
    const timeouts: number[] = [];
    let acc = 0;

    for (let i = 0; i < baseSteps.length; i++) {
      acc += baseSteps[i].duration;
      timeouts.push(
        window.setTimeout(() => {
          if (cancelled) return;

          setSteps((prev) =>
            prev.map((step, idx) => ({
              ...step,
              status:
                idx < i + 1
                  ? "completed"
                  : idx === i + 1
                  ? "active"
                  : "pending",
            }))
          );
        }, acc)
      );
    }

    // Navegação
    const total = baseSteps.reduce((s, x) => s + x.duration, 0);
    const nav = window.setTimeout(() => {
      if (cancelled) return;
      setLocation(`/result?phone=${encodeURIComponent(phoneNumber)}`);
    }, total + 300);

    return () => {
      cancelled = true;
      window.clearTimeout(kick);
      timeouts.forEach(window.clearTimeout);
      window.clearTimeout(nav);
    };
  }, [phoneNumber, setLocation, fetchPhoneInfo, t]);

  return { progress, steps, phoneInfo, error, totalDuration };
}
