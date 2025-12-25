import { useTranslation } from "react-i18next";
import { Lock, Shield, CheckCircle2, CreditCard, AlertCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatTimer } from "../useUnlockPage";

interface UnlockCTAProps {
  timeLeft: number;
  onUnlock: () => void;
}

export default function UnlockCTA({ timeLeft, onUnlock }: UnlockCTAProps) {
  const { t } = useTranslation();

  return (
    <Card className="border-2 border-primary/50 rounded-2xl overflow-hidden bg-emerald-50/30 shadow-lg">
      <CardContent className="p-6">
        <div className="text-center mb-4">
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            {t("unlock.unlockTitle")}
          </h3>

          {/* Timer de Urgência */}
          <div className="inline-flex items-center gap-2 bg-red-50 border border-red-200 px-3 py-1.5 rounded-full mb-3">
            <AlertCircle className="w-4 h-4 text-red-600" />
            <span className="text-sm font-semibold text-red-600">
              {t("unlock.expiresIn", { time: formatTimer(timeLeft) })}
            </span>
          </div>

          <p className="text-gray-600 text-sm">{t("unlock.unlockDesc")}</p>
        </div>

        {/* Reserva de Slot */}
        <div className="mb-4 text-center">
          <p className="text-xs text-gray-500 italic">
            {t("unlock.slotReserved")}
          </p>
        </div>

        <Button
          className="w-full h-14 text-base font-bold rounded-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white transition-all shadow-xl shadow-primary/25 mb-3 hover:scale-105 animate-pulse"
          onClick={onUnlock}
        >
          <Lock className="w-5 h-5 mr-2" />
          {t("unlock.unlockButton")}
        </Button>

        {/* Gatilhos de Segurança */}
        <PaymentMethods />

        {/* Trust badges */}
        <div className="flex items-center justify-center gap-4 text-xs text-gray-500">
          <div className="flex items-center gap-1">
            <Shield className="w-3 h-3" />
            <span>{t("unlock.securePayment")}</span>
          </div>
          <div className="flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" />
            <span>{t("unlock.immediateAccess")}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function PaymentMethods() {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center gap-2 mb-3">
      <div className="flex items-center gap-3 text-xs text-gray-600 flex-wrap justify-center">
        <div className="flex items-center gap-1">
          <CreditCard className="w-3.5 h-3.5" />
          <span>Cartão</span>
        </div>
        <div className="flex items-center gap-1">
          <PixIcon />
          <span>Pix</span>
        </div>
        <div className="flex items-center gap-1">
          <Lock className="w-3.5 h-3.5" />
          <span className="font-semibold">{t("unlock.paymentSecure")}</span>
        </div>
      </div>
    </div>
  );
}

function PixIcon() {
  return (
    <svg
      className="w-3.5 h-3.5"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="2"
        y="2"
        width="20"
        height="20"
        rx="4"
        fill="url(#pix-gradient)"
      />
      <path d="M8 12L12 8L16 12L12 16L8 12Z" fill="white" />
      <defs>
        <linearGradient
          id="pix-gradient"
          x1="0"
          y1="0"
          x2="24"
          y2="24"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#32BCAD" />
          <stop offset="1" stopColor="#00A8E8" />
        </linearGradient>
      </defs>
    </svg>
  );
}

