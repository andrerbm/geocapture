import { useTranslation } from "react-i18next";
import { MapPin, Activity, Smartphone, Radio, CheckCircle2 } from "lucide-react";
import dashboardPng from "@assets/dashboard.png";
import LocateButton from "@/components/LocateButton";

export default function DashboardPreviewSection() {
  const { t } = useTranslation();

  const features = [
    {
      icon: MapPin,
      title: t("dashboard.feature1Title"),
      description: t("dashboard.feature1Desc"),
      color: "text-cyan-600 bg-cyan-50",
    },
    {
      icon: Activity,
      title: t("dashboard.feature2Title"),
      description: t("dashboard.feature2Desc"),
      color: "text-blue-600 bg-blue-50",
    },
    {
      icon: Smartphone,
      title: t("dashboard.feature3Title"),
      description: t("dashboard.feature3Desc"),
      color: "text-purple-600 bg-purple-50",
    },
    {
      icon: Radio,
      title: t("dashboard.feature4Title"),
      description: t("dashboard.feature4Desc"),
      color: "text-emerald-600 bg-emerald-50",
    },
  ];

  return (
    <section className="py-10 md:py-14 bg-white relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/40 via-white to-blue-50/30 pointer-events-none"></div>

      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        <div className="text-center mb-8 md:mb-10">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
            {t("dashboard.title")}
          </h2>
          <p className="text-gray-600 text-sm font-medium max-w-2xl mx-auto">
            {t("dashboard.subtitle")}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 md:gap-8 items-center">
          {/* Dashboard Mockup */}
          <div className="order-2 lg:order-1">
            <div className="relative group">
              {/* Browser Chrome */}
              <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200 transition-all duration-500 group-hover:shadow-3xl group-hover:-translate-y-2">
                {/* Browser Header */}
                <div className="bg-gray-100 px-4 py-3 flex items-center gap-2 border-b border-gray-200">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-400"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                    <div className="w-3 h-3 rounded-full bg-green-400"></div>
                  </div>
                  <div className="flex-1 mx-4">
                    <div className="bg-white rounded-md px-3 py-1 text-xs text-gray-500 flex items-center gap-2">
                      <svg
                        className="w-3 h-3 text-green-600"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span>geocapture.app/tracking</span>
                    </div>
                  </div>
                </div>
                {/* Dashboard Image */}
                <div className="relative bg-gray-50">
                  <img
                    src={dashboardPng}
                    alt="Dashboard Preview"
                    className="w-full h-auto object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-white/10 to-transparent pointer-events-none"></div>
                </div>
              </div>

              {/* Floating badge */}
              <div className="absolute -top-4 -right-4 bg-emerald-500 text-white px-4 py-2 rounded-full shadow-lg font-bold text-sm flex items-center gap-2 animate-pulse">
                <CheckCircle2 className="w-4 h-4" />
                {t("dashboard.badge")}
              </div>
            </div>
          </div>

          {/* Features List */}
          <div className="order-1 lg:order-2 space-y-4">
            {features.map((feature, i) => (
              <div
                key={i}
                className="flex items-start gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors duration-300 group/item"
              >
                <div
                  className={`w-10 h-10 rounded-lg flex items-center justify-center ${feature.color} flex-shrink-0 group-hover/item:scale-110 transition-transform duration-300`}
                >
                  <feature.icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-sm mb-0.5">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-xs leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 max-w-md mx-auto">
          <LocateButton size="md" />
        </div>
      </div>
    </section>
  );
}

