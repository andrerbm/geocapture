import { useTranslation } from "react-i18next";
import { Quote } from "lucide-react";

export default function TestimonialsSection() {
  const { t } = useTranslation();

  return (
    <section className="py-10 bg-white border-t border-gray-50">
      <div className="container mx-auto px-4 text-center max-w-6xl">
        <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-8">
          {t("testimonials.title")}
        </h2>

        <div className="relative p-6 md:p-8 bg-white rounded-xl shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] border border-gray-100 mb-10">
          <Quote className="h-6 w-6 text-primary/20 absolute top-6 left-6 rotate-180" />
          <p className="text-gray-600 italic text-base md:text-lg leading-relaxed relative z-10 pt-4 px-2 font-light">
            "{t("testimonials.quote")}"
          </p>
          <div className="mt-6 flex justify-center items-center gap-2">
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
  );
}

