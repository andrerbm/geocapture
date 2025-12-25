import { useTranslation } from "react-i18next";
import { Tablet, Shield, Globe } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function WhyChooseSection() {
  const { t } = useTranslation();

  const cards = [
    {
      icon: Tablet,
      title: t("whyChoose.card1.title"),
      description: t("whyChoose.card1.description"),
      iconColor: "bg-emerald-50 text-emerald-600",
    },
    {
      icon: Shield,
      title: t("whyChoose.card2.title"),
      description: t("whyChoose.card2.description"),
      iconColor: "bg-blue-50 text-blue-600",
    },
    {
      icon: Globe,
      title: t("whyChoose.card3.title"),
      description: t("whyChoose.card3.description"),
      iconColor: "bg-purple-50 text-purple-600",
    },
  ];

  return (
    <section className="py-10 md:py-12 bg-gradient-to-b from-white to-emerald-50/30">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-8 md:mb-10">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
            {t("whyChoose.title")}
          </h2>
          <p className="text-gray-600 text-sm font-medium">
            {t("whyChoose.subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {cards.map((card, i) => (
            <Card
              key={i}
              className="border-0 shadow-md hover:shadow-xl transition-all duration-300 bg-white rounded-xl overflow-hidden group hover:-translate-y-1"
            >
              <CardContent className="p-5 md:p-6 flex flex-col items-center text-center gap-3 h-full">
                <div
                  className={`w-11 h-11 md:w-12 md:h-12 rounded-xl flex items-center justify-center ${card.iconColor} flex-shrink-0 group-hover:scale-105 transition-transform duration-300`}
                >
                  <card.icon className="h-5 w-5 md:h-6 md:w-6 stroke-[1.5]" />
                </div>
                <div className="flex-1 flex flex-col gap-2">
                  <h3 className="font-bold text-gray-900 text-base md:text-lg leading-tight">
                    {card.title}
                  </h3>
                  <p className="text-gray-700 text-xs md:text-sm leading-relaxed font-medium">
                    {card.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

