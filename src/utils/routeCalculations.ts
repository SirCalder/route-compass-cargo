
export interface CargoDetails {
  cargoType: string;
  weight: number;
  budget: number;
}

export interface RouteRecommendation {
  mode: 'road' | 'waterway' | 'rail' | 'air';
  confidence: number;
  rationale: string;
}

export const calculateRouteRecommendation = (
  originLocation: string, 
  cargoDetails: CargoDetails
): RouteRecommendation => {
  const locationLower = originLocation.toLowerCase();
  const { weight, budget, cargoType } = cargoDetails;
  
  // Transport mode logic based on location and cargo
  if (locationLower.includes('rio') || locationLower.includes('salvador')) {
    // Coastal cities favor waterway
    if (weight > 1000 && budget < 5000) {
      return {
        mode: 'waterway',
        confidence: 89,
        rationale: 'Transporte aquaviário é recomendado devido à proximidade portuária, peso elevado da carga e restrições orçamentárias. Esta opção oferece o melhor custo-benefício para cargas pesadas.'
      };
    }
  }
  
  if (cargoType.toLowerCase().includes('eletrônicos') || cargoType.toLowerCase().includes('farmacêuticos')) {
    return {
      mode: 'air',
      confidence: 78,
      rationale: 'Transporte aéreo é recomendado para produtos de alto valor e sensíveis ao tempo. Garante entrega rápida e segura.'
    };
  }
  
  if (weight > 2000) {
    return {
      mode: 'rail',
      confidence: 85,
      rationale: 'Transporte ferroviário é recomendado para cargas pesadas. Oferece excelente relação custo-benefício e menor impacto ambiental.'
    };
  }
  
  // Default to road transport
  return {
    mode: 'road',
    confidence: 72,
    rationale: 'Transporte rodoviário oferece flexibilidade de entrega porta a porta e é adequado para esta combinação de peso, tipo de carga e orçamento.'
  };
};

export const calculateRouteCosts = (
  recommendation: RouteRecommendation,
  cargoDetails: CargoDetails,
  distance: number = 1247
) => {
  const { mode } = recommendation;
  const { weight } = cargoDetails;
  
  const baseCosts = {
    road: 4.5,
    waterway: 2.8,
    rail: 3.2,
    air: 12.0
  };
  
  const baseTimes = {
    road: { days: 1, hours: 18 },
    waterway: { days: 5, hours: 12 },
    rail: { days: 3, hours: 4 },
    air: { days: 0, hours: 6 }
  };
  
  const emissions = {
    road: 2.4,
    waterway: 0.6,
    rail: 0.8,
    air: 4.2
  };
  
  const cost = Math.round(baseCosts[mode] * weight * (distance / 1000));
  const time = baseTimes[mode];
  const co2 = Math.round(emissions[mode] * (weight / 1000) * 10) / 10;
  
  return {
    cost: `R$ ${cost.toLocaleString('pt-BR')}`,
    time: time.days > 0 ? `${time.days} dias ${time.hours} horas` : `${time.hours} horas`,
    emissions: `${co2} tons CO₂`,
    distance: `${distance} km`
  };
};
