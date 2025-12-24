import { useLocation } from "wouter";
import { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import {
  Lock,
  MapPin,
  Shield,
  CheckCircle2,
  Smartphone,
  Signal,
  Clock,
  Navigation,
  Radio,
  CreditCard,
  X,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import axios from "axios";
import { MapContainer, TileLayer, Marker, useMap, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import LanguageSelector from "@/components/LanguageSelector";

// Fix para ícones padrão do Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

// Componente para desabilitar interações do mapa
function MapController() {
  const map = useMap();

  useEffect(() => {
    map.dragging.disable();
    map.touchZoom.disable();
    map.doubleClickZoom.disable();
    map.scrollWheelZoom.disable();
    map.boxZoom.disable();
    map.keyboard.disable();
    // Desabilitar tap se disponível (propriedade opcional do Leaflet)
    if ("tap" in map && (map as any).tap) {
      (map as any).tap.disable();
    }

    return () => {
      map.dragging.enable();
      map.touchZoom.enable();
      map.doubleClickZoom.enable();
      map.scrollWheelZoom.enable();
      map.boxZoom.enable();
      map.keyboard.enable();
      // Reabilitar tap se disponível
      if ("tap" in map && (map as any).tap) {
        (map as any).tap.enable();
      }
    };
  }, [map]);

  return null;
}

// Componente Marker com popup auto-aberto
function LocationMarker({
  position,
  city,
  region,
}: {
  position: [number, number];
  city: string;
  region: string;
}) {
  const { t } = useTranslation();
  const markerRef = useRef<any>(null);

  useEffect(() => {
    if (markerRef.current) {
      // Abrir popup automaticamente após um pequeno delay
      setTimeout(() => {
        markerRef.current?.openPopup();
      }, 500);
    }
  }, []);

  return (
    <Marker
      ref={markerRef}
      position={position}
      icon={L.icon({
        iconUrl:
          "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
        shadowUrl:
          "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
        iconSize: [40, 65],
        iconAnchor: [20, 65],
        popupAnchor: [1, -65],
        shadowSize: [65, 65],
      })}
    >
      <Popup>
        <div className="text-center font-bold text-red-600 text-sm">
          {t("unlock.locationFound")}
          <br />
          <span className="text-xs text-gray-600 font-normal">
            {city}, {region}
          </span>
        </div>
      </Popup>
    </Marker>
  );
}

// Interface para dados da API IP
interface IPLocationData {
  status: string;
  lat?: number;
  lon?: number;
  city?: string;
  region?: string;
  regionName?: string;
  country?: string;
  countryCode?: string;
}

// Nomes e cidades para prova social em tempo real
const testimonials = [
  { name: "João", city: "São Paulo" },
  { name: "Maria", city: "Rio de Janeiro" },
  { name: "Carlos", city: "Belo Horizonte" },
  { name: "Ana", city: "Curitiba" },
  { name: "Pedro", city: "Porto Alegre" },
  { name: "Julia", city: "Brasília" },
  { name: "Roberto", city: "Salvador" },
  { name: "Fernanda", city: "Recife" },
];

export default function Unlock() {
  const { t } = useTranslation();
  const [_, setLocation] = useLocation();
  const [pulseActive, setPulseActive] = useState(true);
  const [ipLocation, setIpLocation] = useState<IPLocationData | null>(null);
  const [loadingLocation, setLoadingLocation] = useState(true);

  // Timer de urgência (5 minutos = 300 segundos)
  const [timeLeft, setTimeLeft] = useState(299); // 04:59
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  // Get phone number from URL
  const phoneNumber =
    new URLSearchParams(window.location.search).get("phone") ||
    "+55 84 99612-3112";

  // Extract DDD from phone number
  const extractDDD = (phone: string) => {
    const match = phone.match(/\d{2}/);
    return match ? match[0] : "84";
  };

  const ddd = extractDDD(phoneNumber);

  // Simulated data based on DDD
  const locationData: Record<
    string,
    { city: string; state: string; operator: string }
  > = {
    "11": { city: "São Paulo", state: "SP", operator: "Vivo" },
    "21": { city: "Rio de Janeiro", state: "RJ", operator: "Claro" },
    "31": { city: "Belo Horizonte", state: "MG", operator: "TIM" },
    "41": { city: "Curitiba", state: "PR", operator: "Vivo" },
    "51": { city: "Porto Alegre", state: "RS", operator: "Claro" },
    "61": { city: "Brasília", state: "DF", operator: "TIM" },
    "71": { city: "Salvador", state: "BA", operator: "Oi" },
    "81": { city: "Recife", state: "PE", operator: "Vivo" },
    "84": { city: "Natal", state: "RN", operator: "Claro" },
    "85": { city: "Fortaleza", state: "CE", operator: "TIM" },
    "91": { city: "Belém", state: "PA", operator: "Oi" },
    "92": { city: "Manaus", state: "AM", operator: "Vivo" },
  };

  const currentLocation = locationData[ddd] || {
    city: "Natal",
    state: "RN",
    operator: "Claro",
  };

  // Buscar localização via IP
  useEffect(() => {
    const fetchIPLocation = async () => {
      try {
        setLoadingLocation(true);
        const response = await axios.get<IPLocationData>(
          "http://ip-api.com/json/?fields=status,lat,lon,city,region,regionName,country,countryCode"
        );

        if (
          response.data.status === "success" &&
          response.data.lat &&
          response.data.lon
        ) {
          setIpLocation(response.data);
        } else {
          // Fallback para coordenadas padrão (Natal, RN)
          setIpLocation({
            status: "success",
            lat: -5.7945,
            lon: -35.211,
            city: "Natal",
            region: "RN",
            regionName: "Rio Grande do Norte",
            country: "Brazil",
            countryCode: "BR",
          });
        }
      } catch (error) {
        console.error("Erro ao buscar localização IP:", error);
        // Fallback para coordenadas padrão
        setIpLocation({
          status: "success",
          lat: -5.7945,
          lon: -35.211,
          city: "Natal",
          region: "RN",
          regionName: "Rio Grande do Norte",
          country: "Brazil",
          countryCode: "BR",
        });
      } finally {
        setLoadingLocation(false);
      }
    };

    fetchIPLocation();
  }, []);

  // Pulse animation toggle
  useEffect(() => {
    const interval = setInterval(() => {
      setPulseActive((prev) => !prev);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // Timer de urgência
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 0) return 0;
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Toast de prova social em tempo real
  useEffect(() => {
    const showRandomToast = () => {
      const randomTestimonial =
        testimonials[Math.floor(Math.random() * testimonials.length)];
      setToastMessage(
        t("unlock.socialProof", { name: randomTestimonial.name, city: randomTestimonial.city })
      );
      setShowToast(true);

      setTimeout(() => {
        setShowToast(false);
      }, 4000);
    };

    // Mostrar primeiro toast após 3 segundos
    const firstToast = setTimeout(showRandomToast, 3000);

    // Mostrar novos toasts a cada 8-12 segundos
    const toastInterval = setInterval(
      showRandomToast,
      Math.random() * 4000 + 8000
    );

    return () => {
      clearTimeout(firstToast);
      clearInterval(toastInterval);
    };
  }, []);

  const handleUnlock = () => {
    setLocation(`/payment?phone=${encodeURIComponent(phoneNumber)}`);
  };

  // Generate random last activity time (1-15 minutes ago)
  const lastActivityMinutes = Math.floor(Math.random() * 14) + 1;

  // Formatar timer (MM:SS)
  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  // Coordenadas para o mapa (usar IP ou fallback)
  const mapCenter: [number, number] =
    ipLocation?.lat && ipLocation?.lon
      ? [ipLocation.lat, ipLocation.lon]
      : [-5.7945, -35.211];

  // Cidade e região para exibição (usar IP ou fallback)
  const displayCity = ipLocation?.city || currentLocation.city;
  const displayRegion =
    ipLocation?.regionName || ipLocation?.region || currentLocation.state;

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
        <div className="border-t border-gray-200"></div>
      </div>

      {/* Content */}
      <div className="flex flex-col items-center justify-center p-4 py-8">
        <div className="w-full max-w-lg space-y-6">
          {/* Status Badge */}
          <div className="flex justify-center">
            <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200 px-4 py-2 rounded-full">
              <div className="relative">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <div className="absolute inset-0 w-2 h-2 bg-primary rounded-full animate-ping"></div>
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

          {/* Dynamic Map with Paywall Overlay */}
          <Card className="border border-gray-200 rounded-2xl overflow-hidden bg-white shadow-sm">
            <CardContent className="p-0">
              {/* Map Container */}
              <div className="relative h-64 w-full overflow-hidden">
                {!loadingLocation && ipLocation ? (
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
                      {/* Marcador vermelho grande e destacado com popup auto-aberto */}
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
                        style={{
                          animation: "radar-sweep 3s ease-in-out infinite",
                        }}
                      />
                    </div>

                    {/* Círculos pulsantes grandes sobre o marcador - efeito "localização encontrada" */}
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none z-[15]">
                      <div className="relative w-32 h-32">
                        {/* Círculo externo grande */}
                        <div
                          className="absolute inset-0 w-32 h-32 bg-red-500/15 rounded-full animate-ping"
                          style={{ animationDuration: "2s" }}
                        ></div>
                        {/* Círculo médio */}
                        <div
                          className="absolute inset-2 w-28 h-28 bg-red-500/25 rounded-full animate-ping"
                          style={{
                            animationDuration: "1.5s",
                            animationDelay: "0.3s",
                          }}
                        ></div>
                        {/* Círculo interno */}
                        <div
                          className="absolute inset-4 w-24 h-24 bg-red-500/35 rounded-full animate-pulse"
                          style={{ animationDuration: "1s" }}
                        ></div>
                        {/* Ponto central */}
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-red-600 rounded-full shadow-lg"></div>
                      </div>
                    </div>

                    {/* Overlay de Paywall Psicológico - Blur mínimo para mostrar mapa claramente */}
                    <div className="absolute inset-0 backdrop-blur-[2px] bg-gradient-to-b from-white/3 via-transparent to-white/5 z-20 flex items-center justify-center">
                      {/* Card de Conversão Centralizado */}
                      <div className="bg-white/98 backdrop-blur-md px-6 py-4 rounded-xl border-2 border-primary/40 flex flex-col items-center gap-3 shadow-2xl max-w-xs mx-4">
                        {/* Badge Pulsante */}
                        <div className="relative">
                          <div className="absolute inset-0 bg-primary rounded-full animate-ping opacity-75"></div>
                          <div className="relative bg-primary text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-2">
                            <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></div>
                            {t("unlock.gpsActive").split("•")[0].trim()}
                          </div>
                        </div>

                        {/* Texto Dinâmico */}
                        <p className="text-sm font-semibold text-gray-900 text-center">
                          {t("unlock.deviceIdentified", { city: displayCity, region: displayRegion })}
                        </p>

                        {/* CTA de Urgência */}
                        <Button
                          className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold rounded-full shadow-lg animate-pulse"
                          onClick={handleUnlock}
                        >
                          <Lock className="w-4 h-4 mr-2" />
                          {t("unlock.unlockNow")}
                        </Button>
                      </div>
                    </div>
                  </>
                ) : (
                  // Loading state
                  <div className="h-full w-full bg-gradient-to-br from-emerald-50 via-gray-50 to-blue-50 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
                      <p className="text-sm text-gray-600">
                        {t("searching.loadingMap")}
                      </p>
                    </div>
                  </div>
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
                    <div className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse"></div>
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
                    <p className="text-gray-900 font-semibold">
                      {currentLocation.operator}
                    </p>
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

          {/* Activity Timeline */}
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
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
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
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
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
                  <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                  <div className="flex-1 blur-sm">
                    <p className="text-sm text-gray-900">
                      {t("unlock.movementDetected")}
                    </p>
                    <p className="text-xs text-gray-500">{t("unlock.minutesAgo", { minutes: 23 })}</p>
                  </div>
                  <Lock className="w-4 h-4 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Unlock CTA */}
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

                <p className="text-gray-600 text-sm">
                  {t("unlock.unlockDesc")}
                </p>
              </div>

              {/* Reserva de Slot */}
              <div className="mb-4 text-center">
                <p className="text-xs text-gray-500 italic">
                  {t("unlock.slotReserved")}
                </p>
              </div>

              <Button
                className="w-full h-14 text-base font-bold rounded-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white transition-all shadow-xl shadow-primary/25 mb-3 hover:scale-105 animate-pulse"
                onClick={handleUnlock}
              >
                <Lock className="w-5 h-5 mr-2" />
                {t("unlock.unlockButton")}
              </Button>

              {/* Gatilhos de Segurança */}
              <div className="flex flex-col items-center gap-2 mb-3">
                <div className="flex items-center gap-3 text-xs text-gray-600 flex-wrap justify-center">
                  <div className="flex items-center gap-1">
                    <CreditCard className="w-3.5 h-3.5" />
                    <span>Cartão</span>
                  </div>
                  <div className="flex items-center gap-1">
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
                    <span>Pix</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Lock className="w-3.5 h-3.5" />
                    <span className="font-semibold">
                      {t("unlock.paymentSecure")}
                    </span>
                  </div>
                </div>
              </div>

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

          {/* Features List */}
          <Card className="border border-gray-200 rounded-2xl bg-white shadow-sm">
            <CardContent className="p-5">
              <h4 className="font-bold text-gray-900 mb-4 text-center">
                {t("unlock.whatYouGet")}
              </h4>
              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-center gap-2 p-2 bg-emerald-50/50 rounded-lg border border-emerald-100">
                  <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                  <span className="text-sm text-gray-700">
                    {t("unlock.fullAddress")}
                  </span>
                </div>
                <div className="flex items-center gap-2 p-2 bg-emerald-50/50 rounded-lg border border-emerald-100">
                  <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                  <span className="text-sm text-gray-700">{t("unlock.gpsCoordinates")}</span>
                </div>
                <div className="flex items-center gap-2 p-2 bg-emerald-50/50 rounded-lg border border-emerald-100">
                  <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                  <span className="text-sm text-gray-700">
                    {t("unlock.realtimeMap")}
                  </span>
                </div>
                <div className="flex items-center gap-2 p-2 bg-emerald-50/50 rounded-lg border border-emerald-100">
                  <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                  <span className="text-sm text-gray-700">
                    {t("unlock.fullHistory")}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Social Proof */}
          <div className="text-center space-y-2">
            <div className="flex items-center justify-center gap-1">
              {/* 4 estrelas cheias */}
              {[...Array(4)].map((_, i) => (
                <svg
                  key={i}
                  className="w-5 h-5 text-yellow-400 fill-current"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
              {/* Meia estrela (4.8/5) */}
              <svg
                className="w-5 h-5 text-yellow-400 fill-current"
                viewBox="0 0 20 20"
              >
                <defs>
                  <clipPath id="half-star">
                    <rect x="0" y="0" width="10" height="20" />
                  </clipPath>
                </defs>
                <path
                  d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                  clipPath="url(#half-star)"
                />
              </svg>
            </div>
            <p className="text-sm text-gray-600">
              {t("unlock.numbersLocated")}
            </p>
            <p className="text-xs text-gray-500 flex items-center justify-center gap-1">
              <span>{t("unlock.averageRating")}</span>
              <span className="font-semibold text-yellow-500">4.8/5</span>
              <span className="text-yellow-400">⭐</span>
            </p>
          </div>
        </div>
      </div>

      {/* Toast de Prova Social em Tempo Real */}
      {showToast && (
        <div className="fixed bottom-4 right-4 z-50 animate-in slide-in-from-right fade-in duration-300">
          <div className="bg-white border border-primary/20 rounded-lg shadow-xl px-4 py-3 flex items-center gap-3 max-w-sm">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
            <p className="text-sm text-gray-700 flex-1">
              <span className="font-semibold text-primary">{toastMessage}</span>
            </p>
            <button
              onClick={() => setShowToast(false)}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

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
        
        /* Aumentar contraste e visibilidade das ruas do mapa */
        .map-tiles {
          filter: contrast(1.4) brightness(1.15) saturate(1.4);
        }
        
        /* Garantir que o mapa seja visível através do blur */
        .leaflet-container {
          background-color: #e8e8e8;
        }
        
        /* Destacar o marcador */
        .leaflet-marker-icon {
          filter: drop-shadow(0 4px 8px rgba(220, 38, 38, 0.5));
          z-index: 1000 !important;
        }
        
        /* Estilizar popup do marcador */
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
