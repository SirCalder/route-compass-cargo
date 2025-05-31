import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface MapProps {
  originLocation: string;
  height?: string;
  onMapClick?: (location: string) => void;
  showRoute?: boolean;
}

// Apenas esses estados permitidos
const estadosPermitidos = ['Santa Catarina', 'Paraná', 'São Paulo'];

const Map = ({ originLocation, height = '300px', onMapClick }: MapProps) => {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const leafletMap = useRef<L.Map | null>(null);
  const markerRef = useRef<L.Marker | null>(null);

  useEffect(() => {
    if (mapRef.current && !leafletMap.current) {
      leafletMap.current = L.map(mapRef.current).setView([-26.7772, -51.0125], 13); // Caçador, SC

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(leafletMap.current);

      leafletMap.current.on('click', async (e: L.LeafletMouseEvent) => {
        const { lat, lng } = e.latlng;

        // Reverse geocoding com details
        const response = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json&addressdetails=1`);
        const data = await response.json();

        const estado = data?.address?.state;

        if (estadosPermitidos.includes(estado)) {
          const latlng = L.latLng(lat, lng);
          if (markerRef.current) {
            markerRef.current.setLatLng(latlng);
          } else {
            markerRef.current = L.marker(latlng).addTo(leafletMap.current!);
          }

          const locationName = data.display_name;
          onMapClick?.(locationName);
        } else {
          alert('Por favor, selecione uma localização em SC, PR ou SP.');
        }
      });
    }
  }, []);

  useEffect(() => {
    if (leafletMap.current && originLocation) {
      fetch(`https://nominatim.openstreetmap.org/search?format=json&addressdetails=1&countrycodes=br&q=${encodeURIComponent(originLocation)}`)
        .then(res => res.json())
        .then(data => {
          const resultadoValido = data.find(
            (item: any) => estadosPermitidos.includes(item.address?.state)
          );

          if (resultadoValido) {
            const { lat, lon } = resultadoValido;
            const latlng = L.latLng(parseFloat(lat), parseFloat(lon));
            leafletMap.current!.setView(latlng, 13);

            if (markerRef.current) {
              markerRef.current.setLatLng(latlng);
            } else {
              markerRef.current = L.marker(latlng).addTo(leafletMap.current!);
            }
          } else {
            alert('Localização fora dos estados permitidos (SC, PR ou SP).');
          }
        });
    }
  }, [originLocation]);

  return (
    <div
      ref={mapRef}
      style={{ height, zIndex: 0, position: 'relative' }}
      className="rounded-xl overflow-hidden"
    />
  );
};

export default Map;
