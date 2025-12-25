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

  const { progress, steps, phoneInfo, error } = useSearchProgress(phoneNumber);

  return (
    <div className="min-h-screen relative font-sans overflow-hidden bg-gray-900">
      <MapBackground phoneInfo={phoneInfo} />

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-end pb-12 md:justify-center md:pb-0 p-4">
        <SearchCard
          phoneNumber={phoneNumber}
          phoneInfo={phoneInfo}
          steps={steps}
          progress={progress}
          error={error}
        />
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

