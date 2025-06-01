
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div className="bg-gradient-to-br from-white via-neutral-light to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 pt-16 pb-24">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 md:pr-12">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight text-gray-900 dark:text-white mb-6">
              Planeje investimentos em capacidade logística utilizando nosso <span className="text-primary">Modelo de Otimização</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              Aplique o orçamento público de maneira mais assertiva para obter o modal de transporte e a rota que garantem um compromisso entre custo de transporte e tempo de entrega.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                to="/dashboard" 
                className="btn-primary flex items-center justify-center gap-2"
              >
                Começar a Otimizar
                <ArrowRight className="h-5 w-5" />
              </Link>
              {/*<button className="btn-secondary flex items-center justify-center">
                Agendar uma Demo
              </button>*/}
            </div>
            <div className="mt-8 flex items-center text-sm text-gray-500 dark:text-gray-400">
              <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-medium mr-2">
                BETA
              </span>
              Nossa plataforma incluirá análise de emissões de CO₂ para escolhas de transporte sustentáveis
            </div>
          </div>
          <div className="md:w-1/2 mt-12 md:mt-0">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 relative">
              <div className="absolute -top-3 -left-3 bg-accent1 text-white text-xs px-3 py-1 rounded-full">
                75% decisões mais rápidas
              </div>
              {/* Route map visualization */}
              <div className="rounded-xl w-full h-64 bg-gray-100 dark:bg-gray-700 overflow-hidden">
                <img 
                  src={import.meta.env.BASE_URL + 'map.png'}
                  alt="Visualização de Rota de Exemplo" 
                  className="w-full h-full object-cover"
                  style={{ 
                    background: 'linear-gradient(45deg, #f0f9ff 25%, transparent 25%), linear-gradient(-45deg, #f0f9ff 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #f0f9ff 75%), linear-gradient(-45deg, transparent 75%, #f0f9ff 75%)',
                    backgroundSize: '20px 20px',
                    backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px'
                  }}
                />
              </div>
              <div className="mt-4 grid grid-cols-3 gap-4">
                <div className="p-3 bg-neutral-light dark:bg-gray-700 rounded-xl text-center">
                  <div className="text-2xl font-bold text-primary">42%</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Economia de Custos</div>
                </div>
                <div className="p-3 bg-neutral-light dark:bg-gray-700 rounded-xl text-center">
                  <div className="text-2xl font-bold text-accent1">3,2x</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Entrega Mais Rápida</div>
                </div>
                <div className="p-3 bg-neutral-light dark:bg-gray-700 rounded-xl text-center">
                  <div className="text-2xl font-bold text-accent2">68%</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Redução de CO₂</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
