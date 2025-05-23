
import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
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

const Map: React.FC<MapProps> = ({ originLocation, showRoute = false, height = "300px" }) => {
  const [routeCoordinates, setRouteCoordinates] = useState<[number, number][]>([]);
  const [originCoords, setOriginCoords] = useState<[number, number]>([-23.5505, -46.6333]);
  
  const destinationCoords: [number, number] = [-22.9218, -42.0749];

  // Calculate map center and zoom based on route
  const getMapCenter = (): [number, number] => {
    if (showRoute && routeCoordinates.length > 0) {
      return [
        (originCoords[0] + destinationCoords[0]) / 2,
        (originCoords[1] + destinationCoords[1]) / 2
      ];
    }
    return originCoords;
  };

  const getMapZoom = (): number => {
    return showRoute && routeCoordinates.length > 0 ? 6 : 10;
  };

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
  }, [originLocation, showRoute]);

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
        center={getMapCenter()}
        zoom={getMapZoom()}
        style={{ height: '100%', width: '100%' }}
        key={`${originCoords[0]}-${originCoords[1]}-${showRoute}`}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        <Marker position={originCoords}>
          <Popup>
            Origem: {originLocation || 'Localização selecionada'}
          </Popup>
        </Marker>
        
        {showRoute && routeCoordinates.length > 0 && (
          <>
            <Marker position={destinationCoords}>
              <Popup>
                Destino: Aeroporto Carlos Alberto da Costa Neves
              </Popup>
            </Marker>
            
            <Polyline 
              positions={routeCoordinates} 
              color="#454f9f" 
              weight={4}
              opacity={0.7}
            />
          </>
        )}
      </MapContainer>
    </div>
  );
};

export default Map;
