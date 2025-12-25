import { useTranslation } from "react-i18next";
import { MapPin } from "lucide-react";
import LanguageSelector from "@/components/LanguageSelector";
import { useUnlockPage } from "./useUnlockPage";
import {
  MapSection,
  ActivityTimeline,
  UnlockCTA,
  FeaturesList,
  SocialProof,
  SocialProofToast,
} from "./components";
import { setupLeafletIcons } from "./leaflet-setup";

// Configurar ícones do Leaflet
setupLeafletIcons();

export default function Unlock() {
  const { t } = useTranslation();
  const {
    phoneNumber,
    currentLocation,
    loadingLocation,
    timeLeft,
    showToast,
    toastMessage,
    handleUnlock,
    hideToast,
    lastActivityMinutes,
    mapCenter,
    displayCity,
    displayRegion,
  } = useUnlockPage();

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Navigation */}
      <nav className="container mx-auto py-4 px-4 flex items-center justify-between">
        <div className="text-primary font-bold text-xl tracking-tight flex items-center gap-1">
          <MapPin className="fill-primary text-white h-6 w-6" /> {t("nav.title")}
        </div>
        <LanguageSelector />
      </nav>

      {/* Divider Line */}
      <div className="container mx-auto px-4">
        <div className="border-t border-gray-200" />
      </div>

      {/* Content */}
      <div className="flex flex-col items-center justify-center p-4 py-8">
        <div className="w-full max-w-lg space-y-6">
          {/* Status Badge */}
          <div className="flex justify-center">
            <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200 px-4 py-2 rounded-full">
              <div className="relative">
                <div className="w-2 h-2 bg-primary rounded-full" />
                <div className="absolute inset-0 w-2 h-2 bg-primary rounded-full animate-ping" />
              </div>
              <span className="text-sm font-medium text-primary">
                {t("unlock.gpsActive")}
              </span>
            </div>
          </div>

          {/* Main Title */}
          <div className="text-center space-y-2">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
              {t("unlock.numberLocated")}
            </h1>
            <p className="text-gray-600 text-lg">
              <span className="font-semibold text-primary">{phoneNumber}</span>
            </p>
          </div>

          {/* Map Section */}
          <MapSection
            loadingLocation={loadingLocation}
            mapCenter={mapCenter}
            displayCity={displayCity}
            displayRegion={displayRegion}
            operator={currentLocation.operator}
            onUnlock={handleUnlock}
          />

          {/* Activity Timeline */}
          <ActivityTimeline lastActivityMinutes={lastActivityMinutes} />

          {/* Unlock CTA */}
          <UnlockCTA timeLeft={timeLeft} onUnlock={handleUnlock} />

          {/* Features List */}
          <FeaturesList />

          {/* Social Proof */}
          <SocialProof />
        </div>
      </div>

      {/* Toast de Prova Social */}
      <SocialProofToast
        show={showToast}
        message={toastMessage}
        onClose={hideToast}
      />

      {/* CSS para animação do radar e estilização do mapa */}
      <style>{`
        @keyframes radar-sweep {
          0% {
            transform: translateY(-100%);
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            transform: translateY(400%);
            opacity: 0;
          }
        }
        
        .map-tiles {
          filter: contrast(1.4) brightness(1.15) saturate(1.4);
        }
        
        .leaflet-container {
          background-color: #e8e8e8;
        }
        
        .leaflet-marker-icon {
          filter: drop-shadow(0 4px 8px rgba(220, 38, 38, 0.5));
          z-index: 1000 !important;
        }
        
        .leaflet-popup-content-wrapper {
          background: white;
          border: 2px solid #ef4444;
          border-radius: 8px;
          box-shadow: 0 4px 12px rgba(220, 38, 38, 0.3);
        }
        
        .leaflet-popup-tip {
          background: white;
          border: 1px solid #ef4444;
        }
      `}</style>
    </div>
  );
}

