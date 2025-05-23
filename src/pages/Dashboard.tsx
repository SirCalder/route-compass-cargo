
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import LocationInput from '@/components/LocationInput';
import CargoDetailsForm from '@/components/CargoDetailsForm';
import ResultsDashboard from '@/components/ResultsDashboard';
import { Ship, Truck, Train, Plane } from 'lucide-react';

const Dashboard = () => {
  const [originLocation, setOriginLocation] = useState('');
  const [cargoDetails, setCargoDetails] = useState<{ cargoType: string; weight: number; budget: number } | null>(null);
  const [showResults, setShowResults] = useState(false);

  const handleLocationChange = (location: string) => {
    setOriginLocation(location);
    if (location && cargoDetails) {
      setShowResults(true);
    }
  };

  const handleCargoChange = (details: { cargoType: string; weight: number; budget: number }) => {
    setCargoDetails(details);
    if (originLocation && details) {
      setShowResults(true);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-neutral-light dark:bg-gray-900">
      <Navbar />
      
      <div className="flex-grow container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Otimizador de Rotas de Transporte</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Insira os detalhes da sua carga para receber a recomendação de rota de transporte otimizada
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            {/* Ícones de modo de transporte */}
            <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-sm mb-6 flex justify-between">
              <div className="flex flex-col items-center">
                <div className="bg-primary/10 p-2 rounded-full">
                  <Ship className="h-6 w-6 text-primary" />
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

            <LocationInput onLocationChange={handleLocationChange} />
            <CargoDetailsForm onCargoChange={handleCargoChange} />
          </div>
          
          <div className="lg:col-span-2">
            {showResults ? (
              <ResultsDashboard originLocation={originLocation} cargoDetails={cargoDetails} />
            ) : (
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-8 flex flex-col items-center justify-center h-full">
                <div className="text-xl font-medium text-gray-800 dark:text-gray-200 mb-4">
                  Complete o formulário para ver sua rota otimizada
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-center max-w-md">
                  Nosso modelo de análise prescritiva analisará suas entradas e recomendará o melhor modo de transporte e rota.
                </p>
                <div className="mt-8 flex space-x-4">
                  {['aquaviário', 'rodoviário', 'ferroviário', 'aéreo'].map((mode) => (
                    <div key={mode} className="animate-pulse">
                      <div className={`h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-700`}></div>
                    </div>
                  ))}
                </div>
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
