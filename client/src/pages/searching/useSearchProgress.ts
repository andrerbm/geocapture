import { useEffect, useState, useCallback, useRef } from "react";
import { useLocation } from "wouter";
import { useTranslation } from "react-i18next";
import { PhoneInfo, Step } from "./types";

const getSearchSteps = (
  t: (key: string, options?: Record<string, string>) => string,
  region?: string,
  carrier?: string
): Step[] => [
  {
    text: t("searching.connecting"),
    status: "pending",
    duration: 1500,
  },
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
  const [steps, setSteps] = useState<Step[]>(getSearchSteps(t));
  const [phoneInfo, setPhoneInfo] = useState<PhoneInfo | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  // Refs para evitar re-renders desnecessários e manter valores atualizados
  const currentStepIndexRef = useRef(0);
  const animationFrameRef = useRef<number | null>(null);

  const fetchPhoneInfo = useCallback(async (phone: string) => {
    try {
      const cleanPhone = phone.replace(/\D/g, "");
      const formattedPhone = `+${cleanPhone}`;

      const response = await fetch(
        `https://portal-cdn.geozilla.com/api/v1/phone-number-info/${formattedPhone}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch phone info");
      }

      const data: PhoneInfo = await response.json();
      setPhoneInfo(data);

      // Atualizar steps com dados reais
      setSteps((prevSteps) => {
        const newSteps = getSearchSteps(t, data.data.region, data.data.carrier);
        return newSteps.map((step, idx) => ({
          ...step,
          status: prevSteps[idx]?.status || "pending",
        }));
      });

      return data;
    } catch (err) {
      console.error("Error fetching phone info:", err);
      setError(t("searching.error"));
      return null;
    }
  }, [t]);

  useEffect(() => {
    let isMounted = true;
    currentStepIndexRef.current = 0;

    const initialSteps = getSearchSteps(t);
    const totalDuration = initialSteps.reduce(
      (sum, step) => sum + step.duration,
      0
    );

    const startTime = performance.now();

    // Buscar info do telefone em paralelo
    fetchPhoneInfo(phoneNumber);

    // Ativar primeiro step imediatamente
    setSteps((prev) =>
      prev.map((step, idx) => ({
        ...step,
        status: idx === 0 ? "active" : "pending",
      }))
    );

    // Usar requestAnimationFrame para animação suave no mobile
    const animate = (currentTime: number) => {
      if (!isMounted) return;

      const elapsed = currentTime - startTime;
      const newProgress = Math.min((elapsed / totalDuration) * 100, 100);

      setProgress(newProgress);

      if (newProgress >= 100) {
        // Delay antes de navegar para dar tempo da animação completar
        setTimeout(() => {
          if (isMounted) {
            setLocation(`/result?phone=${encodeURIComponent(phoneNumber)}`);
          }
        }, 300);
        return;
      }

      // Atualizar steps baseado no tempo decorrido
      let stepTime = 0;
      for (let i = 0; i < initialSteps.length; i++) {
        stepTime += initialSteps[i].duration;

        if (elapsed >= stepTime && currentStepIndexRef.current === i) {
          currentStepIndexRef.current = i + 1;
          const newStepIndex = currentStepIndexRef.current;

          setSteps((prevSteps) =>
            prevSteps.map((step, idx) => ({
              ...step,
              status:
                idx < newStepIndex
                  ? "completed"
                  : idx === newStepIndex
                  ? "active"
                  : "pending",
            }))
          );
          break;
        }
      }

      // Continuar animação
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    // Iniciar animação
    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      isMounted = false;
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [phoneNumber, setLocation, fetchPhoneInfo, t]);

  return {
    progress,
    steps,
    phoneInfo,
    error,
  };
}

