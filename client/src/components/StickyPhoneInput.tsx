import { useState, useEffect, useRef, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { X, ChevronDown, Search, Send } from "lucide-react";
import { CountryCode } from "libphonenumber-js";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface Country {
  code: CountryCode;
  name: string;
  dialCode: string;
  FlagComponent?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

interface StickyPhoneInputProps {
  phoneNumber: string;
  onPhoneChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  selectedCountry: CountryCode;
  onCountryChange: (value: string) => void;
  countries: Country[];
  isValid: boolean;
  showInvalid: boolean;
  onSearch: () => void;
}

export default function StickyPhoneInput({
  phoneNumber,
  onPhoneChange,
  selectedCountry,
  onCountryChange,
  countries,
  isValid,
  showInvalid,
  onSearch,
}: StickyPhoneInputProps) {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      // Mostrar sticky input após scrollar 400px
      const shouldShow = window.scrollY > 400;
      setIsVisible(shouldShow && !isDismissed);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isDismissed]);

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
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 100);
    } else {
      setSearchTerm("");
    }
  }, [open]);

  const selectedCountryData =
    countries.find((c) => c.code === selectedCountry) || countries[0];

  const handleSelectCountry = (code: string) => {
    onCountryChange(code);
    setOpen(false);
    setSearchTerm("");
  };

  const handleSearch = () => {
    if (!phoneNumber.trim()) {
      setError(t("hero.enterPhone") || "Por favor, digite um número de telefone");
      setTimeout(() => setError(""), 3000);
      return;
    }

    if (!isValid || showInvalid) {
      setError(t("hero.invalid") || "Número de telefone inválido");
      setTimeout(() => setError(""), 3000);
      return;
    }

    setError("");
    onSearch();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSearch();
    }
  };

  const handleDismiss = () => {
    setIsDismissed(true);
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div
      className="fixed top-0 left-0 right-0 z-50 bg-white border-b-2 border-[#00Cba9]/20 shadow-xl transform transition-transform duration-300 ease-out"
      style={{
        transform: isVisible ? "translateY(0)" : "translateY(-100%)",
      }}
    >
      <div className="w-full px-3 py-3 md:px-4 md:py-4">
        <div className="flex flex-col gap-2 max-w-6xl mx-auto">
          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 animate-in slide-in-from-top">
              <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              {error}
            </div>
          )}

          <div className="flex items-center gap-2">
            {/* Phone Input Container */}
            <div className="flex-1 flex items-center bg-white rounded-xl px-2 py-1.5 md:px-3 md:py-2 border-2 border-[#00Cba9] shadow-lg shadow-[#00Cba9]/20 focus-within:border-[#00Cba9] focus-within:shadow-[0_0_0_4px_rgba(0,203,169,0.25)] transition-all min-w-0">
            {/* Country Selector */}
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <button
                  type="button"
                  className="flex items-center gap-1 md:gap-2 px-1.5 md:px-2 py-1 md:py-1.5 hover:bg-emerald-50 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-[#00Cba9] focus:ring-offset-1"
                  aria-label="Selecionar país"
                >
                  {selectedCountryData?.FlagComponent && (
                    <selectedCountryData.FlagComponent className="w-6 h-4 md:w-7 md:h-5 rounded shadow-sm flex-shrink-0" />
                  )}
                  <ChevronDown className="w-3.5 h-3.5 md:w-4 md:h-4 text-gray-500 flex-shrink-0" />
                </button>
              </PopoverTrigger>
              <PopoverContent
                className="w-[320px] sm:w-[380px] p-0 z-[60]"
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
                          selectedCountry === country.code
                            ? "bg-[#00Cba9]/10"
                            : ""
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

            {/* Divider */}
            <div className="w-px h-6 md:h-7 bg-gray-300 mx-1 md:mx-2" />

            {/* Input */}
            <div className="flex items-baseline flex-1 min-w-0">
              <span className="text-gray-900 text-sm md:text-base font-semibold whitespace-nowrap flex-shrink-0">
                {selectedCountryData.dialCode}
              </span>
              <input
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                className="flex-1 bg-transparent border-none focus:ring-0 outline-none text-sm md:text-base font-medium text-gray-900 h-8 md:h-9 ml-1 md:ml-2 min-w-0"
                placeholder=""
                value={phoneNumber}
                onChange={onPhoneChange}
                onKeyDown={handleKeyDown}
              />
            </div>
          </div>

            {/* Locate Button - Icon Only - Always Active */}
            <button
              onClick={handleSearch}
              className="flex-shrink-0 w-11 h-11 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-gradient-to-br from-[#00Cba9] to-[#00b596] hover:from-[#00b596] hover:to-[#00a085] text-white shadow-lg md:shadow-xl shadow-[#00Cba9]/40 hover:shadow-xl md:hover:shadow-2xl hover:shadow-[#00Cba9]/60 transition-all duration-300 active:scale-95 flex items-center justify-center group border-2 border-[#00Cba9]/20"
              aria-label={t("common.locate")}
            >
              <Send className="w-5 h-5 md:w-7 md:h-7 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
            </button>

            {/* Close Button */}
            <button
              onClick={handleDismiss}
              className="flex-shrink-0 w-8 h-8 md:w-10 md:h-10 hover:bg-red-50 rounded-lg transition-colors group flex items-center justify-center"
              aria-label="Fechar"
            >
              <X className="w-4 h-4 md:w-5 md:h-5 text-gray-400 group-hover:text-red-500 transition-colors" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
