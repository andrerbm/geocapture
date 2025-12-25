import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import preciseGpsSvg from "@assets/precise_gps.svg";
import modernMlSvg from "@assets/modern_ml.svg";
import wideRangeSvg from "@assets/wide_range.svg";

export default function TechnologiesSection() {
  const { t } = useTranslation();

  const technologies = [
    {
      svg: preciseGpsSvg,
      title: t("technologies.gpsTracking"),
      desc: t("technologies.gpsDesc"),
    },
    {
      svg: modernMlSvg,
      title: t("technologies.mlAlgorithms"),
      desc: t("technologies.mlDesc"),
    },
    {
      svg: wideRangeSvg,
      title: t("technologies.iotDevices"),
      desc: t("technologies.iotDesc"),
    },
  ];

  return (
    <section className="py-10 bg-white">
      <div className="container mx-auto px-4 text-center max-w-6xl">
        <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-8">
          {t("technologies.title")}
        </h2>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {technologies.map((tech, i) => (
            <div
              key={i}
              className="bg-emerald-50/30 rounded-xl p-5 md:p-6 flex flex-col items-center gap-4 hover:bg-emerald-50/60 transition-colors border border-emerald-100/50"
            >
              <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center shadow-sm mb-1 border border-emerald-100 overflow-hidden">
                <img
                  src={tech.svg}
                  alt={tech.title}
                  className="w-full h-full object-contain p-2"
                />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-sm md:text-base mb-1">
                  {tech.title}
                </h3>
                <p className="text-gray-500 text-xs font-medium">
                  {tech.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        <Button className="h-12 px-8 text-base font-bold rounded-full shadow-2xl shadow-emerald-600/30 bg-emerald-600 hover:bg-emerald-700 transition-all hover:scale-105 border-2 border-emerald-700">
          {t("technologies.tryNow")}
        </Button>
      </div>
    </section>
  );
}

