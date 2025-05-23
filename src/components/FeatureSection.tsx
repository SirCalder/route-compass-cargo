
import { Ship, Truck, Train, Plane, BarChart3, Zap } from 'lucide-react';

const FeatureSection = () => {
  const features = [
    {
      icon: <BarChart3 className="h-8 w-8 text-accent1" />,
      title: "Prescriptive Analytics",
      description: "Our powerful algorithms analyze multiple factors to prescribe the optimal transport route, not just predict it."
    },
    {
      icon: <Zap className="h-8 w-8 text-accent2" />,
      title: "Instant Results",
      description: "Get route recommendations in seconds, allowing you to make quick, informed decisions for your shipments."
    },
    {
      icon: <div className="flex gap-1">
        <Ship className="h-6 w-6 text-primary" />
        <Truck className="h-6 w-6 text-primary" />
        <Train className="h-6 w-6 text-primary" />
        <Plane className="h-6 w-6 text-primary" />
      </div>,
      title: "Multimodal Analysis",
      description: "Compare all transport options across waterway, road, rail, and air to find the perfect balance of cost and speed."
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Powerful Features</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Our platform leverages cutting-edge technology to optimize your cargo transport routes.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-neutral-light p-6 rounded-2xl card-hover"
            >
              <div className="h-16 flex items-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
