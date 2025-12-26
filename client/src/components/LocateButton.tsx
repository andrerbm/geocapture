import { useCallback } from "react";
import { useTranslation } from "react-i18next";

interface LocateButtonProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

export default function LocateButton({ className = "", size = "md" }: LocateButtonProps) {
  const { t } = useTranslation();

  const scrollToHero = useCallback(() => {
    const heroSection = document.getElementById("hero-section");
    if (heroSection) {
      heroSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  const sizeClasses = {
    sm: "h-10 text-sm px-4",
    md: "h-12 text-base px-6",
    lg: "h-14 text-lg md:text-xl px-8",
  };

  return (
    <button
      onClick={scrollToHero}
      className={`w-full ${sizeClasses[size]} font-bold rounded-xl shadow-lg shadow-[#00Cba9]/30 text-white transition-all duration-300 bg-[#00Cba9] hover:bg-[#00b596] active:scale-[0.98] ${className}`}
    >
      {t("common.locate")}
    </button>
  );
}

