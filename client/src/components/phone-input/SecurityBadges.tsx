import { memo } from "react";
import { useTranslation } from "react-i18next";
import { ShieldCheck, Zap } from "lucide-react";

interface SecurityBadgesProps {
  variant: "hero" | "footer";
}

const SecurityBadges = memo(function SecurityBadges({ variant }: SecurityBadgesProps) {
  const { t } = useTranslation();

  if (variant === "hero") {
    return (
      <div className="flex justify-between gap-4 w-full pt-2">
        <div className="flex-1 flex items-center justify-center gap-2 bg-[#e8f7f3] py-3 rounded-lg">
          <ShieldCheck className="h-4 w-4 text-[#5bb59a]" />
          <span className="text-[#5bb59a] text-xs font-bold">
            {t("hero.confidential")}
          </span>
        </div>
        <div className="flex-1 flex items-center justify-center gap-2 bg-[#e8f7f3] py-3 rounded-lg">
          <Zap className="h-4 w-4 text-[#5bb59a]" />
          <span className="text-[#5bb59a] text-xs font-bold">
            {t("hero.sslSecure")}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center gap-8 text-xs text-gray-400 mt-4">
      <span className="flex items-center gap-1.5">
        <ShieldCheck className="h-4 w-4 text-primary" />{" "}
        {t("hero.confidential")}
      </span>
      <span className="flex items-center gap-1.5">
        <Zap className="h-4 w-4 text-primary" /> {t("hero.sslSecure")}
      </span>
    </div>
  );
});

export default SecurityBadges;

