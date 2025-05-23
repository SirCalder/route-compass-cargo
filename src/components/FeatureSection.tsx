
import { Ship, Truck, Train, Plane, BarChart3, Zap } from 'lucide-react';

const FeatureSection = () => {
  const features = [
    {
      icon: <BarChart3 className="h-8 w-8 text-accent1" />,
      title: "Análise Prescritiva",
      description: "Nossos algoritmos poderosos analisam múltiplos fatores para prescrever a rota de transporte otimizada, não apenas prevê-la."
    },
    {
      icon: <Zap className="h-8 w-8 text-accent2" />,
      title: "Resultados Instantâneos",
      description: "Obtenha recomendações de rota em segundos, permitindo que você tome decisões rápidas e informadas para seus envios."
    },
    {
      icon: <div className="flex gap-1">
        <Ship className="h-6 w-6 text-primary" />
        <Truck className="h-6 w-6 text-primary" />
        <Train className="h-6 w-6 text-primary" />
        <Plane className="h-6 w-6 text-primary" />
      </div>,
      title: "Análise Multimodal",
      description: "Compare todas as opções de transporte entre aquaviário, rodoviário, ferroviário e aéreo para encontrar o equilíbrio perfeito entre custo e velocidade."
    }
  ];

  return (
    <section className="py-16 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 dark:text-white">Funcionalidades Poderosas</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Nossa plataforma utiliza tecnologia de ponta para otimizar suas rotas de transporte de carga.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-neutral-light dark:bg-gray-800 p-6 rounded-2xl card-hover"
            >
              <div className="h-16 flex items-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2 dark:text-white">{feature.title}</h3>
              <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
