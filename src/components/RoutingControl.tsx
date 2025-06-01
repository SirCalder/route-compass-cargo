// src/components/RoutingControl.tsx
import L from 'leaflet';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import 'leaflet-routing-machine';
import 'lrm-graphhopper';
import { createControlComponent } from '@react-leaflet/core';
// Importar RouteInstruction se você for tipar fortemente aqui, ou usar any/L.Routing.Instruction
// import { RouteInstruction } from '../contexts/RouteContext'; // Ajuste o caminho

interface RoutingMachineProps {
    waypoints: L.LatLng[];
    graphHopperApiKey: string;
    // Modificar onRouteFound para incluir instruções
    onRouteFound?: (data: {
        summary: { totalDistance: number; totalTime: number };
        instructions: L.Routing.Instruction[]; // Usando o tipo LRM diretamente
    }) => void;
    show?: boolean;
    addWaypoints?: boolean;
    routeWhileDragging?: boolean;
    fitSelectedRoutes?: boolean;
    lineOptions?: L.PolylineOptions | L.Routing.LineOptions;
}

const createRoutineMachineLayer = (props: RoutingMachineProps) => {
    const {
        waypoints,
        graphHopperApiKey,
        onRouteFound, // Agora espera um payload maior
        show = false, //  <--- ALTERADO PARA 'false' PARA OCULTAR O PAINEL PADRÃO
        addWaypoints = false,
        routeWhileDragging = true,
        fitSelectedRoutes = true,
        lineOptions = { styles: [{ color: '#03f', opacity: 0.6, weight: 4 }] }
    } = props;

    console.log('RoutingControl: Props recebidas:', props); // <--- ADICIONE AQUI
    console.log('RoutingControl: Waypoints válidos para LRM:', waypoints.filter(wp => wp instanceof L.LatLng)); // <--- ADICIONE AQUI


    const validWaypoints = waypoints.filter(wp => wp instanceof L.LatLng);


    const instance = L.Routing.control({
        waypoints: validWaypoints,
        router: new L.Routing.GraphHopper(graphHopperApiKey, {
            /* serviceUrl: 'URL_DO_SEU_SERVIDOR_GRAPHHOPPER' */
        }),
        show: show, // Agora pode ser controlado para false
        addWaypoints: addWaypoints,
        routeWhileDragging: routeWhileDragging,
        fitSelectedRoutes: fitSelectedRoutes,
        lineOptions: lineOptions,
    });
    instance.on('routingerror', function (e: any) { // <--- ADICIONE ESTE BLOCO
        console.error('RoutingControl: Erro de Roteamento LRM:', e);
        if (e.error && e.error.message) {
            alert(`Erro ao calcular a rota: ${e.error.message}`);
        } else {
            alert('Ocorreu um erro desconhecido ao calcular a rota.');
        }
    });

    if (onRouteFound) {
        instance.on('routesfound', function (e: L.Routing.RoutesFoundEvent) {
            if (e.routes && e.routes.length > 0) {
                const route = e.routes[0]; // Pegar a primeira rota
                if (route.summary && route.instructions && onRouteFound) {
                    // Passar tanto o resumo quanto as instruções
                    onRouteFound({
                        summary: {
                            totalDistance: route.summary.totalDistance,
                            totalTime: route.summary.totalTime
                        },
                        instructions: route.instructions // Array de instruções
                    });
                }
            }
        });
    }
    return instance;
};

// updateRoutineMachineLayer permanece o mesmo
const updateRoutineMachineLayer = (
    instance: L.Routing.Control,
    props: RoutingMachineProps,
    prevProps: RoutingMachineProps
) => {
    if (JSON.stringify(props.waypoints) !== JSON.stringify(prevProps.waypoints)) {
        const validWaypoints = props.waypoints.filter(wp => wp instanceof L.LatLng);
        if (validWaypoints.length >= 2) {
            instance.setWaypoints(validWaypoints);
        } else {
            instance.setWaypoints([]);
        }
    }
};

const RoutingMachine = createControlComponent(createRoutineMachineLayer, updateRoutineMachineLayer);

export default RoutingMachine;