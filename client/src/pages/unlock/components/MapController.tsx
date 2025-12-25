import { useEffect } from "react";
import { useMap } from "react-leaflet";

export default function MapController() {
  const map = useMap();

  useEffect(() => {
    map.dragging.disable();
    map.touchZoom.disable();
    map.doubleClickZoom.disable();
    map.scrollWheelZoom.disable();
    map.boxZoom.disable();
    map.keyboard.disable();
    
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
      
      if ("tap" in map && (map as any).tap) {
        (map as any).tap.enable();
      }
    };
  }, [map]);

  return null;
}

