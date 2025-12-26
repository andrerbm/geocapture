import { useTranslation } from "react-i18next";
import { CheckCircle2, Shield } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import LocateButton from "@/components/LocateButton";

export default function KeyQuestionsSection() {
  const { t } = useTranslation();

  const questions = [
    {
      question: t("keyQuestions.question1"),
      answer: t("keyQuestions.answer1"),
      icon: CheckCircle2,
      color: "emerald",
    },
    {
      question: t("keyQuestions.question2"),
      answer: t("keyQuestions.answer2"),
      icon: Shield,
      color: "blue",
    },
  ];

  return (
    <section className="py-10 md:py-12 bg-gradient-to-b from-white to-emerald-50/20">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-6 md:mb-8">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
            {t("keyQuestions.title")}
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-5 mb-6">
          {questions.map((item, i) => (
            <Card
              key={i}
              className="border-2 border-emerald-200 bg-white shadow-lg hover:shadow-xl transition-shadow rounded-xl overflow-hidden"
            >
              <CardContent className="p-5 md:p-6">
                <div className="flex items-start gap-3 mb-3">
                  <div
                    className={`w-10 h-10 rounded-lg bg-${item.color}-50 flex items-center justify-center flex-shrink-0`}
                  >
                    <item.icon className={`h-5 w-5 text-${item.color}-600`} />
                  </div>
                  <h3 className="font-bold text-gray-900 text-base md:text-lg leading-tight flex-1">
                    {item.question}
                  </h3>
                </div>
                <p className="text-gray-700 text-xs md:text-sm leading-relaxed font-medium">
                  {item.answer}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-8 max-w-md mx-auto">
          <LocateButton size="md" />
        </div>
      </div>
    </section>
  );
}

