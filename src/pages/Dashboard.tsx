// src/pages/Dashboard.tsx
import { useState, useEffect } from 'react'; // useEffect pode ser usado para reagir a mudanças no contexto
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import LocationInput from '@/components/LocationInput'; // Seu LocationInput modificado
import CargoDetailsForm from '@/components/CargoDetailsForm';
import ResultsDashboard from '@/components/ResultsDashboard';
import MapComponent from '@/components/Map'; // Importando o MapComponent
import { Ship, Truck, Train, Plane } from 'lucide-react';
import { useRoute } from '@/contexts/RouteContext'; // Importar o hook do contexto

const Dashboard = () => {
  // originLocation e handleLocationChange foram removidos
  const [cargoDetails, setCargoDetails] = useState<{ cargoType: string; weight: number; budget: number } | null>(null);
  // showResults agora pode ser derivado do RouteContext e cargoDetails
  // const [showResults, setShowResults] = useState(false); // Esta linha será modificada ou removida



  const { originCoordinates } = useRoute(); // Pegando originCoordinates do contexto

  const handleCargoChange = (details: { cargoType: string; weight: number; budget: number }) => {
    setCargoDetails(details);
    // A lógica de setShowResults será baseada em originCoordinates e details
  };

  // Determina se os resultados (incluindo o painel de resultados da rota) devem ser mostrados
  // A rota no mapa será mostrada assim que originCoordinates e destinationCoordinates estiverem no contexto
  const showResultsPanel = !!originCoordinates && !!cargoDetails;

  return (
    <div className="min-h-screen flex flex-col bg-neutral-light dark:bg-gray-900">
      <Navbar />

      <div className="flex-grow container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Otimizador de Rotas de Transporte</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Insira os detalhes da sua carga e origem para o Aeroporto de Caçador.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 space-y-6">
             {/* Adicionado space-y-6 para consistência */}
            {/* Ícones de modo de transporte */}
            <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-sm flex justify-between">
              <div className="flex flex-col items-center">
                <div className="bg-primary/10 p-2 rounded-full">
                  <Ship className="h-6 w-6 text-gray-400" />
                </div>
                <span className="text-xs mt-1">Aquaviário</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="bg-primary/10 p-2 rounded-full">
                  <Truck className="h-6 w-6 text-primary" />
                </div>
                <span className="text-xs mt-1">Rodoviário</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="bg-primary/10 p-2 rounded-full">
                  <Train className="h-6 w-6 text-primary" />
                </div>
                <span className="text-xs mt-1">Ferroviário</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="bg-primary/10 p-2 rounded-full">
                  <Plane className="h-6 w-6 text-primary" />
                </div>
                <span className="text-xs mt-1">Aéreo</span>
              </div>
            </div>

            {/* LocationInput modificado não precisa mais de onLocationChange */}
            <LocationInput />
            <CargoDetailsForm onCargoChange={handleCargoChange} />
          </div>

          {/* Coluna da direita para Mapa e Resultados/Placeholder */}
          <div className="lg:col-span-2 space-y-6">
            {/* Contêiner do Mapa com altura definida */}
            <div style={{ height: '450px', width: '100%' }} className="bg-white dark:bg-gray-800 rounded-2xl shadow-md overflow-hidden">
              <MapComponent />
            </div>

            {/* Condicional para ResultsDashboard ou Placeholder */}
            {showResultsPanel ? (
              // ResultsDashboard será modificado para usar o contexto, props podem mudar
              <ResultsDashboard cargoDetails={cargoDetails}/>
            ) : (
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-8 flex flex-col items-center justify-center min-h-[200px]">
                <div className="text-xl font-medium text-gray-800 dark:text-gray-200 mb-4">
                  {originCoordinates ? "Insira os detalhes da carga." : "Insira o local de origem e os detalhes da carga."}
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-center max-w-md">
                  Nosso modelo de análise prescritiva analisará suas entradas e recomendará o melhor modo de transporte e rota para o Aeroporto de Caçador.
                </p>
                {/* ... (ícones de carregamento podem permanecer ou ser ajustados) ... */}
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;