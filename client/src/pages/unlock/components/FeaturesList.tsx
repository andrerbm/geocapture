import { useTranslation } from "react-i18next";
import { CheckCircle2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function FeaturesList() {
  const { t } = useTranslation();

  const features = [
    t("unlock.fullAddress"),
    t("unlock.gpsCoordinates"),
    t("unlock.realtimeMap"),
    t("unlock.fullHistory"),
  ];

  return (
    <Card className="border border-gray-200 rounded-2xl bg-white shadow-sm">
      <CardContent className="p-5">
        <h4 className="font-bold text-gray-900 mb-4 text-center">
          {t("unlock.whatYouGet")}
        </h4>
        <div className="grid grid-cols-2 gap-3">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex items-center gap-2 p-2 bg-emerald-50/50 rounded-lg border border-emerald-100"
            >
              <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
              <span className="text-sm text-gray-700">{feature}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

