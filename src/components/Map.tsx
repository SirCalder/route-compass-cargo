import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface MapProps {
  originLocation: string;
  height?: string;
  onMapClick?: (location: string) => void;
}

const Map = ({ originLocation, height = '300px', onMapClick }: MapProps) => {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const leafletMap = useRef<L.Map | null>(null);
  const markerRef = useRef<L.Marker | null>(null);

  useEffect(() => {
    if (mapRef.current && !leafletMap.current) {
      leafletMap.current = L.map(mapRef.current).setView([-27.5954, -48.5480], 8); // Florianópolis, SC

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(leafletMap.current);

      leafletMap.current.on('click', async (e: L.LeafletMouseEvent) => {
        const latlng = e.latlng;
        const { lat, lng } = latlng;

        if (markerRef.current) {
          markerRef.current.setLatLng(latlng);
        } else {
          markerRef.current = L.marker(latlng).addTo(leafletMap.current!);
        }

        const response = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`);
        const data = await response.json();
        const locationName = data.display_name;

        onMapClick?.(locationName);
      });
    }
  }, []);

  useEffect(() => {
    if (leafletMap.current && originLocation) {
      fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(originLocation)}`)
        .then(res => res.json())
        .then(data => {
          if (data[0]) {
            const { lat, lon } = data[0];
            const latlng = L.latLng(parseFloat(lat), parseFloat(lon));
            leafletMap.current!.setView(latlng, 13);

            if (markerRef.current) {
              markerRef.current.setLatLng(latlng);
            } else {
              markerRef.current = L.marker(latlng).addTo(leafletMap.current!);
            }
          }
        });
    }
  }, [originLocation]);

  return <div ref={mapRef} style={{ height }} className="rounded-xl overflow-hidden" />;
};

export default Map;
