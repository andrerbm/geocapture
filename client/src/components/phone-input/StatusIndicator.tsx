import { memo } from "react";
import { useTranslation } from "react-i18next";

interface StatusIndicatorProps {
  isValid: boolean;
  showInvalid: boolean;
  isHero: boolean;
}

const StatusIndicator = memo(function StatusIndicator({
  isValid,
  showInvalid,
  isHero,
}: StatusIndicatorProps) {
  const { t } = useTranslation();

  if (!isValid && !showInvalid) return null;

  return (
    <div
      className={`flex ${
        isHero ? "justify-end" : "justify-center"
      } items-center animate-in fade-in slide-in-from-top-1 duration-200`}
    >
      {isValid ? (
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200">
          <div className="relative flex items-center justify-center">
            <div className="absolute w-5 h-5 bg-emerald-400/20 rounded-full animate-ping" />
            <svg
              className="relative w-4 h-4 text-emerald-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <span className="text-xs font-semibold text-emerald-700">
            {t("hero.available")}
          </span>
        </div>
      ) : (
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-50 border border-red-200 animate-in fade-in zoom-in-95 duration-200">
          <div className="flex items-center justify-center w-4 h-4 rounded-full bg-red-100">
            <svg
              className="w-3 h-3 text-red-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
          <span className="text-xs font-medium text-red-600">
            {t("hero.invalid")}
          </span>
        </div>
      )}
    </div>
  );
});

export default StatusIndicator;
