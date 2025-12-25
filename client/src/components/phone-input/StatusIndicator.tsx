import { memo } from "react";
import { useTranslation } from "react-i18next";

interface StatusIndicatorProps {
  isValid: boolean;
  currentDigits: number;
  maxDigits: number;
  isHero: boolean;
}

const StatusIndicator = memo(function StatusIndicator({
  isValid,
  currentDigits,
  maxDigits,
  isHero,
}: StatusIndicatorProps) {
  const { t } = useTranslation();

  if (currentDigits < maxDigits) return null;

  return (
    <div
      className={`flex ${
        isHero ? "justify-end" : "justify-center"
      } items-center gap-2`}
    >
      <span
        className={`text-xs font-semibold flex items-center gap-1.5 ${
          isValid ? "text-[#00Cba9]" : "text-red-500"
        }`}
      >
        {isValid ? (
          <>
            <svg
              className="w-3.5 h-3.5"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            {t("hero.available")}
          </>
        ) : (
          <>
            <svg
              className="w-3.5 h-3.5"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 011-1h.01a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-5.707a1 1 0 011.414 0L10 10.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
            {t("hero.invalid")}
          </>
        )}
      </span>
    </div>
  );
});

export default StatusIndicator;

