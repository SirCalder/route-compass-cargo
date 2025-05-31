import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Truck, Ship, Train, Plane, ArrowRight, ChevronDown, ChevronUp, Clock, DollarSign, Leaf } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import Map from './Map';
import { calculateRouteRecommendation, calculateRouteCosts, type CargoDetails } from '@/utils/routeCalculations';

type TransportMode = 'road' | 'waterway' | 'rail' | 'air';

interface RouteInfo {
  mode: TransportMode;
  icon: JSX.Element;
  title: string;
  distance: string;
  time: string;
  cost: string;
  emissions: string;
  confidence: number;
  rationale: string;
}

interface ResultsDashboardProps {
  originLocation?: string;
  cargoDetails?: CargoDetails;
}

const ResultsDashboard: React.FC<ResultsDashboardProps> = ({ originLocation = '', cargoDetails }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [recommendedRoute, setRecommendedRoute] = useState<RouteInfo | null>(null);
  const [alternativeRoutes, setAlternativeRoutes] = useState<RouteInfo[]>([]);

  useEffect(() => {
    if (originLocation && cargoDetails) {
      const recommendation = calculateRouteRecommendation(originLocation, cargoDetails);
      const costs = calculateRouteCosts(recommendation, cargoDetails);
      
      const modeIcons = {
        road: <Truck className="h-8 w-8 text-gray-200" />,
        waterway: <Ship className="h-8 w-8 text-gray-200" />,
        rail: <Train className="h-8 w-8 text-gray-200" />,
        air: <Plane className="h-8 w-8 text-gray-200" />
      };
      
      const modeTitles = {
        road: 'Transporte Rodoviário',
        waterway: 'Transporte Aquaviário',
        rail: 'Transporte Ferroviário',
        air: 'Transporte Aéreo'
      };
      
      const recommended: RouteInfo = {
        mode: recommendation.mode,
        icon: modeIcons[recommendation.mode],
        title: modeTitles[recommendation.mode],
        distance: costs.distance,
        time: costs.time,
        cost: costs.cost,
        emissions: costs.emissions,
        confidence: recommendation.confidence,
        rationale: recommendation.rationale
      };
      
      setRecommendedRoute(recommended);
      
      // Generate alternative routes
      const alternatives: RouteInfo[] = [];
      const modes: TransportMode[] = ['road', 'waterway', 'rail', 'air'];
      
      modes.forEach(mode => {
        if (mode !== recommendation.mode) {
          const altRecommendation = { mode, confidence: Math.floor(Math.random() * 40) + 30, rationale: `Opção alternativa de ${modeTitles[mode].toLowerCase()}.` };
          const altCosts = calculateRouteCosts(altRecommendation, cargoDetails);
          
          alternatives.push({
            mode,
            icon: <div className="scale-75">{modeIcons[mode]}</div>,
            title: modeTitles[mode],
            distance: altCosts.distance,
            time: altCosts.time,
            cost: altCosts.cost,
            emissions: altCosts.emissions,
            confidence: altRecommendation.confidence,
            rationale: altRecommendation.rationale
          });
        }
      });
      
      setAlternativeRoutes(alternatives);
    }
  }, [originLocation, cargoDetails]);

  const getModeColorClass = (mode: TransportMode) => {
    switch(mode) {
      case 'road': return 'bg-accent1';
      case 'waterway': return 'bg-accent2';
      case 'rail': return 'bg-primary';
      case 'air': return 'bg-gray-600';
      default: return 'bg-primary';
    }
  };

  if (!recommendedRoute) {
    return (
      <Card className="shadow-md rounded-2xl p-5 animate-fade-in">
        <div className="text-center py-8">
          <p className="text-gray-600 dark:text-gray-400">
            Complete o formulário para ver sua rota otimizada
          </p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="shadow-md rounded-2xl p-5 animate-fade-in">
      <h2 className="text-lg font-semibold mb-4">Rota Recomendada</h2>
      
      {/* Main recommendation */}
      <div className="bg-neutral-light dark:bg-gray-700 p-4 rounded-2xl mb-6">
        <div className="flex items-center">
          <div className={`p-3 rounded-xl ${getModeColorClass(recommendedRoute.mode)} mr-4`}>
            {recommendedRoute.icon}
          </div>
          <div>
            <h3 className="font-semibold text-lg">{recommendedRoute.title}</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Recomendado com {recommendedRoute.confidence}% de confiança
            </p>
          </div>
        </div>
        
        <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="flex items-center">
            <ArrowRight className="h-4 w-4 text-gray-500 mr-1" />
            <span className="text-sm">{recommendedRoute.distance}</span>
          </div>
          <div className="flex items-center">
            <Clock className="h-4 w-4 text-gray-500 mr-1" />
            <span className="text-sm">{recommendedRoute.time}</span>
          </div>
          <div className="flex items-center">
            <DollarSign className="h-4 w-4 text-gray-500 mr-1" />
            <span className="text-sm">{recommendedRoute.cost}</span>
          </div>
          <div className="flex items-center">
            <Leaf className="h-4 w-4 text-gray-500 mr-1" />
            <span className="text-sm">{recommendedRoute.emissions}</span>
          </div>
        </div>
        
        <button 
          className="flex items-center mt-4 text-primary font-medium"
          onClick={() => setShowDetails(!showDetails)}
        >
          Por que esta rota? {showDetails ? <ChevronUp className="h-4 w-4 ml-1" /> : <ChevronDown className="h-4 w-4 ml-1" />}
        </button>
        
        {showDetails && (
          <div className="mt-3 p-3 bg-white dark:bg-gray-800 rounded-xl text-sm text-gray-700 dark:text-gray-300 animate-fade-in">
            <p>{recommendedRoute.rationale}</p>
            <div className="mt-3">
              <div className="flex justify-between text-xs mb-1">
                <span>Confiança do modelo</span>
                <span>{recommendedRoute.confidence}%</span>
              </div>
              <Progress value={recommendedRoute.confidence} className="h-2" />
            </div>
          </div>
        )}
      </div>
      
      {/* Route map */}
      <div className="mb-6">
        <Map originLocation={originLocation} showRoute={true} height="320px" />
      </div>
      
      {/* Alternative options */}
      <h3 className="text-md font-semibold mb-3">Opções Alternativas</h3>
      <div className="space-y-3">
        {alternativeRoutes.map((route, index) => (
          <div key={index} className="p-3 border border-gray-200 dark:border-gray-700 rounded-xl hover:bg-neutral-light dark:hover:bg-gray-700 transition-colors cursor-pointer">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className={`p-2 rounded-lg ${getModeColorClass(route.mode)} mr-3`}>
                  {route.icon}
                </div>
                <div>
                  <h4 className="font-medium">{route.title}</h4>
                  <div className="flex items-center text-xs text-gray-500 mt-1">
                    <Clock className="h-3 w-3 mr-1" />
                    <span>{route.time}</span>
                    <DollarSign className="h-3 w-3 ml-2 mr-1" />
                    <span>{route.cost}</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <span className="text-xs text-gray-500">Confiança</span>
                <div className="flex items-center">
                  <Progress value={route.confidence} className="w-20 h-1 mr-2" />
                  <span className="text-xs">{route.confidence}%</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default ResultsDashboard;
