// SearchCard.tsx
import { useTranslation } from "react-i18next";
import { MapPin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { PhoneInfo, Step } from "./types";
import SearchSteps from "./SearchSteps";

interface SearchCardProps {
  phoneNumber: string;
  phoneInfo: PhoneInfo | null;
  steps: Step[];
  progress: number;
  totalDuration: number; // ✅ novo
  error: string | null;
}

export default function SearchCard({
  phoneNumber,
  phoneInfo,
  steps,
  progress,
  totalDuration,
  error,
}: SearchCardProps) {
  const { t } = useTranslation();

  return (
    <Card className="w-full max-w-md shadow-2xl border-0 rounded-[2rem] overflow-hidden animate-in fade-in slide-in-from-bottom-10 duration-700 backdrop-blur-sm bg-white/95">
      <CardContent className="p-8 md:p-10 text-center">
        {/* Icon */}
        <div className="flex justify-center mb-4">
          <div className="bg-[#00Cba9]/10 p-3 rounded-2xl relative">
            {/* halo leve (sem ping) */}
            <div className="absolute inset-0 rounded-2xl ring-2 ring-[#00Cba9]/15" />
            <MapPin className="relative h-6 w-6 text-[#00Cba9]" />
          </div>
        </div>

        <h2 className="text-gray-600 font-medium text-base mb-2">
          {t("searching.title")}
        </h2>

        {/* Phone number display */}
        <div className="mb-8 p-4 bg-gradient-to-br from-[#00Cba9]/5 to-[#00Cba9]/10 rounded-xl border border-[#00Cba9]/20">
          <h1
            className="text-2xl md:text-3xl font-bold text-[#00Cba9] tracking-wide break-all select-none"
            style={{ WebkitUserSelect: "none", WebkitTouchCallout: "none" }}
          >
            {phoneNumber}
          </h1>

          {phoneInfo?.data.carrier && (
            <p className="text-sm text-gray-500 mt-2">
              {phoneInfo.data.carrier}
            </p>
          )}
        </div>

        {/* Steps */}
        <SearchSteps steps={steps} />

        {/* Progress bar (mobile-friendly) */}
        <div className="space-y-2">
          <ProgressBar progress={progress} durationMs={totalDuration} />

          <div className="flex justify-between text-xs text-gray-500">
            <span>{t("searching.analyzing")}</span>
            <span className="font-semibold">{Math.floor(progress)}%</span>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
            {error}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function ProgressBar({
  progress,
  durationMs,
}: {
  progress: number;
  durationMs: number;
}) {
  const clamped = Math.max(0, Math.min(progress, 100));

  return (
    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
      <div
        className="h-full origin-left transform-gpu will-change-transform rounded-full"
        style={{
          transform: `scaleX(${clamped / 100})`,
          transition: `transform ${durationMs}ms linear`,
          backgroundImage: "linear-gradient(to right, #00Cba9, #00e0b8)",
        }}
      />
    </div>
  );
}
