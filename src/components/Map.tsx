
import React, { useEffect, useState, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default markers in react-leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface MapProps {
  originLocation?: string;
  showRoute?: boolean;
  height?: string;
}

// Component to handle map updates without re-creating the map
function MapUpdater({ center, zoom }: { center: [number, number]; zoom: number }) {
  const map = useMap();
  
  useEffect(() => {
    if (map) {
      map.setView(center, zoom);
    }
  }, [map, center, zoom]);
  
  return null;
}

// Component for route display
function RouteDisplay({ 
  destinationCoords, 
  routeCoordinates 
}: { 
  destinationCoords: [number, number]; 
  routeCoordinates: [number, number][] 
}) {
  return (
    <>
      <Marker position={destinationCoords}>
        <Popup>
          Destino: Aeroporto Carlos Alberto da Costa Neves
        </Popup>
      </Marker>
      
      {routeCoordinates.length > 0 && (
        <Polyline 
          positions={routeCoordinates} 
          color="#454f9f" 
          weight={4}
          opacity={0.7}
        />
      )}
    </>
  );
}

const Map: React.FC<MapProps> = ({ originLocation, showRoute = false, height = "300px" }) => {
  const [routeCoordinates, setRouteCoordinates] = useState<[number, number][]>([]);
  const [originCoords, setOriginCoords] = useState<[number, number]>([-23.5505, -46.6333]);
  
  const destinationCoords: [number, number] = [-22.9218, -42.0749];

  // Default center and zoom
  const defaultCenter: [number, number] = [-23.5505, -46.6333];
  const defaultZoom = 10;
  
  // Calculate center and zoom based on current state
  const [center, setCenter] = useState<[number, number]>(defaultCenter);
  const [zoom, setZoom] = useState<number>(defaultZoom);

  // Update center and zoom when route changes
  useEffect(() => {
    if (showRoute && routeCoordinates.length > 0) {
      setCenter([
        (originCoords[0] + destinationCoords[0]) / 2,
        (originCoords[1] + destinationCoords[1]) / 2
      ]);
      setZoom(6);
    } else {
      setCenter(originCoords);
      setZoom(10);
    }
  }, [originCoords, destinationCoords, showRoute, routeCoordinates]);

  // Update coordinates and route when location changes
  useEffect(() => {
    if (originLocation && originLocation.trim() !== '') {
      const mockCoordinates = getMockCoordinatesForLocation(originLocation);
      setOriginCoords(mockCoordinates);
      
      if (showRoute) {
        const route = generateSimpleRoute(mockCoordinates, destinationCoords);
        setRouteCoordinates(route);
      }
    } else {
      setRouteCoordinates([]);
    }
  }, [originLocation, showRoute, destinationCoords]);

  const getMockCoordinatesForLocation = (location: string): [number, number] => {
    const locationLower = location.toLowerCase();
    
    if (locationLower.includes('rio') || locationLower.includes('rj')) {
      return [-22.9068, -43.1729];
    } else if (locationLower.includes('brasília') || locationLower.includes('bsb')) {
      return [-15.7801, -47.9292];
    } else if (locationLower.includes('salvador') || locationLower.includes('ssa')) {
      return [-12.9714, -38.5014];
    } else if (locationLower.includes('belo horizonte') || locationLower.includes('bhz')) {
      return [-19.9167, -43.9345];
    } else if (locationLower.includes('recife') || locationLower.includes('rec')) {
      return [-8.0476, -34.8770];
    } else {
      return [-23.5505, -46.6333];
    }
  };

  const generateSimpleRoute = (start: [number, number], end: [number, number]): [number, number][] => {
    const latDiff = end[0] - start[0];
    const lngDiff = end[1] - start[1];
    
    const route: [number, number][] = [start];
    
    for (let i = 1; i < 5; i++) {
      const progress = i / 5;
      const lat = start[0] + (latDiff * progress) + (Math.random() - 0.5) * 0.5;
      const lng = start[1] + (lngDiff * progress) + (Math.random() - 0.5) * 0.5;
      route.push([lat, lng]);
    }
    
    route.push(end);
    return route;
  };

  return (
    <div style={{ height, width: '100%' }} className="rounded-xl overflow-hidden">
      <MapContainer
        center={defaultCenter}
        zoom={defaultZoom}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        <MapUpdater center={center} zoom={zoom} />
        
        <Marker position={originCoords}>
          <Popup>
            Origem: {originLocation || 'Localização selecionada'}
          </Popup>
        </Marker>
        
        {showRoute && routeCoordinates.length > 0 && (
          <RouteDisplay 
            destinationCoords={destinationCoords}
            routeCoordinates={routeCoordinates}
          />
        )}
      </MapContainer>
    </div>
  );
};

export default Map;
