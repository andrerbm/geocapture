import { useMemo, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { CountryCode } from "libphonenumber-js";
import { Country } from "@/lib/phone-utils";
import {
  CountrySelector,
  SecurityBadges,
  ErrorMessage,
} from "./phone-input";

interface PhoneInputProps {
  phoneNumber: string;
  onPhoneChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  selectedCountry: CountryCode;
  onCountryChange: (value: string) => void;
  countries: Country[];
  showInvalid: boolean;
  onSearch: () => void;
  variant?: "hero" | "footer";
}

export default function PhoneInput({
  phoneNumber,
  onPhoneChange,
  selectedCountry,
  onCountryChange,
  countries,
  showInvalid,
  onSearch,
  variant = "hero",
}: PhoneInputProps) {
  const { t } = useTranslation();
  const isHero = variant === "hero";

  const selectedCountryData = useMemo(
    () => countries.find((c) => c.code === selectedCountry) || countries[0],
    [selectedCountry, countries]
  );

  // ✅ Validação acontece no hook (submit-only), aqui apenas chamamos onSearch
  const handleSearch = useCallback(() => {
    onSearch();
  }, [onSearch]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        e.preventDefault();
        handleSearch();
      }
    },
    [handleSearch]
  );

  const containerClasses = isHero
    ? "space-y-3 max-w-xl mx-auto w-full"
    : "space-y-3 max-w-md mx-auto relative z-10";

  // ✅ Borda vermelha apenas quando showInvalid (após tentativa de submit inválida)
  const inputContainerClasses = `flex items-center bg-white rounded-xl ${
    isHero ? "px-2 py-1.5" : "px-2 py-1"
  } transition-all duration-300 border ${
    showInvalid
      ? "border-red-300 shadow-[0_0_0_3px_rgba(239,68,68,0.1)]"
      : "border-gray-200 hover:border-gray-300"
  }`;

  return (
    <div className={containerClasses}>
      {/* ✅ Mensagem de erro apenas quando showInvalid */}
      {showInvalid && (
        <ErrorMessage message={t("hero.invalid") || "Número de telefone inválido"} />
      )}

      <div className={inputContainerClasses}>
        <CountrySelector
          countries={countries}
          selectedCountry={selectedCountry}
          onCountryChange={onCountryChange}
        />

        <div className={`w-px ${isHero ? "h-7" : "h-5"} bg-gray-200 mx-1`} />

        <div className="flex items-baseline flex-1 min-w-0">
          <span
            className={`text-gray-900 ${
              isHero ? "text-base md:text-lg" : "text-sm md:text-base"
            } whitespace-nowrap flex-shrink-0`}
          >
            {selectedCountryData.dialCode}
          </span>
          <input
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            className={`flex-1 bg-transparent border-none focus:ring-0 outline-none ${
              isHero ? "text-base md:text-lg" : "text-sm md:text-base"
            } text-gray-900 ${isHero ? "h-11" : "h-9"} ml-1 min-w-0`}
            placeholder=""
            value={phoneNumber}
            onChange={onPhoneChange}
            onKeyDown={handleKeyDown}
          />
        </div>
      </div>

      <Button
        className="w-full h-14 text-lg md:text-xl font-bold rounded-xl shadow-lg shadow-[#00Cba9]/30 text-white transition-all duration-300 bg-[#00Cba9] hover:bg-[#00b596] active:scale-[0.98]"
        size="lg"
        onClick={handleSearch}
      >
        {t("common.locate")}
      </Button>

      <SecurityBadges variant={variant} />
    </div>
  );
}
