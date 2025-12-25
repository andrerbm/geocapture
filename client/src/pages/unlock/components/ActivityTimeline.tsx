import { useTranslation } from "react-i18next";
import { Clock, CheckCircle2, Lock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface ActivityTimelineProps {
  lastActivityMinutes: number;
}

export default function ActivityTimeline({ lastActivityMinutes }: ActivityTimelineProps) {
  const { t } = useTranslation();

  return (
    <Card className="border border-gray-200 rounded-2xl bg-white shadow-sm">
      <CardContent className="p-4">
        <div className="flex items-center gap-2 mb-4">
          <Clock className="w-5 h-5 text-primary" />
          <h3 className="font-semibold text-gray-900">
            {t("unlock.lastActivity")}
          </h3>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-3 p-3 bg-emerald-50 border border-emerald-200 rounded-xl">
            <div className="w-2 h-2 bg-primary rounded-full" />
            <div className="flex-1">
              <p className="text-sm text-gray-900">
                {t("unlock.locationUpdated")}
              </p>
              <p className="text-xs text-gray-500">
                {t("unlock.minutesAgo", { minutes: lastActivityMinutes })}
              </p>
            </div>
            <CheckCircle2 className="w-4 h-4 text-primary" />
          </div>

          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100">
            <div className="w-2 h-2 bg-blue-600 rounded-full" />
            <div className="flex-1">
              <p className="text-sm text-gray-900">
                {t("unlock.dataConnection")}
              </p>
              <p className="text-xs text-gray-500">
                {t("unlock.minutesAgo", { minutes: lastActivityMinutes + 3 })}
              </p>
            </div>
            <CheckCircle2 className="w-4 h-4 text-blue-600" />
          </div>

          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl opacity-60 relative overflow-hidden border border-gray-100">
            <div className="w-2 h-2 bg-gray-400 rounded-full" />
            <div className="flex-1 blur-sm">
              <p className="text-sm text-gray-900">
                {t("unlock.movementDetected")}
              </p>
              <p className="text-xs text-gray-500">
                {t("unlock.minutesAgo", { minutes: 23 })}
              </p>
            </div>
            <Lock className="w-4 h-4 text-primary" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

