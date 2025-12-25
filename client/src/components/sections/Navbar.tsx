import { useTranslation } from "react-i18next";
import { MapPin } from "lucide-react";
import LanguageSelector from "@/components/LanguageSelector";

export default function Navbar() {
  const { t } = useTranslation();

  return (
    <>
      <nav className="container mx-auto py-4 px-4 flex items-center justify-between max-w-6xl">
        <div className="text-primary font-bold text-xl tracking-tight flex items-center gap-1">
          <MapPin className="fill-primary text-white h-6 w-6" />{" "}
          {t("nav.title")}
        </div>
        <LanguageSelector />
      </nav>

      {/* Divider Line */}
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="border-t border-gray-200"></div>
      </div>
    </>
  );
}

