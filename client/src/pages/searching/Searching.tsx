// Searching.tsx
import { useMemo } from "react";
import MapBackground from "./MapBackground";
import SearchCard from "./SearchCard";
import { useSearchProgress } from "./useSearchProgress";

export default function Searching() {
  const phoneNumber = useMemo(() => {
    return (
      new URLSearchParams(window.location.search).get("phone") ||
      "+55 84 99612-3112"
    );
  }, []);

  const { progress, steps, phoneInfo, error, totalDuration } =
    useSearchProgress(phoneNumber);

  return (
    // ⚠️ 100dvh evita bug de barra de endereço no mobile
    <div className="relative font-sans overflow-hidden bg-gray-900 min-h-[100dvh]">
      {/* Background com mapa */}
      <MapBackground phoneInfo={phoneInfo} />

      {/* Conteúdo */}
      <div className="relative z-10 flex min-h-[100dvh] flex-col items-center justify-end pb-12 md:justify-center md:pb-0 p-4">
        <SearchCard
          phoneNumber={phoneNumber}
          phoneInfo={phoneInfo}
          steps={steps}
          progress={progress}
          totalDuration={totalDuration}
          error={error}
        />
      </div>

      {/* Google Logo (branding fake) */}
      <div className="absolute bottom-4 left-4 z-10 bg-white/80 backdrop-blur-sm px-3 py-1.5 rounded-md text-xs font-bold text-gray-500 shadow-sm select-none">
        Google
      </div>

      {/* Keyframes globais usados pelo MapBackground */}
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
            transform: translateY(100dvh);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
