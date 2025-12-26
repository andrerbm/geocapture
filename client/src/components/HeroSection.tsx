import { CountryCode } from "libphonenumber-js";
import { useTranslation } from "react-i18next";
import PhoneInput from "./PhoneInput";

interface Country {
  code: CountryCode;
  name: string;
  dialCode: string;
  FlagComponent?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

interface HeroSectionProps {
  phoneNumber: string;
  onPhoneChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  selectedCountry: CountryCode;
  onCountryChange: (value: string) => void;
  countries: Country[];
  isValid: boolean;
  showInvalid: boolean;
  onSearch: () => void;
}

export default function HeroSection({
  phoneNumber,
  onPhoneChange,
  selectedCountry,
  onCountryChange,
  countries,
  isValid,
  showInvalid,
  onSearch,
}: HeroSectionProps) {
  const { t } = useTranslation();

  return (
    <section className="container mx-auto px-4 py-6 md:py-10 grid md:grid-cols-2 gap-8 md:gap-10 items-center max-w-6xl">
      <div className="space-y-4">
        {/* Branch Header */}
        <div className="flex flex-col items-center justify-center text-center space-y-1">
          <div className="flex items-center gap-1.5 md:gap-3">
            <img
              src="/branch-right.png"
              alt="Branch"
              className="w-8 h-14 md:w-9 md:h-16 object-contain transform scale-x-[-1]"
            />
            <div className="flex flex-col">
              <span className="text-emerald-500 font-bold text-lg md:text-xl leading-tight">
                {t("hero.users")}
              </span>
              <span className="text-gray-400 text-xs md:text-sm font-medium">
                {t("hero.trusted")}
              </span>
            </div>
            <img
              src="/branch-right.png"
              alt="Branch"
              className="w-8 h-14 md:w-9 md:h-16 object-contain"
            />
          </div>
        </div>

        {/* Main Headline */}
        <div className="text-center space-y-2">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight tracking-tight">
            {t("hero.title")}
          </h1>
          <p className="text-gray-500 text-sm md:text-base pt-1">
            {t("hero.subtitle")}
          </p>

          {/* Device Pills */}
          <div className="flex justify-center gap-1.5 md:gap-2 pt-3">
            <div className="flex items-center gap-1 md:gap-1.5 px-2 md:px-3 py-1 md:py-1.5 rounded-full border border-gray-300 bg-white text-gray-700 text-[10px] md:text-xs whitespace-nowrap">
              <svg
                className="w-3 h-3 md:w-3.5 md:h-3.5 fill-current flex-shrink-0"
                viewBox="0 0 384 512"
              >
                <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 52.3-11.4 69.5-34.3z" />
              </svg>
              {t("hero.ios")}
            </div>
            <div className="flex items-center gap-1 md:gap-1.5 px-2 md:px-3 py-1 md:py-1.5 rounded-full border border-gray-300 bg-white text-gray-700 text-[10px] md:text-xs whitespace-nowrap">
              <svg
                className="w-3 h-3 md:w-3.5 md:h-3.5 fill-current flex-shrink-0"
                viewBox="0 0 576 512"
              >
                <path d="M420.55,301.93a24,24,0,1,1,24-24,24,24,0,0,1-24,24m-265.1,0a24,24,0,1,1,24-24,24,24,0,0,1-24,24m273.7-144.48,47.94-83a10,10,0,1,0-17.27-10l-48.54,84.07a288.8,288.8,0,0,0-246.56,0l-48.54-84.07a10,10,0,1,0-17.27,10l47.94,83C64.53,202.22,8.24,285.55,0,384H576c-8.24-98.45-64.54-181.78-146.85-226.55" />
              </svg>
              {t("hero.android")}
            </div>
            <div className="flex items-center gap-1 md:gap-1.5 px-2 md:px-3 py-1 md:py-1.5 rounded-full border border-gray-300 bg-white text-gray-700 text-[10px] md:text-xs">
              <svg
                className="w-3 h-3 md:w-3.5 md:h-3.5 flex-shrink-0"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                <line x1="8" y1="21" x2="16" y2="21"></line>
                <line x1="12" y1="17" x2="12" y2="21"></line>
              </svg>
              <span className="text-center leading-tight">
                <span className="md:hidden">
                  {t("hero.allDevices").split(" ")[0]}
                  <br />
                  {t("hero.allDevices").split(" ").slice(1).join(" ")}
                </span>
                <span className="hidden md:inline">{t("hero.allDevices")}</span>
              </span>
            </div>
            <div className="flex items-center gap-1 md:gap-1.5 px-2 md:px-3 py-1 md:py-1.5 rounded-full border border-gray-300 bg-white text-gray-700 text-[10px] md:text-xs">
              <svg
                className="w-3 h-3 md:w-3.5 md:h-3.5 flex-shrink-0"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="2" y1="12" x2="22" y2="12"></line>
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
              </svg>
              <span className="text-center leading-tight">
                <span className="md:hidden">
                  {t("hero.anyNetwork").split(" ")[0]}
                  <br />
                  {t("hero.anyNetwork").split(" ").slice(1).join(" ")}
                </span>
                <span className="hidden md:inline">{t("hero.anyNetwork")}</span>
              </span>
            </div>
          </div>
        </div>

        <PhoneInput
          phoneNumber={phoneNumber}
          onPhoneChange={onPhoneChange}
          selectedCountry={selectedCountry}
          onCountryChange={onCountryChange}
          countries={countries}
          isValid={isValid}
          showInvalid={showInvalid}
          onSearch={onSearch}
          variant="hero"
        />
      </div>

      <div className="relative rounded-2xl overflow-hidden aspect-[4/3] shadow-xl border-4 border-white ring-1 ring-gray-100">
        <img
          src="/Gemini_Generated_Image_x4pmlax4pmlax4pm.png"
          alt="Location Tracking"
          className="w-full h-full object-cover"
        />

        {/* Radar effect overlay */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
          <div className="absolute w-48 h-48 border border-white/20 rounded-full animate-[ping_3s_linear_infinite]"></div>
          <div className="absolute w-36 h-36 border border-white/30 rounded-full"></div>
          <div className="absolute w-24 h-24 border border-white/40 rounded-full"></div>
        </div>

        {/* Camera UI overlay */}
        <div className="absolute inset-0 pointer-events-none p-4 flex flex-col justify-between">
          <div className="flex justify-between">
            <div className="w-8 h-8 border-t-2 border-l-2 border-white rounded-tl-xl"></div>
            <div className="w-8 h-8 border-t-2 border-r-2 border-white rounded-tr-xl"></div>
          </div>
          <div className="flex justify-between items-end">
            <div className="w-8 h-8 border-b-2 border-l-2 border-white rounded-bl-xl"></div>
            <div className="flex items-center gap-1.5 bg-black/40 px-2 py-0.5 rounded-full backdrop-blur-sm mb-1">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
              <span className="text-white font-mono font-bold tracking-widest text-[10px]">
                REC
              </span>
            </div>
            <div className="w-8 h-8 border-b-2 border-r-2 border-white rounded-br-xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
