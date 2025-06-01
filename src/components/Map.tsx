// src/components/Map.tsx
import React from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useRoute } from '../contexts/RouteContext';
import RoutingMachine from './RoutingControl';
import L from 'leaflet';

import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';





delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: iconRetinaUrl,
  iconUrl: iconUrl,
  shadowUrl: shadowUrl,
});

const MapComponent: React.FC = () => {
  console.log('DEBUG: Conteúdo de import.meta.env:', import.meta.env);
  console.log('DEBUG: Valor de VITE_GRAPHHOPPER_API_KEY:', import.meta.env.VITE_GRAPHHOPPER_API_KEY);
  console.log('DEBUG: Valor de VITE_TEST_VAR:', import.meta.env.VITE_TEST_VAR); // Se você adicionou a variável de teste


  const { originCoordinates, destinationCoordinates, setRouteSummary, setRouteInstructions } = useRoute(); 
  console.log('MapComponent: originCoordinates do contexto:', originCoordinates); // <--- ADICIONE AQUI
  console.log('MapComponent: destinationCoordinates do contexto:', destinationCoordinates); // <--- ADICIONE AQUI
  const graphHopperApiKey = import.meta.env.VITE_GRAPHHOPPER_API_KEY;

  if (!graphHopperApiKey) {
    console.error("Chave da API GraphHopper não configurada!");
    return <div className="flex justify-center items-center h-full"><p className="text-red-500 p-4 bg-red-100 rounded-md">Erro de configuração: Chave da API de roteamento não encontrada.</p></div>;
  }

  const waypoints: L.LatLng[] = [];
  if (originCoordinates) {
    waypoints.push(originCoordinates);
  }
  if (destinationCoordinates) {
    waypoints.push(destinationCoordinates);
  }

  const handleRouteFound = (data: {
    summary: { totalDistance: number; totalTime: number };
    instructions: L.Routing.Instruction[];
  }) => { //
    setRouteSummary(data.summary); //
    setRouteInstructions(data.instructions); // Chamar a nova função do contexto
  };

  const initialCenter: L.LatLngExpression = destinationCoordinates || [-27.290796, -49.995972];
  const initialZoom = destinationCoordinates ? 13 : 7;

  const mapStyle: React.CSSProperties = {
    height: '100%',
    width: '100%',
    minHeight: '400px' // Garante uma altura mínima para visualização
  };

  return (
    <MapContainer
      center={initialCenter}
      zoom={initialZoom}
      style={mapStyle}
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {waypoints.length >= 2 && (
        <RoutingMachine
          waypoints={waypoints}
          graphHopperApiKey={graphHopperApiKey}
          onRouteFound={handleRouteFound}
        // show={false} // Descomente para ocultar o painel de itinerário do LRM
        />
      )}
    </MapContainer>
  );
};

export default MapComponent;