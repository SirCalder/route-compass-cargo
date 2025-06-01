// src/components/ResultsDashboard.tsx
import React from 'react';
import { useRoute, RouteInstruction } from '../contexts/RouteContext';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Clock, MapPinIcon, Milestone, Navigation, CornerDownRight, ArrowUp, ArrowLeft, ArrowRight,
  Truck, // Ícone para Rodoviário
  Train, // Ícone para Ferroviário
  Plane, // Ícone para Aéreo
  AlertTriangle, // Para avisos
  CheckCircle2, // Para viável
  XCircle // Para não viável
} from 'lucide-react';

// Interface para detalhes da carga, vindo das props
interface CargoDetails {
  cargoType: string;
  weight: number; // Toneladas
  budget: number;
}

interface ResultsDashboardProps {
  cargoDetails: CargoDetails | null; // Recebendo cargoDetails como prop
}

const getInstructionIcon = (type?: string, modifier?: string) => {
  // ... (função existente)
  if (!type) return <CornerDownRight className="h-4 w-4 text-gray-500" />;
  const lowerType = type.toLowerCase();
  const lowerModifier = modifier?.toLowerCase();

  if (lowerType.includes('left')) return <ArrowLeft className="h-4 w-4 text-blue-500" />;
  if (lowerType.includes('right')) return <ArrowRight className="h-4 w-4 text-blue-500" />;
  if (lowerType.includes('roundabout') || lowerModifier?.includes('roundabout')) return <Navigation className="h-4 w-4 text-purple-500" />;
  if (lowerType.includes('destination')) return <MapPinIcon className="h-4 w-4 text-green-500" />;
  return <ArrowUp className="h-4 w-4 text-gray-500" />;
};

// Parâmetros do modelo matemático (simplificado)
const modalParams = [
  { name: "Rodoviário", key: 'road', capacity: 20.21, icon: <Truck className="h-6 w-6" />, color: "text-orange-500" },
  { name: "Ferroviário", key: 'rail', capacity: 95.00, icon: <Train className="h-6 w-6" />, color: "text-teal-500" },
  { name: "Aéreo", key: 'air', capacity: 41.30, icon: <Plane className="h-6 w-6" />, color: "text-indigo-500" },
];

const ResultsDashboard: React.FC<ResultsDashboardProps> = ({ cargoDetails }) => {
  const { routeSummary, routeInstructions, originAddress, destinationCoordinates } = useRoute();

  if (!originAddress) {
    return (
      <Card className="shadow-md rounded-2xl animate-fade-in">
        {/* ... (conteúdo existente para "Insira um endereço de origem...") ... */}
        <CardHeader><CardTitle>Informações da Rota</CardTitle></CardHeader>
        <CardContent>
          <p className="text-gray-600 dark:text-gray-400">Insira um endereço de origem e calcule a rota para o Aeroporto de Caçador.</p>
          {destinationCoordinates && (
            <div className="mt-4 text-sm text-gray-500 dark:text-gray-300 flex items-center">
              <MapPinIcon className="h-4 w-4 mr-2 text-red-500" />
              <span>Destino: Aeroporto de Caçador ({destinationCoordinates.lat.toFixed(4)}, {destinationCoordinates.lng.toFixed(4)})</span>
            </div>
          )}
        </CardContent>
      </Card>
    );
  }

  if (!routeSummary || !cargoDetails) { // Modificado para também esperar cargoDetails para a análise
      return (
        <Card className="shadow-md rounded-2xl animate-fade-in">
            <CardHeader>
                <CardTitle>{!cargoDetails ? "Aguardando Detalhes da Carga" : "Calculando Rota..."}</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-gray-600 dark:text-gray-400">
                    { !cargoDetails ? "Por favor, preencha os Detalhes da Carga." :
                    `Aguarde enquanto calculamos a rota de ${originAddress} para o Aeroporto de Caçador.`}
                </p>
                { originAddress && !routeSummary && cargoDetails &&
                    <p className="text-gray-600 dark:text-gray-400 mt-2">
                        Se a rota não aparecer, verifique o endereço de origem ou sua conexão.
                    </p>
                }
            </CardContent>
        </Card>
      )
  }

  const distanceKm = (routeSummary.totalDistance / 1000);
  const timeMinutes = Math.round(routeSummary.totalTime / 60);
  const cargoWeightInTonnes = cargoDetails.weight; // Peso já está em toneladas

  const modalAnalysis = modalParams.map(modal => {
    const isViableByCapacity = cargoWeightInTonnes <= modal.capacity;
    let statusMessage = "";
    let statusColor = "";
    let StatusIcon = CheckCircle2;

    if (!isViableByCapacity) {
      statusMessage = `Capacidade excedida. Limite: ${modal.capacity.toFixed(2)} ton.`;
      statusColor = "text-red-500 dark:text-red-400";
      StatusIcon = XCircle;
    } else if (cargoWeightInTonnes > modal.capacity * 0.85) { // Alerta se > 85% da capacidade
      statusMessage = `Próximo ao limite (${((cargoWeightInTonnes / modal.capacity) * 100).toFixed(0)}%). Capacidade: ${modal.capacity.toFixed(2)} ton.`;
      statusColor = "text-yellow-500 dark:text-yellow-400";
      StatusIcon = AlertTriangle;
    } else {
      statusMessage = `Viável. Capacidade: ${modal.capacity.toFixed(2)} ton.`;
      statusColor = "text-green-600 dark:text-green-500";
      StatusIcon = CheckCircle2;
    }
    return { ...modal, isViableByCapacity, statusMessage, statusColor, StatusIcon };
  });

  return (
    <div className="space-y-6">
      <Card className="shadow-md rounded-2xl animate-fade-in">
        {/* ... (Conteúdo do Resumo da Rota Calculada - como antes) ... */}
        <CardHeader><CardTitle>Resumo da Rota Calculada</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center">
            <MapPinIcon className="h-5 w-5 mr-3 text-blue-500" />
            <div><p className="text-sm font-medium text-gray-500 dark:text-gray-400">Origem</p><p className="text-gray-700 dark:text-gray-200">{originAddress}</p></div>
          </div>
          <div className="flex items-center">
            <MapPinIcon className="h-5 w-5 mr-3 text-red-500" />
            <div><p className="text-sm font-medium text-gray-500 dark:text-gray-400">Destino</p><p className="text-gray-700 dark:text-gray-200">Aeroporto de Caçador</p><p className="text-xs text-gray-400 dark:text-gray-500">({destinationCoordinates.lat.toFixed(4)}, {destinationCoordinates.lng.toFixed(4)})</p></div>
          </div>
          <hr className="my-3 border-gray-200 dark:border-gray-700" />
          <div className="flex items-center">
            <Milestone className="h-5 w-5 mr-3 text-green-500" />
            <div><p className="text-sm font-medium text-gray-500 dark:text-gray-400">Distância Total</p><p className="text-gray-700 dark:text-gray-200">{distanceKm.toFixed(2)} km</p></div>
          </div>
          <div className="flex items-center">
            <Clock className="h-5 w-5 mr-3 text-purple-500" />
            <div><p className="text-sm font-medium text-gray-500 dark:text-gray-400">Tempo Estimado (Rodoviário)</p><p className="text-gray-700 dark:text-gray-200">{timeMinutes} minutos</p></div>
          </div>
        </CardContent>
      </Card>

      {/* Card de Análise de Modais por Capacidade */}
      <Card className="shadow-md rounded-2xl animate-fade-in">
        <CardHeader>
          <CardTitle>Análise de Modais por Capacidade</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Peso da Carga: <span className="font-semibold">{cargoWeightInTonnes.toFixed(2)} toneladas</span>
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Distância da Rota: {distanceKm.toFixed(2)} km
            </p>
          </div>
          {modalAnalysis.map(modal => (
            <div key={modal.key} className={`p-3 rounded-lg border ${modal.isViableByCapacity ? (modal.statusMessage.includes('Próximo') ? 'border-yellow-300 dark:border-yellow-700 bg-yellow-50 dark:bg-yellow-900/30' : 'border-green-300 dark:border-green-700 bg-green-50 dark:bg-green-900/30') : 'border-red-300 dark:border-red-700 bg-red-50 dark:bg-red-900/30'}`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <span className={`mr-3 ${modal.color}`}>{React.cloneElement(modal.icon, { className: "h-6 w-6" })}</span>
                  <span className={`font-semibold ${modal.color}`}>{modal.name}</span>
                </div>
                <modal.StatusIcon className={`h-5 w-5 ${modal.statusColor}`} />
              </div>
              <p className={`mt-1 text-xs ${modal.statusColor}`}>{modal.statusMessage}</p>
              {!modal.isViableByCapacity && modal.key === 'road' && modalAnalysis.find(m => m.key === 'rail')?.isViableByCapacity && (
                <p className="mt-1 text-xs text-blue-600 dark:text-blue-400">
                  Considere o modal Ferroviário para esta carga devido à maior capacidade.
                </p>
              )}
            </div>
          ))}
        </CardContent>
      </Card>

      {routeInstructions && routeInstructions.length > 0 && (
        <Card className="shadow-md rounded-2xl animate-fade-in">
          {/* ... (Conteúdo das Instruções da Rota - como antes) ... */}
          <CardHeader><CardTitle>Instruções da Rota</CardTitle></CardHeader>
          <CardContent>
            <ScrollArea className="h-[200px] w-full pr-4">
              <ul className="space-y-3">
                {routeInstructions.map((instruction: RouteInstruction, index: number) => (
                  <li key={index} className="flex items-start pb-2 border-b border-gray-100 dark:border-gray-700 last:border-b-0">
                    <div className="mr-3 mt-1">{getInstructionIcon(instruction.type, instruction.modifier)}</div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-700 dark:text-gray-200">{instruction.text}</p>
                      {instruction.road && (<p className="text-xs text-gray-500 dark:text-gray-400">Rodovia: {instruction.road}</p>)}
                      <div className="flex text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                        <span>{(instruction.distance / 1000).toFixed(1)} km</span>
                        <span className="mx-1">·</span>
                        <span>{Math.round(instruction.time / 60)} min</span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </ScrollArea>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ResultsDashboard;