// src/contexts/RouteContext.tsx
import React, { createContext, useState, useContext, ReactNode } from 'react';
import L from 'leaflet';

const CACADOR_AIRPORT_COORDS = L.latLng(-26.788055, -50.940000);

interface RouteSummary {
    totalDistance: number; // metros
    totalTime: number;     // segundos
}

// Definindo uma interface para as instruções da rota
// Baseado no que L.Routing.Instruction geralmente fornece
export interface RouteInstruction { // Exportar para usar em outros lugares se necessário
    text: string;
    distance: number; // em metros
    time: number;     // em segundos
    type?: string;      // Ex: 'Straight', 'TurnLeft', 'WaypointReached', 'DestinationReached'
    modifier?: string;
    road?: string;
    // Adicione mais campos conforme necessário
}

interface RouteContextType {
    originAddress: string;
    originCoordinates: L.LatLng | null;
    destinationCoordinates: L.LatLng;
    routeSummary: RouteSummary | null;
    routeInstructions: RouteInstruction[] | null; // Novo estado para instruções
    setOriginAddressState: (address: string) => void;
    geocodeAndSetOrigin: (address: string) => Promise<void>;
    setRouteSummary: (summary: RouteSummary | null) => void;
    setRouteInstructions: (instructions: RouteInstruction[] | null) => void; // Nova função
    clearRoute: () => void;
}

const RouteContext = createContext<RouteContextType | undefined>(undefined);

export const RouteProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [originAddress, setOriginAddress] = useState<string>('');
    const [originCoordinates, setOriginCoordinates] = useState<L.LatLng | null>(null);
    const [routeSummary, setRouteSummaryState] = useState<RouteSummary | null>(null);
    const [routeInstructions, setRouteInstructionsState] = useState<RouteInstruction[] | null>(null); // Novo estado

    const setOriginAddressState = (address: string) => {
        setOriginAddress(address);
    };

    const geocodeAndSetOrigin = async (address: string) => {
        setOriginAddress(address);
        if (!address.trim()) {
            setOriginCoordinates(null);
            setRouteSummaryState(null);
            setRouteInstructionsState(null); // Limpar instruções também
            return;
        }
        try {
            const response = await fetch(
                `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
                    address
                )}&format=jsonv2&limit=1&countrycodes=br&addressdetails=1`
            );
            if (!response.ok) {
                throw new Error(`Erro na geocodificação: ${response.statusText}`);
            }
            const data = await response.json();
            if (data && data.length > 0) {
                const { lat, lon } = data[0];
                const newOriginCoords = L.latLng(parseFloat(lat), parseFloat(lon)); //
                setOriginCoordinates(newOriginCoords);
                console.log('RouteContext: Coordenadas de origem definidas:', newOriginCoords); // <--- ADICIONE AQUI
                setRouteSummaryState(null);
                setRouteInstructionsState(null); // Limpar instruções ao buscar nova rota
            } else {
                setOriginCoordinates(null);
                setRouteSummaryState(null);
                setRouteInstructionsState(null); // Limpar instruções
                alert('Endereço não encontrado. Por favor, tente novamente.');
                console.warn('Nenhum resultado encontrado para o endereço:', address);
            }
        } catch (error) {
            setOriginCoordinates(null);
            setRouteSummaryState(null);
            setRouteInstructionsState(null); // Limpar instruções
            alert('Falha ao buscar coordenadas. Verifique sua conexão ou o endereço informado.');
            console.error('Erro ao geocodificar endereço:', error);
        }
    };

    const setRouteSummary = (summary: RouteSummary | null) => {
        setRouteSummaryState(summary);
    };

    // Nova função para definir as instruções da rota
    const setRouteInstructions = (instructions: RouteInstruction[] | null) => { //
        setRouteInstructionsState(instructions);
    };

    const clearRoute = () => {
        setOriginAddress('');
        setOriginCoordinates(null);
        setRouteSummaryState(null);
        setRouteInstructionsState(null); // Limpar instruções também
    };

    return (
        <RouteContext.Provider
            value={{
                originAddress,
                originCoordinates,
                destinationCoordinates: CACADOR_AIRPORT_COORDS,
                routeSummary,
                routeInstructions, // Adicionado ao contexto
                setOriginAddressState,
                geocodeAndSetOrigin,
                setRouteSummary,
                setRouteInstructions, // Adicionado ao contexto
                clearRoute,
            }}
        >
            {children}
        </RouteContext.Provider>
    );
};

export const useRoute = (): RouteContextType => {
    const context = useContext(RouteContext);
    if (context === undefined) {
        throw new Error('useRoute deve ser usado dentro de um RouteProvider');
    }
    return context;
};