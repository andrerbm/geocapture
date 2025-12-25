import { useTranslation } from "react-i18next";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function FAQSection() {
  const { t } = useTranslation();

  const faqs = [
    {
      id: "item-0",
      question: t("faq.question1"),
      answer: t("faq.answer1"),
    },
    {
      id: "item-1",
      question: t("faq.question2"),
      answer: t("faq.answer2"),
    },
    {
      id: "item-2",
      question: t("faq.question3"),
      answer: t("faq.answer3"),
    },
    {
      id: "item-3",
      question: t("faq.question4"),
      answer: t("faq.answer4"),
    },
    {
      id: "item-4",
      question: t("faq.question5"),
      answer: t("faq.answer5"),
    },
  ];

  return (
    <section className="py-10 md:py-12 bg-white">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-8 md:mb-10">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
            {t("faq.title")}
          </h2>
          <p className="text-gray-500 text-sm font-medium">
            {t("faq.subtitle")}
          </p>
        </div>

        <Accordion
          type="single"
          collapsible
          defaultValue="item-0"
          className="w-full space-y-2"
        >
          {faqs.map((item) => (
            <AccordionItem
              key={item.id}
              value={item.id}
              className="border border-gray-200 rounded-xl bg-white hover:border-emerald-200 transition-colors overflow-hidden"
            >
              <AccordionTrigger className="text-left py-3 md:py-4 px-4 md:px-5 text-sm md:text-base font-semibold text-gray-900 hover:no-underline hover:text-emerald-600 transition-colors [&[data-state=open]]:text-emerald-600">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-gray-600 text-xs md:text-sm leading-relaxed pb-3 md:pb-4 px-4 md:px-5 pt-0">
                <p>{item.answer}</p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

