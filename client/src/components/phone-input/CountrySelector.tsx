import { memo, useState, useRef, useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Search, ChevronDown } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CountryCode } from "libphonenumber-js";
import { Country } from "@/lib/phone-utils";

interface CountrySelectorProps {
  countries: Country[];
  selectedCountry: CountryCode;
  onCountryChange: (value: string) => void;
}

const CountrySelector = memo(function CountrySelector({
  countries,
  selectedCountry,
  onCountryChange,
}: CountrySelectorProps) {
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
});

export default CountrySelector;

