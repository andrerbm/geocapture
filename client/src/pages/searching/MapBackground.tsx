import { useMemo } from "react";
import { MapPin } from "lucide-react";
import { PhoneInfo } from "./types";
import mapImage from "@assets/generated_images/top_down_view_of_a_digital_map_interface.png";

interface MapBackgroundProps {
  phoneInfo: PhoneInfo | null;
}

const LOCATION_MARKERS = [
  { top: "25%", left: "25%", size: "w-3 h-3", delay: "0s" },
  { top: "50%", right: "33%", size: "w-2 h-2", delay: "0.5s" },
  { bottom: "33%", left: "50%", size: "w-2.5 h-2.5", delay: "1s" },
];

export default function MapBackground({ phoneInfo }: MapBackgroundProps) {
  const mapStyle = useMemo(() => {
    if (!phoneInfo) return {};

    const regionColors: Record<string, string> = {
      "Rio Grande do Norte": "hue-rotate-15",
      "São Paulo": "saturate-50",
      "Rio de Janeiro": "brightness-110",
    };

    return {
      filter: regionColors[phoneInfo.data.region] || "",
    };
  }, [phoneInfo]);

  return (
    <div className="absolute inset-0 z-0">
      <img
        src={mapImage}
        alt="Map Background"
        className="w-full h-full object-cover opacity-60 brightness-75 transition-all duration-1000"
        style={mapStyle}
        loading="eager"
        fetchPriority="high"
        decoding="async"
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-gray-900/50" />

      {/* Animated scanning lines */}
      <ScanningLines />

      {/* Pulsing location markers */}
      <LocationMarkers />

      {/* Região detectada */}
      {phoneInfo && <RegionBadge phoneInfo={phoneInfo} />}
    </div>
  );
}

function ScanningLines() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div
        className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#00Cba9]/50 to-transparent"
        style={{ animation: "scan 3s ease-in-out infinite" }}
      />
      <div
        className="absolute top-1/3 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00Cba9]/30 to-transparent"
        style={{ animation: "scan 4s ease-in-out infinite", animationDelay: "1s" }}
      />
    </div>
  );
}

function LocationMarkers() {
  return (
    <div className="absolute inset-0 pointer-events-none">
      {LOCATION_MARKERS.map((marker, idx) => (
        <div
          key={idx}
          className={`absolute ${marker.size} bg-[#00Cba9] rounded-full animate-ping`}
          style={{
            top: marker.top,
            left: marker.left,
            right: marker.right,
            bottom: marker.bottom,
            animationDelay: marker.delay,
            opacity: 0.6 - idx * 0.2,
          }}
        />
      ))}
    </div>
  );
}

function RegionBadge({ phoneInfo }: { phoneInfo: PhoneInfo }) {
  return (
    <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm px-4 py-2 rounded-lg border border-[#00Cba9]/30 animate-in fade-in slide-in-from-right duration-500">
      <div className="flex items-center gap-2 text-white text-sm">
        <MapPin className="w-4 h-4 text-[#00Cba9]" />
        <div>
          <div className="font-semibold">{phoneInfo.data.region}</div>
          <div className="text-xs text-gray-300">
            {phoneInfo.data.country} • {phoneInfo.data.type}
          </div>
        </div>
      </div>
    </div>
  );
}

