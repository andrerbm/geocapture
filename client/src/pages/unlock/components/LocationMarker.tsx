import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Marker, Popup } from "react-leaflet";
import L from "leaflet";

interface LocationMarkerProps {
  position: [number, number];
  city: string;
  region: string;
}

export default function LocationMarker({ position, city, region }: LocationMarkerProps) {
  const { t } = useTranslation();
  const markerRef = useRef<any>(null);

  useEffect(() => {
    if (markerRef.current) {
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

