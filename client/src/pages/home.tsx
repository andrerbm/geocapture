import { useState, useCallback, useEffect, useRef } from "react";
import { useLocation } from "wouter";
import { useTranslation } from "react-i18next";
import { useCountryDetection } from "@/hooks/use-country-detection";
import {
  MapPin,
  Users,
  Search,
  Bell,
  Radio,
  HeartPulse,
  Activity,
  Watch,
  Zap,
  BrainCircuit,
  Cpu,
  Quote,
  Star,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  AsYouType,
  parsePhoneNumber,
  CountryCode,
  getCountries,
  getCountryCallingCode,
  getExampleNumber,
} from "libphonenumber-js";
import examples from "libphonenumber-js/mobile/examples";
import * as flags from "country-flag-icons/react/3x2";
import HeroSection from "@/components/HeroSection";
import PhoneInput from "@/components/PhoneInput";
import LanguageSelector from "@/components/LanguageSelector";

// =============================================================================
// Types
// =============================================================================

type Country = {
  code: CountryCode;
  name: string;
  dialCode: string;
  FlagComponent?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

// =============================================================================
// Constants
// =============================================================================

const countryNames: Record<string, string> = {
  US: "United States",
  GB: "United Kingdom",
  CA: "Canada",
  AU: "Australia",
  DE: "Germany",
  FR: "France",
  IT: "Italy",
  ES: "Spain",
  PT: "Portugal",
  BR: "Brazil",
  MX: "Mexico",
  AR: "Argentina",
  CL: "Chile",
  CO: "Colombia",
  PE: "Peru",
  VE: "Venezuela",
  EC: "Ecuador",
  BO: "Bolivia",
  PY: "Paraguay",
  UY: "Uruguay",
  CN: "China",
  JP: "Japan",
  KR: "South Korea",
  IN: "India",
  ID: "Indonesia",
  PH: "Philippines",
  VN: "Vietnam",
  TH: "Thailand",
  MY: "Malaysia",
  SG: "Singapore",
  RU: "Russia",
  UA: "Ukraine",
  PL: "Poland",
  RO: "Romania",
  NL: "Netherlands",
  BE: "Belgium",
  CZ: "Czech Republic",
  GR: "Greece",
  SE: "Sweden",
  HU: "Hungary",
  AT: "Austria",
  CH: "Switzerland",
  BG: "Bulgaria",
  DK: "Denmark",
  FI: "Finland",
  SK: "Slovakia",
  NO: "Norway",
  IE: "Ireland",
  HR: "Croatia",
  BA: "Bosnia and Herzegovina",
  RS: "Serbia",
  LT: "Lithuania",
  SI: "Slovenia",
  LV: "Latvia",
  EE: "Estonia",
  ZA: "South Africa",
  EG: "Egypt",
  NG: "Nigeria",
  KE: "Kenya",
  MA: "Morocco",
  TN: "Tunisia",
  GH: "Ghana",
  DZ: "Algeria",
  AO: "Angola",
  UG: "Uganda",
  ET: "Ethiopia",
  TZ: "Tanzania",
  TR: "Turkey",
  SA: "Saudi Arabia",
  AE: "UAE",
  IL: "Israel",
  IQ: "Iraq",
  IR: "Iran",
  PK: "Pakistan",
  BD: "Bangladesh",
  NZ: "New Zealand",
  FJ: "Fiji",
};

const countries: Country[] = getCountries()
  .map((code) => {
    const countryCode = code as CountryCode;
    const FlagComponent = (
      flags as Record<
        string,
        React.ComponentType<React.SVGProps<SVGSVGElement>>
      >
    )[countryCode];

    return {
      code: countryCode,
      name: countryNames[countryCode] || countryCode,
      dialCode: `+${getCountryCallingCode(countryCode)}`,
      FlagComponent,
    };
  })
  .sort((a, b) => a.name.localeCompare(b.name));

// =============================================================================
// Phone Helpers (pure functions)
// =============================================================================

const getMaxLength = (country: CountryCode): number => {
  try {
    const exampleNumber = getExampleNumber(country, examples);
    if (exampleNumber) {
      return exampleNumber.nationalNumber.length;
    }
  } catch {
    // ignore
  }
  return 15;
};

const formatPhoneNumber = (value: string, country: CountryCode): string => {
  try {
    // Se valor vazio, retornar vazio
    if (!value || value.trim() === "") return "";
    
    const digitsOnly = value.replace(/\D/g, "");
    
    // Se não há dígitos, retornar vazio
    if (!digitsOnly) return "";
    
    const maxLength = getMaxLength(country);
    const limitedDigits = digitsOnly.slice(0, maxLength);

    if (!limitedDigits) return "";

    const formatter = new AsYouType(country);
    const formatted = formatter.input(limitedDigits);
    
    // Retornar valor formatado ou apenas dígitos se formatação falhar
    return formatted || limitedDigits;
  } catch {
    // Em caso de erro, retornar apenas os dígitos (sem formatação)
    const digitsOnly = value.replace(/\D/g, "");
    return digitsOnly.slice(0, getMaxLength(country));
  }
};

const isValidPhoneNumber = (phone: string, country: CountryCode): boolean => {
  if (!phone || phone.trim() === "") return false;

  try {
    const parsed = parsePhoneNumber(phone, country);
    return parsed ? parsed.isValid() : false;
  } catch {
    return false;
  }
};

// =============================================================================
// Custom Hook: usePhoneField
// =============================================================================

function usePhoneField(
  initialCountry: CountryCode,
  onValidSearch: (fullNumber: string) => void
) {
  const [country, setCountry] = useState<CountryCode>(initialCountry);
  const [value, setValue] = useState("");
  const [userSelectedCountry, setUserSelectedCountry] = useState(false);
  const previousDigitsRef = useRef<string>("");
  const previousFormattedRef = useRef<string>("");

  // Atualizar país quando initialCountry mudar APENAS se o usuário não selecionou manualmente
  useEffect(() => {
    if (!userSelectedCountry && initialCountry !== country) {
      setCountry(initialCountry);
      // Limpar valor quando país muda para evitar formatação incorreta
      setValue("");
      previousDigitsRef.current = "";
      previousFormattedRef.current = "";
    }
  }, [initialCountry, userSelectedCountry, country]);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const inputValue = e.target.value;
      const previousFormatted = previousFormattedRef.current;
      
      // Permitir deleção completa
      if (inputValue === "") {
        setValue("");
        previousDigitsRef.current = "";
        previousFormattedRef.current = "";
        return;
      }
      
      // Extrair apenas dígitos do input atual e anterior
      const currentDigits = inputValue.replace(/\D/g, "");
      const previousDigits = previousDigitsRef.current;
      
      // Detectar deleção: comprimento total menor OU menos dígitos
      // Isso detecta quando usuário deleta caracteres de formatação também
      const isDeleting = 
        inputValue.length < previousFormatted.length || 
        currentDigits.length < previousDigits.length;
      
      if (isDeleting) {
        // Usuário está deletando - formatar APENAS os dígitos restantes
        // Isso permite deletar qualquer parte, incluindo DDD e caracteres de formatação
        if (currentDigits.length === 0) {
          setValue("");
          previousDigitsRef.current = "";
          previousFormattedRef.current = "";
        } else {
          // Formatar apenas os dígitos restantes (ignorar caracteres de formatação do input)
          const formatted = formatPhoneNumber(currentDigits, country);
          setValue(formatted);
          previousDigitsRef.current = currentDigits;
          previousFormattedRef.current = formatted;
        }
        return;
      }
      
      // Se está adicionando ou igual, aplicar formatação normalmente
      const formatted = formatPhoneNumber(inputValue, country);
      setValue(formatted);
      // Atualizar refs com os valores formatados
      previousDigitsRef.current = formatted.replace(/\D/g, "");
      previousFormattedRef.current = formatted;
    },
    [country]
  );

  const handleCountryChange = useCallback((newCountry: string) => {
    setUserSelectedCountry(true); // Marcar que usuário selecionou manualmente
    setCountry(newCountry as CountryCode);
    // Reformatar o valor atual com o novo país
    const digitsOnly = value.replace(/\D/g, "");
    if (digitsOnly) {
      const reformatted = formatPhoneNumber(digitsOnly, newCountry as CountryCode);
      setValue(reformatted);
      previousDigitsRef.current = digitsOnly;
      previousFormattedRef.current = reformatted;
    } else {
      setValue("");
      previousDigitsRef.current = "";
      previousFormattedRef.current = "";
    }
  }, [value]);

  const isValid = isValidPhoneNumber(value, country);
  const digitCount = value.replace(/\D/g, "").length;
  const maxDigits = getMaxLength(country);

  const handleSearch = useCallback(() => {
    if (!value.trim() || !isValid) return;

    try {
      // Tentar parsear o número para garantir formato correto
      const digitsOnly = value.replace(/\D/g, "");
      const parsed = parsePhoneNumber(digitsOnly, country);
      
      if (parsed && parsed.isValid()) {
        // Usar formato internacional do libphonenumber-js
        const fullNumber = parsed.formatInternational();
        onValidSearch(fullNumber);
      } else {
        // Fallback: usar código do país + número
        const currentCountry = countries.find((c) => c.code === country);
        const fullNumber = currentCountry
          ? `${currentCountry.dialCode} ${digitsOnly}`
          : value;
        onValidSearch(fullNumber);
      }
    } catch (error) {
      // Fallback em caso de erro
      const currentCountry = countries.find((c) => c.code === country);
      const digitsOnly = value.replace(/\D/g, "");
      const fullNumber = currentCountry
        ? `${currentCountry.dialCode} ${digitsOnly}`
        : value;
      onValidSearch(fullNumber);
    }
  }, [value, isValid, country, onValidSearch, countries]);

  return {
    country,
    value,
    isValid,
    digitCount,
    maxDigits,
    handleChange,
    handleCountryChange,
    handleSearch,
  };
}

// =============================================================================
// Component: Home
// =============================================================================

export default function Home() {
  const { t } = useTranslation();
  const [, setLocation] = useLocation();
  const { countryCode: detectedCountry, isLoading: isDetectingCountry } = useCountryDetection();
  const [defaultCountry, setDefaultCountry] = useState<CountryCode>("BR");

  // Atualizar país padrão quando a detecção for concluída
  useEffect(() => {
    if (!isDetectingCountry && detectedCountry) {
      setDefaultCountry(detectedCountry);
    }
  }, [detectedCountry, isDetectingCountry]);

  const navigateToSearching = useCallback(
    (fullNumber: string) => {
      setLocation(`/searching?phone=${encodeURIComponent(fullNumber)}`);
    },
    [setLocation]
  );

  // Hero phone field - usar país detectado ou BR como fallback
  const heroPhone = usePhoneField(defaultCountry, navigateToSearching);

  // Footer phone field - usar país detectado ou BR como fallback
  const footerPhone = usePhoneField(defaultCountry, navigateToSearching);

  return (
    <div className="min-h-screen bg-white font-sans overflow-x-hidden">
      {/* Navigation */}
      <nav className="container mx-auto py-4 px-4 flex items-center justify-between">
        <div className="text-primary font-bold text-xl tracking-tight flex items-center gap-1">
          <MapPin className="fill-primary text-white h-6 w-6" /> {t("nav.title")}
        </div>
        <LanguageSelector />
      </nav>

      {/* Divider Line */}
      <div className="container mx-auto px-4">
        <div className="border-t border-gray-200"></div>
      </div>

      {/* Hero Section */}
      <HeroSection
        phoneNumber={heroPhone.value}
        onPhoneChange={heroPhone.handleChange}
        selectedCountry={heroPhone.country}
        onCountryChange={heroPhone.handleCountryChange}
        countries={countries}
        isValid={heroPhone.isValid}
        onSearch={heroPhone.handleSearch}
        currentDigits={heroPhone.digitCount}
        maxDigits={heroPhone.maxDigits}
      />

      {/* Features Grid */}
      <section className="py-12 bg-slate-50/50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-10">
            {t("features.title")}
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            {[
              {
                icon: MapPin,
                title: t("features.realtimeLocation"),
                color: "bg-cyan-50 text-cyan-600",
              },
              {
                icon: Activity,
                title: t("features.locationHistory"),
                color: "bg-blue-50 text-blue-600",
              },
              {
                icon: Bell,
                title: t("features.locationAlerts"),
                color: "bg-emerald-50 text-emerald-600",
              },
              {
                icon: Search,
                title: t("features.arSearch"),
                color: "bg-purple-50 text-purple-600",
              },
              {
                icon: Radio,
                title: t("features.sosButton"),
                color: "bg-red-50 text-red-600",
              },
              {
                icon: HeartPulse,
                title: t("features.fallDetection"),
                color: "bg-pink-50 text-pink-600",
              },
              {
                icon: Zap,
                title: t("features.collisionControl"),
                color: "bg-amber-50 text-amber-600",
              },
              {
                icon: Watch,
                title: t("features.wearables"),
                color: "bg-indigo-50 text-indigo-600",
              },
            ].map((feature, i) => (
              <Card
                key={i}
                className="border-0 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 bg-white rounded-2xl overflow-hidden group"
              >
                <CardContent className="p-6 flex flex-col items-center text-center gap-4 h-full justify-center">
                  <div
                    className={`w-16 h-16 rounded-[1.5rem] flex items-center justify-center ${feature.color} mb-2 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <feature.icon className="h-8 w-8 stroke-[1.5]" />
                  </div>
                  <h3 className="font-bold text-gray-800 text-sm md:text-base leading-tight px-2">
                    {feature.title}
                  </h3>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Technologies */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-10">
            {t("technologies.title")}
          </h2>

          <div className="grid md:grid-cols-3 gap-8 mb-10 max-w-5xl mx-auto">
            {[
              {
                icon: MapPin,
                title: t("technologies.gpsTracking"),
                desc: t("technologies.gpsDesc"),
              },
              {
                icon: BrainCircuit,
                title: t("technologies.mlAlgorithms"),
                desc: t("technologies.mlDesc"),
              },
              {
                icon: Cpu,
                title: t("technologies.iotDevices"),
                desc: t("technologies.iotDesc"),
              },
            ].map((tech, i) => (
              <div
                key={i}
                className="bg-emerald-50/30 rounded-[2rem] p-6 md:p-8 flex flex-col items-center gap-6 hover:bg-emerald-50/60 transition-colors border border-emerald-100/50"
              >
                <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center text-primary shadow-sm mb-2 border border-emerald-100">
                  <tech.icon className="h-8 w-8 stroke-[1.5]" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-lg mb-2">
                    {tech.title}
                  </h3>
                  <p className="text-gray-500 text-sm font-medium">
                    {tech.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <Button className="h-14 px-10 text-lg font-bold rounded-full shadow-xl shadow-primary/25 bg-primary hover:bg-primary/90 transition-all hover:scale-105">
            {t("technologies.tryNow")}
          </Button>
        </div>
      </section>

      {/* Press / Testimonials */}
      <section className="py-12 bg-white border-t border-gray-50">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h2 className="text-2xl font-bold text-gray-900 mb-10">
            {t("testimonials.title")}
          </h2>

          <div className="relative p-10 bg-white rounded-[2rem] shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] border border-gray-100 mb-12">
            <Quote className="h-8 w-8 text-primary/20 absolute top-8 left-8 rotate-180" />
            <p className="text-gray-600 italic text-xl leading-relaxed relative z-10 pt-6 px-4 font-light">
              "{t("testimonials.quote")}"
            </p>
            <div className="mt-8 flex justify-center items-center gap-2">
              <div className="w-8 h-1 bg-primary/20 rounded-full"></div>
              <span className="font-bold text-xs tracking-widest text-gray-400 uppercase">
                The Verge
              </span>
              <div className="w-8 h-1 bg-primary/20 rounded-full"></div>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
            <div className="flex items-center justify-center">
              <div className="bg-red-600 text-white font-bold rounded-full w-12 h-12 flex items-center justify-center text-sm shadow-lg">
                cnet
              </div>
            </div>
            <div className="font-serif font-bold text-2xl flex items-center text-black">
              The New York Times
            </div>
            <div className="font-bold text-xl flex items-center text-orange-600 tracking-tighter">
              <span className="bg-orange-600 text-white px-1 mr-0.5">THE</span>{" "}
              VERGE
            </div>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-12 bg-white relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-12">
            {t("howItWorks.title")}
          </h2>

          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Connecting Line */}
            <div className="hidden md:block absolute top-10 left-[16%] right-[16%] h-1 bg-emerald-50 z-0">
              <div className="h-full bg-emerald-100 w-1/2"></div>
            </div>

            {[
              {
                step: 1,
                title: t("howItWorks.step1Title"),
                desc: t("howItWorks.step1Desc"),
              },
              {
                step: 2,
                title: t("howItWorks.step2Title"),
                desc: t("howItWorks.step2Desc"),
              },
              {
                step: 3,
                title: t("howItWorks.step3Title"),
                desc: t("howItWorks.step3Desc"),
              },
            ].map((item, i) => (
              <div
                key={i}
                className="flex flex-col items-center text-center gap-6 bg-white p-4 relative z-10"
              >
                <div className="w-16 h-16 bg-emerald-50 text-primary font-bold text-3xl rounded-2xl flex items-center justify-center shadow-sm border border-emerald-100 relative group">
                  <span className="group-hover:scale-110 transition-transform">
                    {item.step}
                  </span>
                  {i < 2 && (
                    <div className="md:hidden absolute -bottom-8 left-1/2 -translate-x-1/2 w-0.5 h-8 bg-emerald-100"></div>
                  )}
                </div>
                <div>
                  <h3 className="font-bold text-xl text-gray-900 mb-3">
                    {item.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-16">
            <Button className="h-14 px-10 text-lg font-bold rounded-full shadow-xl shadow-primary/25 bg-primary hover:bg-primary/90 transition-all hover:scale-105">
              {t("technologies.tryNow")}
            </Button>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="py-12 bg-slate-50/80">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <div className="inline-flex items-center justify-center mb-4">
              <div className="bg-white px-6 py-2 rounded-full shadow-sm border border-gray-100 flex items-center gap-2 text-primary font-bold text-lg">
                <Users className="h-5 w-5" /> {t("reviews.title")}
              </div>
            </div>
            <p className="text-gray-400 font-medium">{t("reviews.subtitle")}</p>
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-6 mb-12">
            {/* App Store */}
            <div className="flex items-center gap-3 bg-white px-4 sm:px-5 py-2.5 rounded-xl border border-gray-100 shadow-sm">
              <svg
                className="w-6 h-6 flex-shrink-0"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
              </svg>
              <div className="flex flex-col">
                <span className="text-[10px] text-gray-500 leading-none">
                  {t("reviews.availableOn")}
                </span>
                <span className="font-bold text-gray-900 text-sm leading-tight">
                  {t("reviews.appStore")}
                </span>
              </div>
              <div className="flex items-center gap-1.5 ml-2 pl-3 border-l border-gray-200">
                <div className="flex text-yellow-400 gap-0.5">
                  <Star className="h-3 w-3 fill-current" />
                  <Star className="h-3 w-3 fill-current" />
                  <Star className="h-3 w-3 fill-current" />
                  <Star className="h-3 w-3 fill-current" />
                  <Star className="h-3 w-3 fill-current" />
                </div>
                <span className="text-gray-900 font-bold text-sm">4.6</span>
              </div>
            </div>

            {/* Google Play */}
            <div className="flex items-center gap-3 bg-white px-4 sm:px-5 py-2.5 rounded-xl border border-gray-100 shadow-sm">
              <svg className="w-6 h-6 flex-shrink-0" viewBox="0 0 24 24">
                <path
                  fill="#EA4335"
                  d="M3.609 1.814L13.792 12 3.61 22.186a2.372 2.372 0 0 1-.497-1.478V3.292c0-.553.19-1.063.496-1.478z"
                />
                <path
                  fill="#FBBC04"
                  d="M16.296 15.5L3.609 22.186a2.321 2.321 0 0 0 1.627.66c.407 0 .815-.1 1.18-.304l13.091-7.365-3.21-3.177z"
                />
                <path
                  fill="#4285F4"
                  d="M21.623 12c0-.78-.378-1.511-1.009-1.959l-4.318-2.541-3.5 3.5 3.5 3.5 4.318-2.541A2.363 2.363 0 0 0 21.623 12z"
                />
                <path
                  fill="#34A853"
                  d="M3.609 1.814A2.321 2.321 0 0 1 5.236.5c.407 0 .815.1 1.18.304l9.88 5.696-3.21 3.177L3.609 1.814z"
                />
              </svg>
              <div className="flex flex-col">
                <span className="text-[10px] text-gray-500 leading-none">
                  {t("reviews.availableOn")}
                </span>
                <span className="font-bold text-gray-900 text-sm leading-tight">
                  {t("reviews.googlePlay")}
                </span>
              </div>
              <div className="flex items-center gap-1.5 ml-2 pl-3 border-l border-gray-200">
                <div className="flex text-yellow-400 gap-0.5">
                  <Star className="h-3 w-3 fill-current" />
                  <Star className="h-3 w-3 fill-current" />
                  <Star className="h-3 w-3 fill-current" />
                  <Star className="h-3 w-3 fill-current" />
                  <Star className="h-3 w-3 fill-current" />
                </div>
                <span className="text-gray-900 font-bold text-sm">4.5</span>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: t("reviews.review1Name"),
                role: t("reviews.review1Role"),
                desc: t("reviews.review1Desc"),
                img: "https://i.pravatar.cc/150?u=5",
              },
              {
                name: t("reviews.review2Name"),
                role: t("reviews.review2Role"),
                desc: t("reviews.review2Desc"),
                img: "https://i.pravatar.cc/150?u=8",
              },
              {
                name: t("reviews.review3Name"),
                role: t("reviews.review3Role"),
                desc: t("reviews.review3Desc"),
                img: "https://i.pravatar.cc/150?u=3",
              },
            ].map((review, i) => (
              <Card
                key={i}
                className="border-0 shadow-sm hover:shadow-lg transition-shadow duration-300 bg-white rounded-2xl"
              >
                <CardContent className="p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <Avatar className="h-12 w-12 border border-gray-100">
                      <AvatarImage src={review.img} />
                      <AvatarFallback>{review.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="text-left">
                      <h4 className="font-bold text-gray-900 leading-tight">
                        {review.name}
                      </h4>
                      <div className="flex items-center text-emerald-500 text-xs font-medium mt-0.5">
                        <CheckCircle2 className="h-3 w-3 mr-1 fill-emerald-500 text-white" />{" "}
                        {t("reviews.verified")}
                      </div>
                    </div>
                  </div>
                  <h5 className="font-bold text-gray-900 mb-3">
                    {review.role}
                  </h5>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    {review.desc}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer Form */}
      <section className="py-12 container mx-auto px-4">
        <div className="bg-emerald-50/50 rounded-2xl p-6 md:p-12 border border-emerald-100 text-center max-w-5xl mx-auto relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-transparent via-primary/20 to-transparent"></div>

          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 leading-tight">
            {t("footer.title")}
            <br />
            {t("footer.subtitle")}
          </h2>
          <p className="text-gray-500 mb-10 text-lg">
            {t("footer.description")}
          </p>

          <PhoneInput
            phoneNumber={footerPhone.value}
            onPhoneChange={footerPhone.handleChange}
            selectedCountry={footerPhone.country}
            onCountryChange={footerPhone.handleCountryChange}
            countries={countries}
            isValid={footerPhone.isValid}
            onSearch={footerPhone.handleSearch}
            currentDigits={footerPhone.digitCount}
            maxDigits={footerPhone.maxDigits}
            variant="footer"
          />
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 bg-white border-t border-gray-100">
        <div className="container mx-auto px-4 flex flex-col items-center gap-10">
          <div className="flex gap-8 text-gray-300">
            <a
              href="#"
              className="hover:text-primary hover:scale-110 transition-all"
            >
              <span className="sr-only">Facebook</span>
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </a>
            <a
              href="#"
              className="hover:text-primary hover:scale-110 transition-all"
            >
              <span className="sr-only">X</span>
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            <a
              href="#"
              className="hover:text-primary hover:scale-110 transition-all"
            >
              <span className="sr-only">LinkedIn</span>
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </a>
            <a
              href="#"
              className="hover:text-primary hover:scale-110 transition-all"
            >
              <span className="sr-only">Instagram</span>
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.069-4.85.069-3.204 0-3.584-.012-4.849-.069-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>
          </div>

          <div className="text-center text-gray-400 text-xs space-y-4">
            <p>{t("common.copyright")}</p>
            <p>{t("common.allRightsReserved")}</p>
            <div className="flex justify-center gap-6 mt-4">
              <a
                href="#"
                className="underline hover:text-gray-600 transition-colors"
              >
                {t("common.privacy")}
              </a>
              <a
                href="#"
                className="underline hover:text-gray-600 transition-colors"
              >
                {t("common.terms")}
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
