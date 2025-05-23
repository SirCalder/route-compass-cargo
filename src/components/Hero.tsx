
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div className="bg-gradient-to-br from-white via-neutral-light to-white pt-16 pb-24">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 md:pr-12">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight text-gray-900 mb-6">
              Optimize Your Cargo Transport Routes with <span className="text-primary">AI</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Make smarter shipping decisions with our prescriptive analytics platform that recommends the optimal transport mode and route for your cargo.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                to="/dashboard" 
                className="btn-primary flex items-center justify-center gap-2"
              >
                Start Optimizing
                <ArrowRight className="h-5 w-5" />
              </Link>
              <button className="btn-secondary flex items-center justify-center">
                Book a Demo
              </button>
            </div>
            <div className="mt-8 flex items-center text-sm text-gray-500">
              <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-medium mr-2">
                NEW
              </span>
              Our platform now includes CO₂ emission analytics for sustainable transport choices
            </div>
          </div>
          <div className="md:w-1/2 mt-12 md:mt-0">
            <div className="bg-white rounded-2xl shadow-lg p-6 relative">
              <div className="absolute -top-3 -left-3 bg-accent1 text-white text-xs px-3 py-1 rounded-full">
                75% faster decisions
              </div>
              <img 
                src="https://placehold.co/600x400/e2eafc/818cf8?text=Route+Optimization+Dashboard" 
                alt="ModalMaster Dashboard Preview" 
                className="rounded-xl w-full h-auto"
              />
              <div className="mt-4 grid grid-cols-3 gap-4">
                <div className="p-3 bg-neutral-light rounded-xl text-center">
                  <div className="text-2xl font-bold text-primary">42%</div>
                  <div className="text-xs text-gray-500">Cost Savings</div>
                </div>
                <div className="p-3 bg-neutral-light rounded-xl text-center">
                  <div className="text-2xl font-bold text-accent1">3.2x</div>
                  <div className="text-xs text-gray-500">Faster Delivery</div>
                </div>
                <div className="p-3 bg-neutral-light rounded-xl text-center">
                  <div className="text-2xl font-bold text-accent2">68%</div>
                  <div className="text-xs text-gray-500">CO₂ Reduction</div>
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
