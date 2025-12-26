import { useTranslation } from "react-i18next";
import { Users, Search, HeartOff, Smartphone } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import LocateButton from "@/components/LocateButton";

export default function TargetAudienceSection() {
  const { t } = useTranslation();

  const cards = [
    {
      icon: HeartOff,
      question: t("targetAudience.card1.question"),
      description: t("targetAudience.card1.description"),
      cta: t("targetAudience.card1.cta"),
      iconColor: "bg-red-50 text-red-600",
    },
    {
      icon: Users,
      question: t("targetAudience.card2.question"),
      description: t("targetAudience.card2.description"),
      cta: t("targetAudience.card2.cta"),
      iconColor: "bg-emerald-50 text-emerald-600",
    },
    {
      icon: Smartphone,
      question: t("targetAudience.card3.question"),
      description: t("targetAudience.card3.description"),
      cta: t("targetAudience.card3.cta"),
      iconColor: "bg-blue-50 text-blue-600",
    },
    {
      icon: Search,
      question: t("targetAudience.card4.question"),
      description: t("targetAudience.card4.description"),
      cta: t("targetAudience.card4.cta"),
      iconColor: "bg-purple-50 text-purple-600",
    },
  ];

  return (
    <section className="py-10 md:py-12 bg-white">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-8 md:mb-10">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
            {t("targetAudience.title")}
          </h2>
          <p className="text-gray-500 text-sm">
            {t("targetAudience.subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {cards.map((card, i) => (
            <Card
              key={i}
              className="border-0 shadow-sm hover:shadow-lg transition-all duration-300 bg-gray-50 rounded-xl overflow-hidden group cursor-pointer"
            >
              <CardContent className="p-5 flex flex-col gap-3 h-full">
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center ${card.iconColor} mb-1 group-hover:scale-110 transition-transform duration-300`}
                >
                  <card.icon className="h-6 w-6 stroke-[1.5]" />
                </div>
                <h3 className="font-bold text-gray-900 text-base leading-tight">
                  {card.question}
                </h3>
                <p className="text-gray-600 text-xs leading-relaxed flex-grow">
                  {card.description}
                </p>
                <a
                  href="#"
                  className="text-emerald-600 font-semibold text-xs hover:text-emerald-700 transition-colors flex items-center gap-1 group-hover:gap-2 duration-300"
                  onClick={(e) => {
                    e.preventDefault();
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                >
                  {card.cta}
                </a>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-10 max-w-md mx-auto">
          <LocateButton size="md" />
        </div>
      </div>
    </section>
  );
}

