import { useState, useCallback, useEffect } from "react";
import { useLocation } from "wouter";
import { CountryCode } from "libphonenumber-js";
import { useCountryDetection } from "@/hooks/use-country-detection";
import { usePhoneField } from "@/hooks/use-phone-field";
import { countries } from "@/lib/phone-utils";
import HeroSection from "@/components/HeroSection";
import StickyPhoneInput from "@/components/StickyPhoneInput";
import {
  Navbar,
  TargetAudienceSection,
  WhyChooseSection,
  DashboardPreviewSection,
  TechnologiesSection,
  TestimonialsSection,
  HowItWorksSection,
  ReviewsSection,
  KeyQuestionsSection,
  FAQSection,
  FooterFormSection,
  Footer,
} from "@/components/sections";

export default function Home() {
  const [, setLocation] = useLocation();
  const { countryCode: detectedCountry, isLoading: isDetectingCountry } =
    useCountryDetection();
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

  // Phone fields
  const heroPhone = usePhoneField(defaultCountry, navigateToSearching);
  const footerPhone = usePhoneField(defaultCountry, navigateToSearching);
  const stickyPhone = usePhoneField(defaultCountry, navigateToSearching);

  return (
    <div className="min-h-screen bg-white font-sans overflow-x-hidden">
      <Navbar />

      <HeroSection
        phoneNumber={heroPhone.value}
        onPhoneChange={heroPhone.handleChange}
        selectedCountry={heroPhone.country}
        onCountryChange={heroPhone.handleCountryChange}
        countries={countries}
        isValid={heroPhone.isValid}
        showInvalid={heroPhone.showInvalid}
        onSearch={heroPhone.handleSearch}
      />

      <TargetAudienceSection />
      <WhyChooseSection />
      <DashboardPreviewSection />
      <TechnologiesSection />
      <TestimonialsSection />
      <HowItWorksSection />
      <ReviewsSection />
      <KeyQuestionsSection />
      <FAQSection />

      <FooterFormSection
        phoneNumber={footerPhone.value}
        onPhoneChange={footerPhone.handleChange}
        selectedCountry={footerPhone.country}
        onCountryChange={footerPhone.handleCountryChange}
        countries={countries}
        isValid={footerPhone.isValid}
        showInvalid={footerPhone.showInvalid}
        onSearch={footerPhone.handleSearch}
      />

      <Footer />

      <StickyPhoneInput
        phoneNumber={stickyPhone.value}
        onPhoneChange={stickyPhone.handleChange}
        selectedCountry={stickyPhone.country}
        onCountryChange={stickyPhone.handleCountryChange}
        countries={countries}
        isValid={stickyPhone.isValid}
        showInvalid={stickyPhone.showInvalid}
        onSearch={stickyPhone.handleSearch}
      />
    </div>
  );
}
