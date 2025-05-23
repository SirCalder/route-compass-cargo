
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Truck, Ship, Train, Plane, ArrowRight, ChevronDown, ChevronUp, Clock, DollarSign, Leaf } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

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

const ResultsDashboard = () => {
  const [showDetails, setShowDetails] = useState(false);

  // Mock data - in a real app, this would come from the backend
  const recommendedRoute: RouteInfo = {
    mode: 'rail',
    icon: <Train className="h-8 w-8 text-primary" />,
    title: 'Rail Transport',
    distance: '1,247 km',
    time: '3 days 4 hours',
    cost: '$4,320',
    emissions: '0.8 tons CO₂',
    confidence: 87,
    rationale: 'Rail transport is recommended based on the cargo weight, distance, and cost constraints. This option provides the best balance of cost-efficiency and delivery time, while minimizing environmental impact.'
  };

  // Alternative options - would be dynamically generated in a real app
  const alternativeRoutes: RouteInfo[] = [
    {
      mode: 'waterway',
      icon: <Ship className="h-6 w-6 text-accent2" />,
      title: 'Waterway Transport',
      distance: '1,540 km',
      time: '5 days 12 hours',
      cost: '$3,850',
      emissions: '0.6 tons CO₂',
      confidence: 67,
      rationale: 'Waterway transport offers the lowest emissions and cost, but requires significantly more time.'
    },
    {
      mode: 'road',
      icon: <Truck className="h-6 w-6 text-accent1" />,
      title: 'Road Transport',
      distance: '1,180 km',
      time: '1 day 18 hours',
      cost: '$5,720',
      emissions: '2.4 tons CO₂',
      confidence: 58,
      rationale: 'Road transport provides faster delivery but at higher cost and environmental impact.'
    },
    {
      mode: 'air',
      icon: <Plane className="h-6 w-6 text-gray-600" />,
      title: 'Air Transport',
      distance: '980 km',
      time: '6 hours',
      cost: '$12,450',
      emissions: '4.2 tons CO₂',
      confidence: 32,
      rationale: 'Air transport offers the fastest delivery time but at significantly higher cost and environmental impact.'
    }
  ];

  const getModeColorClass = (mode: TransportMode) => {
    switch(mode) {
      case 'road': return 'bg-accent1';
      case 'waterway': return 'bg-accent2';
      case 'rail': return 'bg-primary';
      case 'air': return 'bg-gray-600';
      default: return 'bg-primary';
    }
  };

  return (
    <Card className="shadow-md rounded-2xl p-5 animate-fade-in">
      <h2 className="text-lg font-semibold mb-4">Recommended Route</h2>
      
      {/* Main recommendation */}
      <div className="bg-neutral-light p-4 rounded-2xl mb-6">
        <div className="flex items-center">
          <div className={`p-3 rounded-xl ${getModeColorClass(recommendedRoute.mode)} mr-4`}>
            {recommendedRoute.icon}
          </div>
          <div>
            <h3 className="font-semibold text-lg">{recommendedRoute.title}</h3>
            <p className="text-gray-600 text-sm">Recommended with {recommendedRoute.confidence}% confidence</p>
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
          Why this route? {showDetails ? <ChevronUp className="h-4 w-4 ml-1" /> : <ChevronDown className="h-4 w-4 ml-1" />}
        </button>
        
        {showDetails && (
          <div className="mt-3 p-3 bg-white rounded-xl text-sm text-gray-700 animate-fade-in">
            <p>{recommendedRoute.rationale}</p>
            <div className="mt-3">
              <div className="flex justify-between text-xs mb-1">
                <span>Model confidence</span>
                <span>{recommendedRoute.confidence}%</span>
              </div>
              <Progress value={recommendedRoute.confidence} className="h-2" />
            </div>
          </div>
        )}
      </div>
      
      {/* Route map placeholder */}
      <div className="h-64 bg-gray-100 rounded-xl flex items-center justify-center mb-6">
        <p className="text-gray-500">Route map visualization</p>
        {/* This would be replaced with an actual map component */}
      </div>
      
      {/* Alternative options */}
      <h3 className="text-md font-semibold mb-3">Alternative Options</h3>
      <div className="space-y-3">
        {alternativeRoutes.map((route, index) => (
          <div key={index} className="p-3 border border-gray-200 rounded-xl hover:bg-neutral-light transition-colors cursor-pointer">
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
                <span className="text-xs text-gray-500">Confidence</span>
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
