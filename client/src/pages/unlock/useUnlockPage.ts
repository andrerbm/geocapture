import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { IPLocationData } from "./types";
import { LOCATION_DATA, TESTIMONIALS, DEFAULT_LOCATION } from "./constants";

export function useUnlockPage() {
  const { t } = useTranslation();
  const [, setLocation] = useLocation();
  const [ipLocation, setIpLocation] = useState<IPLocationData | null>(null);
  const [loadingLocation, setLoadingLocation] = useState(true);
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
  const currentLocation = LOCATION_DATA[ddd] || {
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
          setIpLocation(DEFAULT_LOCATION);
        }
      } catch (error) {
        console.error("Erro ao buscar localização IP:", error);
        setIpLocation(DEFAULT_LOCATION);
      } finally {
        setLoadingLocation(false);
      }
    };

    fetchIPLocation();
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
        TESTIMONIALS[Math.floor(Math.random() * TESTIMONIALS.length)];
      setToastMessage(
        t("unlock.socialProof", {
          name: randomTestimonial.name,
          city: randomTestimonial.city,
        })
      );
      setShowToast(true);

      setTimeout(() => {
        setShowToast(false);
      }, 4000);
    };

    const firstToast = setTimeout(showRandomToast, 3000);
    const toastInterval = setInterval(
      showRandomToast,
      Math.random() * 4000 + 8000
    );

    return () => {
      clearTimeout(firstToast);
      clearInterval(toastInterval);
    };
  }, [t]);

  const handleUnlock = () => {
    setLocation(`/payment?phone=${encodeURIComponent(phoneNumber)}`);
  };

  const hideToast = () => setShowToast(false);

  // Generate random last activity time (1-15 minutes ago)
  const lastActivityMinutes = Math.floor(Math.random() * 14) + 1;

  // Coordenadas para o mapa (usar IP ou fallback)
  const mapCenter: [number, number] =
    ipLocation?.lat && ipLocation?.lon
      ? [ipLocation.lat, ipLocation.lon]
      : [-5.7945, -35.211];

  // Cidade e região para exibição (usar IP ou fallback)
  const displayCity = ipLocation?.city || currentLocation.city;
  const displayRegion =
    ipLocation?.regionName || ipLocation?.region || currentLocation.state;

  return {
    phoneNumber,
    currentLocation,
    ipLocation,
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
  };
}

export function formatTimer(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, "0")}:${secs
    .toString()
    .padStart(2, "0")}`;
}

