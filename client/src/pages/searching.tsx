import { useEffect, useState, useCallback, useMemo } from "react";
import { useLocation } from "wouter";
import { useTranslation } from "react-i18next";
import { CheckCircle2, Loader2, MapPin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

import mapImage from "@assets/generated_images/top_down_view_of_a_digital_map_interface.png";

// ============================================
// TIPOS
// ============================================

interface PhoneInfo {
  request_id: string;
  data: {
    phone_number: string;
    country: string;
    region: string;
    carrier: string;
    timezone: string;
    type: "MOBILE" | "LANDLINE" | "VOIP";
  };
}

interface Step {
  text: string;
  status: "pending" | "active" | "completed";
  duration: number;
}

// ============================================
// FUNÇÃO PARA GERAR STEPS DINÂMICOS
// ============================================

const getSearchSteps = (
  t: (key: string, options?: any) => string,
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

// ============================================
// COMPONENTE PRINCIPAL
// ============================================

export default function Searching() {
  const { t } = useTranslation();
  const [_, setLocation] = useLocation();
  const [progress, setProgress] = useState(0);
  const [steps, setSteps] = useState<Step[]>(getSearchSteps(t));
  const [phoneInfo, setPhoneInfo] = useState<PhoneInfo | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Extrair telefone da URL
  const phoneNumber = useMemo(() => {
    return (
      new URLSearchParams(window.location.search).get("phone") ||
      "+55 84 99612-3112"
    );
  }, []);

  // ============================================
  // BUSCAR INFO DO TELEFONE (API REAL)
  // ============================================

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

      // ✨ ATUALIZAR STEPS COM DADOS REAIS
      setSteps((prevSteps) => {
        const newSteps = getSearchSteps(t, data.data.region, data.data.carrier);
        // Preservar o status atual dos steps
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

  // ============================================
  // ANIMAÇÃO DE PROGRESSO COM STEPS
  // ============================================

  useEffect(() => {
    let isMounted = true;
    let currentStepIndex = 0;
    
    const initialSteps = getSearchSteps(t);
    const totalDuration = initialSteps.reduce(
      (sum, step) => sum + step.duration,
      0
    );
    
    const startTime = Date.now();

    // Buscar info do telefone em paralelo
    fetchPhoneInfo(phoneNumber);

    // Ativar primeiro step imediatamente
    setSteps((prev) =>
      prev.map((step, idx) => ({
        ...step,
        status: idx === 0 ? "active" : "pending",
      }))
    );

    const progressInterval = setInterval(() => {
      if (!isMounted) return;

      const elapsed = Date.now() - startTime;
      const newProgress = Math.min((elapsed / totalDuration) * 100, 100);

      setProgress(newProgress);

      if (newProgress >= 100) {
        clearInterval(progressInterval);
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

        if (elapsed >= stepTime && currentStepIndex === i) {
          currentStepIndex = i + 1;

          setSteps((prevSteps) =>
            prevSteps.map((step, idx) => ({
              ...step,
              status:
                idx < currentStepIndex
                  ? "completed"
                  : idx === currentStepIndex
                  ? "active"
                  : "pending",
            }))
          );
          break;
        }
      }
    }, 30);

    return () => {
      isMounted = false;
      clearInterval(progressInterval);
    };
  }, [phoneNumber, setLocation, fetchPhoneInfo, t]);

  // ============================================
  // MAPAS DINÂMICOS (baseado na região)
  // ============================================

  const mapStyle = useMemo(() => {
    if (!phoneInfo) return {};

    const regionColors: Record<string, string> = {
      "Rio Grande do Norte": "hue-rotate-15",
      "São Paulo": "saturate-50",
      "Rio de Janeiro": "brightness-110",
    };

    return {
      filter: regionColors[phoneInfo.data.region] || "",
    };
  }, [phoneInfo]);

  // ============================================
  // RENDER
  // ============================================

  return (
    <div className="min-h-screen relative font-sans overflow-hidden bg-gray-900">
      {/* Enhanced Map Background */}
      <div className="absolute inset-0 z-0">
        <img
          src={mapImage}
          alt="Map Background"
          className="w-full h-full object-cover opacity-60 brightness-75 transition-all duration-1000"
          style={mapStyle}
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-gray-900/50"></div>

        {/* Animated scanning lines */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div
            className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#00Cba9]/50 to-transparent"
            style={{
              animation: "scan 3s ease-in-out infinite",
            }}
          />
          <div
            className="absolute top-1/3 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00Cba9]/30 to-transparent"
            style={{
              animation: "scan 4s ease-in-out infinite",
              animationDelay: "1s",
            }}
          />
        </div>

        {/* Pulsing location markers */}
        <div className="absolute inset-0 pointer-events-none">
          {[
            { top: "25%", left: "25%", size: "w-3 h-3", delay: "0s" },
            { top: "50%", right: "33%", size: "w-2 h-2", delay: "0.5s" },
            { bottom: "33%", left: "50%", size: "w-2.5 h-2.5", delay: "1s" },
          ].map((marker, idx) => (
            <div
              key={idx}
              className={`absolute ${marker.size} bg-[#00Cba9] rounded-full animate-ping`}
              style={{
                top: marker.top,
                left: marker.left,
                right: marker.right,
                bottom: marker.bottom,
                animationDelay: marker.delay,
                opacity: 0.6 - idx * 0.2,
              }}
            />
          ))}
        </div>

        {/* Região detectada (quando disponível) */}
        {phoneInfo && (
          <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm px-4 py-2 rounded-lg border border-[#00Cba9]/30 animate-in fade-in slide-in-from-right duration-500">
            <div className="flex items-center gap-2 text-white text-sm">
              <MapPin className="w-4 h-4 text-[#00Cba9]" />
              <div>
                <div className="font-semibold">{phoneInfo.data.region}</div>
                <div className="text-xs text-gray-300">
                  {phoneInfo.data.country} • {phoneInfo.data.type}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-end pb-12 md:justify-center md:pb-0 p-4">
        <Card className="w-full max-w-md shadow-2xl border-0 rounded-[2rem] overflow-hidden animate-in fade-in slide-in-from-bottom-10 duration-700 backdrop-blur-sm bg-white/95">
          <CardContent className="p-8 md:p-10 text-center">
            {/* Icon */}
            <div className="flex justify-center mb-4">
              <div className="bg-[#00Cba9]/10 p-3 rounded-2xl relative">
                <MapPin className="h-6 w-6 text-[#00Cba9]" />
                {/* Pulse ring ao redor do ícone */}
                <div className="absolute inset-0 rounded-2xl bg-[#00Cba9]/20 animate-ping" />
              </div>
            </div>

            <h2 className="text-gray-600 font-medium text-base mb-2">
              {t("searching.title")}
            </h2>

            {/* Phone number display */}
            <div className="mb-8 p-4 bg-gradient-to-br from-[#00Cba9]/5 to-[#00Cba9]/10 rounded-xl border border-[#00Cba9]/20">
              <h1 className="text-2xl md:text-3xl font-bold text-[#00Cba9] tracking-wide break-all">
                {phoneNumber}
              </h1>

              {/* Mostrar operadora quando disponível */}
              {phoneInfo?.data.carrier && (
                <p className="text-sm text-gray-500 mt-2">
                  {phoneInfo.data.carrier}
                </p>
              )}
            </div>

            {/* Steps com melhor feedback visual */}
            <div className="space-y-6 text-left mb-8">
              {steps.map((step, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 transition-all duration-300"
                >
                  {step.status === "completed" ? (
                    <div className="bg-[#00Cba9] rounded-full p-0.5 animate-in zoom-in duration-300">
                      <CheckCircle2 className="h-4 w-4 text-white" />
                    </div>
                  ) : step.status === "active" ? (
                    <div className="bg-[#00Cba9]/20 rounded-full p-0.5 relative">
                      <Loader2 className="h-4 w-4 text-[#00Cba9] animate-spin" />
                      <div className="absolute inset-0 rounded-full bg-[#00Cba9]/30 animate-ping" />
                    </div>
                  ) : (
                    <div className="bg-gray-100 rounded-full p-0.5">
                      <div className="h-4 w-4 rounded-full border-2 border-gray-300" />
                    </div>
                  )}

                  <span
                    className={`text-sm font-medium transition-colors duration-300 ${
                      step.status === "completed"
                        ? "text-gray-700"
                        : step.status === "active"
                        ? "text-[#00Cba9] font-semibold"
                        : "text-gray-400"
                    }`}
                  >
                    {step.text}
                  </span>
                </div>
              ))}
            </div>

            {/* Progress bar com animação suave */}
            <div className="space-y-2">
              <Progress
                value={progress}
                className="h-2 bg-gray-100 [&>div]:bg-gradient-to-r [&>div]:from-[#00Cba9] [&>div]:to-[#00e0b8] [&>div]:transition-all [&>div]:duration-300"
              />
              <div className="flex justify-between text-xs text-gray-500">
                <span>{t("searching.analyzing")}</span>
                <span className="font-semibold">{Math.floor(progress)}%</span>
              </div>
            </div>

            {/* Erro (se houver) */}
            {error && (
              <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
                {error}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Google Logo */}
      <div className="absolute bottom-4 left-4 z-10 bg-white/80 backdrop-blur-sm px-3 py-1.5 rounded-md text-xs font-bold text-gray-500 shadow-sm">
        Google
      </div>

      {/* Keyframes CSS */}
      <style>{`
        @keyframes scan {
          0% {
            transform: translateY(-100%);
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            transform: translateY(100vh);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
