import { useMemo, useCallback, memo, useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { ShieldCheck, Lock, Search, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CountryCode } from "libphonenumber-js";

interface Country {
  code: CountryCode;
  name: string;
  dialCode: string;
  FlagComponent?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

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

// ✅ OTIMIZAÇÃO 1: Memoizar componente de status
const StatusIndicator = memo(
  ({
    isValid,
    currentDigits,
    maxDigits,
    isHero,
  }: {
    isValid: boolean;
    currentDigits: number;
    maxDigits: number;
    isHero: boolean;
  }) => {
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
  }
);
StatusIndicator.displayName = "StatusIndicator";

// Componente de seleção de país melhorado
const CountrySelector = memo(
  ({
    countries,
    selectedCountry,
    onCountryChange,
  }: {
    countries: Country[];
    selectedCountry: CountryCode;
    onCountryChange: (value: string) => void;
  }) => {
    const { t } = useTranslation();
    const [open, setOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const searchInputRef = useRef<HTMLInputElement>(null);

    // Filtrar países baseado na busca
    const filteredCountries = useMemo(() => {
      if (!searchTerm.trim()) return countries;
      const term = searchTerm.toLowerCase().trim();
      return countries.filter(
        (c) =>
          c.name.toLowerCase().includes(term) ||
          c.dialCode.includes(term) ||
          c.code.toLowerCase().includes(term)
      );
    }, [countries, searchTerm]);

    // Focar no input de busca quando o popover abrir
    useEffect(() => {
      if (open && searchInputRef.current) {
        // Pequeno delay para garantir que o popover está renderizado
        setTimeout(() => {
          searchInputRef.current?.focus();
        }, 100);
      } else {
        setSearchTerm("");
      }
    }, [open]);

    const selectedCountryData = useMemo(
      () => countries.find((c) => c.code === selectedCountry) || countries[0],
      [countries, selectedCountry]
    );

    const handleSelectCountry = (code: string) => {
      onCountryChange(code);
      setOpen(false);
      setSearchTerm("");
    };

    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <button
            type="button"
            className="flex items-center gap-2 px-2 py-1.5 hover:bg-gray-50 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-[#00Cba9] focus:ring-offset-1"
            aria-label="Selecionar país"
          >
            {selectedCountryData?.FlagComponent && (
              <selectedCountryData.FlagComponent className="w-6 h-4 rounded-sm shadow-sm flex-shrink-0" />
            )}
            <ChevronDown className="w-4 h-4 text-gray-400 flex-shrink-0" />
          </button>
        </PopoverTrigger>
        <PopoverContent
          className="w-[320px] sm:w-[380px] p-0 z-50"
          align="start"
          sideOffset={4}
        >
          {/* Campo de busca */}
          <div className="p-3 border-b sticky top-0 bg-white z-10">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                ref={searchInputRef}
                type="text"
                placeholder={t("hero.searchPlaceholder")}
                className="w-full pl-10 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00Cba9] focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Escape") {
                    setOpen(false);
                  }
                }}
              />
            </div>
          </div>

          {/* Lista de países */}
          <div className="max-h-[300px] overflow-y-auto">
            {filteredCountries.length === 0 ? (
              <div className="p-4 text-center text-sm text-gray-500">
                {t("hero.noCountryFound")}
              </div>
            ) : (
              filteredCountries.map((country) => (
                <button
                  key={country.code}
                  type="button"
                  onClick={() => handleSelectCountry(country.code)}
                  className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors text-left ${
                    selectedCountry === country.code ? "bg-[#00Cba9]/10" : ""
                  }`}
                >
                  {country.FlagComponent && (
                    <country.FlagComponent className="w-6 h-4 rounded-sm shadow-sm flex-shrink-0" />
                  )}
                  <span className="font-medium text-sm text-gray-900 flex-1">
                    {country.name}
                  </span>
                  <span className="text-gray-500 text-sm font-medium">
                    {country.dialCode}
                  </span>
                  {selectedCountry === country.code && (
                    <svg
                      className="w-4 h-4 text-[#00Cba9] flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </button>
              ))
            )}
          </div>
        </PopoverContent>
      </Popover>
    );
  }
);
CountrySelector.displayName = "CountrySelector";

export default function PhoneInputOptimized({
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

  // ✅ OTIMIZAÇÃO 4: Cache do país selecionado
  const selectedCountryData = useMemo(
    () => countries.find((c) => c.code === selectedCountry) || countries[0],
    [selectedCountry, countries]
  );

  // ✅ OTIMIZAÇÃO 5: Estabilizar handlers
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter" && isValid) {
        e.preventDefault();
        onSearch();
      }
    },
    [isValid, onSearch]
  );

  // ✅ OTIMIZAÇÃO 6: Cache de classes CSS
  const containerClasses = useMemo(
    () =>
      `space-y-3 ${
        isHero ? "max-w-xl mx-auto w-full" : "max-w-md mx-auto relative z-10"
      }`,
    [isHero]
  );

  const inputContainerClasses = useMemo(() => {
    const base = `flex items-center ${
      isHero ? "bg-white" : "bg-white"
    } rounded-xl ${
      isHero ? "px-2 py-1.5" : "px-2 py-1"
    } transition-all duration-300 border`;

    const border = isValid
      ? "border-[#00Cba9] shadow-[0_0_0_3px_rgba(0,203,169,0.15)]"
      : "border-gray-200 hover:border-gray-300";

    return `${base} ${border}`;
  }, [isHero, isValid]);

  // ✅ OTIMIZAÇÃO 7: Badges estáticos
  const heroBadges = useMemo(
    () => (
      <div className="flex justify-between gap-4 w-full pt-2">
        <div className="flex-1 flex items-center justify-center gap-2 bg-[#e8f7f3] py-3 rounded-lg">
          <ShieldCheck className="h-4 w-4 text-[#5bb59a]" />
          <span className="text-[#5bb59a] text-xs font-bold">
            {t("hero.confidential")}
          </span>
        </div>
        <div className="flex-1 flex items-center justify-center gap-2 bg-[#e8f7f3] py-3 rounded-lg">
          <Lock className="h-4 w-4 text-[#5bb59a]" />
          <span className="text-[#5bb59a] text-xs font-bold">
            {t("hero.sslSecure")}
          </span>
        </div>
      </div>
    ),
    [t]
  );

  const footerBadges = useMemo(
    () => (
      <div className="flex justify-center gap-8 text-xs text-gray-400 mt-4">
        <span className="flex items-center gap-1.5">
          <ShieldCheck className="h-4 w-4 text-primary" />{" "}
          {t("hero.confidential")}
        </span>
        <span className="flex items-center gap-1.5">
          <Lock className="h-4 w-4 text-primary" /> {t("hero.sslSecure")}
        </span>
      </div>
    ),
    [t]
  );

  // ✅ OTIMIZAÇÃO 8: Mostrar status apenas quando necessário
  const shouldShowStatus = phoneNumber && currentDigits >= maxDigits;

  return (
    <div className={containerClasses}>
      {/* Status indicator - memoizado */}
      {shouldShowStatus && (
        <StatusIndicator
          isValid={isValid}
          currentDigits={currentDigits}
          maxDigits={maxDigits}
          isHero={isHero}
        />
      )}

      <div className={inputContainerClasses}>
        {/* Country selector melhorado */}
        <CountrySelector
          countries={countries}
          selectedCountry={selectedCountry}
          onCountryChange={onCountryChange}
        />

        {/* Divider */}
        <div className={`w-px ${isHero ? "h-7" : "h-5"} bg-gray-200 mx-1`} />

        {/* Input otimizado */}
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
        onClick={onSearch}
        disabled={!isValid}
      >
        {t("common.locate")}
      </Button>

      {isHero ? heroBadges : footerBadges}
    </div>
  );
}
