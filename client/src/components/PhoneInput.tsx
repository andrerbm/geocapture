import { useMemo, useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { CountryCode } from "libphonenumber-js";
import { Country } from "@/lib/phone-utils";
import {
  CountrySelector,
  StatusIndicator,
  SecurityBadges,
  ErrorMessage,
} from "./phone-input";

interface PhoneInputProps {
  phoneNumber: string;
  onPhoneChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  selectedCountry: CountryCode;
  onCountryChange: (value: string) => void;
  countries: Country[];
  isValid: boolean;
  onSearch: () => void;
  currentDigits: number;
  maxDigits: number;
  variant?: "hero" | "footer";
}

export default function PhoneInput({
  phoneNumber,
  onPhoneChange,
  selectedCountry,
  onCountryChange,
  countries,
  isValid,
  onSearch,
  currentDigits,
  maxDigits,
  variant = "hero",
}: PhoneInputProps) {
  const { t } = useTranslation();
  const isHero = variant === "hero";
  const [error, setError] = useState("");

  const selectedCountryData = useMemo(
    () => countries.find((c) => c.code === selectedCountry) || countries[0],
    [selectedCountry, countries]
  );

  const handleSearch = useCallback(() => {
    if (!phoneNumber.trim()) {
      setError(t("hero.enterPhone") || "Por favor, digite um número de telefone");
      setTimeout(() => setError(""), 3000);
      return;
    }

    if (!isValid) {
      setError(t("hero.invalid") || "Número de telefone inválido");
      setTimeout(() => setError(""), 3000);
      return;
    }

    setError("");
    onSearch();
  }, [phoneNumber, isValid, onSearch, t]);

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

  const inputContainerClasses = `flex items-center bg-white rounded-xl ${
    isHero ? "px-2 py-1.5" : "px-2 py-1"
  } transition-all duration-300 border ${
    isValid
      ? "border-[#00Cba9] shadow-[0_0_0_3px_rgba(0,203,169,0.15)]"
      : "border-gray-200 hover:border-gray-300"
  }`;

  const shouldShowStatus = phoneNumber && currentDigits >= maxDigits;

  return (
    <div className={containerClasses}>
      <ErrorMessage message={error} />

      {shouldShowStatus && (
        <StatusIndicator
          isValid={isValid}
          currentDigits={currentDigits}
          maxDigits={maxDigits}
          isHero={isHero}
        />
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
