import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";

export default function HowItWorksSection() {
  const { t } = useTranslation();

  const steps = [
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
  ];

  return (
    <section className="py-10 md:py-12 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        {/* Header */}
        <div className="text-center mb-8 md:mb-10">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
            {t("howItWorks.title")}
          </h2>
          <p className="text-gray-500 text-sm font-medium max-w-2xl mx-auto px-4">
            {t("howItWorks.subtitle")}
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid md:grid-cols-3 gap-6 md:gap-8 relative">
          {/* Connecting Line - Desktop */}
          <div className="hidden md:block absolute top-10 left-[12%] right-[12%] h-0.5 bg-emerald-100 z-0">
            <div className="h-full bg-emerald-200 w-full"></div>
          </div>

          {steps.map((item, i) => (
            <div
              key={i}
              className="flex flex-row items-start gap-3 md:gap-4 relative z-10"
            >
              {/* Step Number */}
              <div className="relative flex-shrink-0">
                <div className="w-14 h-14 md:w-16 md:h-16 bg-emerald-50 md:bg-emerald-100 text-emerald-600 md:text-emerald-700 font-bold text-2xl md:text-3xl rounded-xl flex items-center justify-center border border-emerald-200">
                  {item.step}
                </div>
                {/* Connecting Line - Mobile */}
                {i < 2 && (
                  <div className="md:hidden absolute -right-6 top-8 w-6 h-0.5 bg-emerald-100"></div>
                )}
              </div>

              {/* Content */}
              <div className="flex flex-col gap-2 flex-1 pt-0.5">
                <h3 className="font-bold text-base md:text-lg text-gray-900 leading-tight text-left">
                  {item.title}
                </h3>
                <p className="text-gray-500 text-xs md:text-sm leading-relaxed text-left">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="text-center mt-10 md:mt-12">
          <Button
            className="h-11 md:h-12 px-7 md:px-9 text-sm md:text-base font-bold rounded-lg shadow-2xl shadow-emerald-600/30 bg-emerald-600 hover:bg-emerald-700 text-white transition-all hover:scale-105 border-2 border-emerald-700"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            {t("technologies.tryNow")}
          </Button>
        </div>
      </div>
    </section>
  );
}

