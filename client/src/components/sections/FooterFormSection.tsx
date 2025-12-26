import { useTranslation } from "react-i18next";
import PhoneInput from "@/components/PhoneInput";
import { Country } from "@/lib/phone-utils";
import { CountryCode } from "libphonenumber-js";

interface FooterFormSectionProps {
  phoneNumber: string;
  onPhoneChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  selectedCountry: CountryCode;
  onCountryChange: (value: string) => void;
  countries: Country[];
  isValid: boolean;
  showInvalid: boolean;
  onSearch: () => void;
}

export default function FooterFormSection({
  phoneNumber,
  onPhoneChange,
  selectedCountry,
  onCountryChange,
  countries,
  isValid,
  showInvalid,
  onSearch,
}: FooterFormSectionProps) {
  const { t } = useTranslation();

  return (
    <section className="py-10 container mx-auto px-4 max-w-6xl">
      <div className="bg-emerald-50/50 rounded-xl p-5 md:p-8 border border-emerald-100 text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-transparent via-primary/20 to-transparent"></div>

        <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-6 leading-tight">
          {t("footer.title")}
          <br />
          {t("footer.subtitle")}
        </h2>
        <p className="text-gray-500 mb-8 text-sm">{t("footer.description")}</p>

        <PhoneInput
          phoneNumber={phoneNumber}
          onPhoneChange={onPhoneChange}
          selectedCountry={selectedCountry}
          onCountryChange={onCountryChange}
          countries={countries}
          isValid={isValid}
          showInvalid={showInvalid}
          onSearch={onSearch}
          variant="footer"
        />
      </div>
    </section>
  );
}
