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
  // Lista de países disponíveis para seleção
  countries: Country[];

  // País atualmente selecionado (ex: "BR", "US"...)
  selectedCountry: CountryCode;

  // Callback chamado quando o usuário seleciona um país
  onCountryChange: (value: string) => void;
}

/**
 * CountrySelector: dropdown de países com busca e flags, dentro de um Popover.
 * memo() evita re-render se as props não mudarem.
 */
const CountrySelector = memo(function CountrySelector({
  countries,
  selectedCountry,
  onCountryChange,
}: CountrySelectorProps) {
  // t() serve para pegar strings traduzidas (i18n)
  const { t } = useTranslation();

  // Controla se o Popover está aberto/fechado
  const [open, setOpen] = useState(false);

  // Texto digitado no input de busca
  const [searchTerm, setSearchTerm] = useState("");

  // Ref para poder focar programaticamente no input quando abrir
  const searchInputRef = useRef<HTMLInputElement>(null);

  /**
   * filteredCountries: lista filtrada com base no searchTerm.
   * useMemo evita recalcular a cada render quando countries/searchTerm não mudaram.
   */
  const filteredCountries = useMemo(() => {
    // Se não houver busca, retorna a lista inteira
    if (!searchTerm.trim()) return countries;

    // Normaliza o termo de busca
    const term = searchTerm.toLowerCase().trim();

    // Filtra por:
    // - nome do país
    // - dialCode (ex: +55)
    // - code (ex: BR)
    return countries.filter(
      (c) =>
        c.name.toLowerCase().includes(term) ||
        c.dialCode.includes(term) ||
        c.code.toLowerCase().includes(term)
    );
  }, [countries, searchTerm]);

  /**
   * Quando o popover abre:
   * - foca o input depois de um pequeno delay (garante que o popover renderizou)
   * Quando fecha:
   * - limpa a busca
   */
  useEffect(() => {
    if (open && searchInputRef.current) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 100);
    } else {
      // Quando fecha, reseta o termo
      setSearchTerm("");
    }
  }, [open]);

  /**
   * selectedCountryData: encontra o objeto do país selecionado.
   * Se não achar, cai no primeiro país da lista como fallback.
   */
  const selectedCountryData = useMemo(
    () => countries.find((c) => c.code === selectedCountry) || countries[0],
    [countries, selectedCountry]
  );

  /**
   * Ao selecionar um país:
   * - dispara callback com o code (ex: "BR")
   * - fecha o popover
   * - limpa a busca
   */
  const handleSelectCountry = (code: string) => {
    onCountryChange(code);
    setOpen(false);
    setSearchTerm("");
  };

  return (
    // Popover controlado por estado (open) e handler (setOpen)
    <Popover open={open} onOpenChange={setOpen}>
      {/* O trigger é o botão que abre/fecha o popover */}
      <PopoverTrigger asChild>
        <button
          type="button"
          className="flex items-center gap-2 px-2 py-1.5 hover:bg-gray-50 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-[#00Cba9] focus:ring-offset-1"
          aria-label="Selecionar país"
        >
          {/* Mostra a bandeira do país selecionado, se existir componente de flag */}
          {selectedCountryData?.FlagComponent && (
            <selectedCountryData.FlagComponent className="w-6 h-4 rounded-sm shadow-sm flex-shrink-0" />
          )}

          {/* Ícone de dropdown */}
          <ChevronDown className="w-4 h-4 text-gray-400 flex-shrink-0" />
        </button>
      </PopoverTrigger>

      {/* Conteúdo do Popover (o dropdown) */}
      <PopoverContent
        className="w-[320px] sm:w-[380px] p-0 z-50"
        align="start"
        sideOffset={4}
      >
        {/* Campo de busca (fica fixo no topo do popover) */}
        <div className="p-3 border-b sticky top-0 bg-white z-10">
          <div className="relative">
            {/* Ícone de lupa dentro do input */}
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />

            <input
              ref={searchInputRef}
              type="text"
              placeholder={t("hero.searchPlaceholder")}
              className="w-full pl-10 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00Cba9] focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => {
                // Atalho: ESC fecha o popover
                if (e.key === "Escape") {
                  setOpen(false);
                }
              }}
            />
          </div>
        </div>

        {/* Lista rolável de países */}
        <div className="max-h-[300px] overflow-y-auto">
          {/* Caso não encontre nada no filtro */}
          {filteredCountries.length === 0 ? (
            <div className="p-4 text-center text-sm text-gray-500">
              {t("hero.noCountryFound")}
            </div>
          ) : (
            // Renderiza cada país como um botão clicável
            filteredCountries.map((country) => (
              <button
                key={country.code}
                type="button"
                onClick={() => handleSelectCountry(country.code)}
                className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors text-left ${
                  selectedCountry === country.code ? "bg-[#00Cba9]/10" : ""
                }`}
              >
                {/* Bandeira do país */}
                {country.FlagComponent && (
                  <country.FlagComponent className="w-6 h-4 rounded-sm shadow-sm flex-shrink-0" />
                )}

                {/* Nome do país */}
                <span className="font-medium text-sm text-gray-900 flex-1">
                  {country.name}
                </span>

                {/* Dial code do país (ex: +55) */}
                <span className="text-gray-500 text-sm font-medium">
                  {country.dialCode}
                </span>

                {/* Check para indicar selecionado */}
                {selectedCountry === country.code && (
                  <svg
                    className="w-4 h-4 text-[#00Cba9] flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
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
