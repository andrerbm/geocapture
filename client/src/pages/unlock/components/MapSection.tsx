import { useTranslation } from "react-i18next";
import { MapContainer, TileLayer } from "react-leaflet";
import { Lock, MapPin, Signal, Navigation, Radio, Smartphone } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import MapController from "./MapController";
import LocationMarker from "./LocationMarker";
import "leaflet/dist/leaflet.css";

interface MapSectionProps {
  loadingLocation: boolean;
  mapCenter: [number, number];
  displayCity: string;
  displayRegion: string;
  operator: string;
  onUnlock: () => void;
}

export default function MapSection({
  loadingLocation,
  mapCenter,
  displayCity,
  displayRegion,
  operator,
  onUnlock,
}: MapSectionProps) {
  const { t } = useTranslation();

  return (
    <Card className="border border-gray-200 rounded-2xl overflow-hidden bg-white shadow-sm">
      <CardContent className="p-0">
        {/* Map Container */}
        <div className="relative h-64 w-full overflow-hidden">
          {!loadingLocation ? (
            <>
              <MapContainer
                center={mapCenter}
                zoom={15}
                style={{ height: "100%", width: "100%", zIndex: 0 }}
                zoomControl={false}
                scrollWheelZoom={false}
                doubleClickZoom={false}
                dragging={false}
                touchZoom={false}
                boxZoom={false}
                keyboard={false}
              >
                <MapController />
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  className="map-tiles"
                />
                <LocationMarker
                  position={mapCenter}
                  city={displayCity}
                  region={displayRegion}
                />
              </MapContainer>

              {/* Efeito de Radar */}
              <div className="absolute inset-0 pointer-events-none z-10">
                <div
                  className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary/60 to-transparent"
                  style={{ animation: "radar-sweep 3s ease-in-out infinite" }}
                />
              </div>

              {/* Círculos pulsantes */}
              <PulsingCircles />

              {/* Overlay de Paywall */}
              <PaywallOverlay
                displayCity={displayCity}
                displayRegion={displayRegion}
                onUnlock={onUnlock}
              />
            </>
          ) : (
            <LoadingState />
          )}
        </div>

        {/* Status Header */}
        <div className="px-4 pt-4 pb-2">
          <div className="flex items-center gap-2">
            <Smartphone className="w-5 h-5 text-primary" />
            <h3 className="font-semibold text-gray-900">
              {t("unlock.deviceStatus")}
            </h3>
            <div className="ml-auto flex items-center gap-1 text-xs text-primary">
              <div className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
              {t("common.online")}
            </div>
          </div>
        </div>

        {/* Partial data revealed */}
        <div className="p-4 pt-2">
          <div className="grid grid-cols-2 gap-3">
            {/* City - Visible */}
            <div className="bg-emerald-50/50 rounded-xl p-3 border border-emerald-100">
              <div className="flex items-center gap-2 mb-1">
                <MapPin className="w-4 h-4 text-primary" />
                <span className="text-xs text-gray-600">{t("common.city")}</span>
              </div>
              <p className="text-gray-900 font-semibold">
                {displayCity}, {displayRegion}
              </p>
            </div>

            {/* Operator - Visible */}
            <div className="bg-blue-50 rounded-xl p-3 border border-blue-100">
              <div className="flex items-center gap-2 mb-1">
                <Signal className="w-4 h-4 text-blue-600" />
                <span className="text-xs text-gray-600">{t("common.operator")}</span>
              </div>
              <p className="text-gray-900 font-semibold">{operator}</p>
            </div>

            {/* Address - Blurred */}
            <div className="bg-gray-50 rounded-xl p-3 relative overflow-hidden border border-gray-200">
              <div className="flex items-center gap-2 mb-1">
                <Navigation className="w-4 h-4 text-gray-400" />
                <span className="text-xs text-gray-600">{t("common.address")}</span>
              </div>
              <p className="text-gray-900 font-semibold blur-sm select-none">
                Rua das Flores, 123
              </p>
              <div className="absolute inset-0 flex items-center justify-center bg-white/60">
                <Lock className="w-4 h-4 text-primary" />
              </div>
            </div>

            {/* GPS - Blurred */}
            <div className="bg-gray-50 rounded-xl p-3 relative overflow-hidden border border-gray-200">
              <div className="flex items-center gap-2 mb-1">
                <Radio className="w-4 h-4 text-gray-400" />
                <span className="text-xs text-gray-600">{t("common.coordinates")}</span>
              </div>
              <p className="text-gray-900 font-semibold blur-sm select-none">
                {mapCenter[0].toFixed(4)}, {mapCenter[1].toFixed(4)}
              </p>
              <div className="absolute inset-0 flex items-center justify-center bg-white/60">
                <Lock className="w-4 h-4 text-primary" />
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function PulsingCircles() {
  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none z-[15]">
      <div className="relative w-32 h-32">
        <div
          className="absolute inset-0 w-32 h-32 bg-red-500/15 rounded-full animate-ping"
          style={{ animationDuration: "2s" }}
        />
        <div
          className="absolute inset-2 w-28 h-28 bg-red-500/25 rounded-full animate-ping"
          style={{ animationDuration: "1.5s", animationDelay: "0.3s" }}
        />
        <div
          className="absolute inset-4 w-24 h-24 bg-red-500/35 rounded-full animate-pulse"
          style={{ animationDuration: "1s" }}
        />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-red-600 rounded-full shadow-lg" />
      </div>
    </div>
  );
}

function PaywallOverlay({
  displayCity,
  displayRegion,
  onUnlock,
}: {
  displayCity: string;
  displayRegion: string;
  onUnlock: () => void;
}) {
  const { t } = useTranslation();

  return (
    <div className="absolute inset-0 backdrop-blur-[2px] bg-gradient-to-b from-white/3 via-transparent to-white/5 z-20 flex items-center justify-center">
      <div className="bg-white/98 backdrop-blur-md px-6 py-4 rounded-xl border-2 border-primary/40 flex flex-col items-center gap-3 shadow-2xl max-w-xs mx-4">
        <div className="relative">
          <div className="absolute inset-0 bg-primary rounded-full animate-ping opacity-75" />
          <div className="relative bg-primary text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
            {t("unlock.gpsActive").split("•")[0].trim()}
          </div>
        </div>

        <p className="text-sm font-semibold text-gray-900 text-center">
          {t("unlock.deviceIdentified", { city: displayCity, region: displayRegion })}
        </p>

        <Button
          className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold rounded-full shadow-lg animate-pulse"
          onClick={onUnlock}
        >
          <Lock className="w-4 h-4 mr-2" />
          {t("unlock.unlockNow")}
        </Button>
      </div>
    </div>
  );
}

function LoadingState() {
  const { t } = useTranslation();

  return (
    <div className="h-full w-full bg-gradient-to-br from-emerald-50 via-gray-50 to-blue-50 flex items-center justify-center">
      <div className="text-center">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-2" />
        <p className="text-sm text-gray-600">{t("searching.loadingMap")}</p>
      </div>
    </div>
  );
}

