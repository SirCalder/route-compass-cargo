
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import LocationInput from '@/components/LocationInput';
import CargoDetailsForm from '@/components/CargoDetailsForm';
import ResultsDashboard from '@/components/ResultsDashboard';
import { Ship, Truck, Train, Plane } from 'lucide-react';

const Dashboard = () => {
  const [showResults, setShowResults] = useState(false);

  // In a real app, this would be triggered after form submission and API response
  setTimeout(() => {
    setShowResults(true);
  }, 2000);

  return (
    <div className="min-h-screen flex flex-col bg-neutral-light">
      <Navbar />
      
      <div className="flex-grow container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Transport Route Optimizer</h1>
          <p className="text-gray-600">
            Input your cargo details to receive the optimal transport route recommendation
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            {/* Transport mode icons */}
            <div className="bg-white p-4 rounded-2xl shadow-sm mb-6 flex justify-between">
              <div className="flex flex-col items-center">
                <div className="bg-primary/10 p-2 rounded-full">
                  <Ship className="h-6 w-6 text-primary" />
                </div>
                <span className="text-xs mt-1">Waterway</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="bg-primary/10 p-2 rounded-full">
                  <Truck className="h-6 w-6 text-primary" />
                </div>
                <span className="text-xs mt-1">Road</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="bg-primary/10 p-2 rounded-full">
                  <Train className="h-6 w-6 text-primary" />
                </div>
                <span className="text-xs mt-1">Rail</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="bg-primary/10 p-2 rounded-full">
                  <Plane className="h-6 w-6 text-primary" />
                </div>
                <span className="text-xs mt-1">Air</span>
              </div>
            </div>

            <LocationInput />
            <CargoDetailsForm />
          </div>
          
          <div className="lg:col-span-2">
            {showResults ? (
              <ResultsDashboard />
            ) : (
              <div className="bg-white rounded-2xl shadow-md p-8 flex flex-col items-center justify-center h-full">
                <div className="text-xl font-medium text-gray-800 mb-4">
                  Complete the form to see your optimal route
                </div>
                <p className="text-gray-600 text-center max-w-md">
                  Our prescriptive analytics model will analyze your inputs and recommend the best transport mode and route.
                </p>
                <div className="mt-8 flex space-x-4">
                  {['waterway', 'road', 'rail', 'air'].map((mode) => (
                    <div key={mode} className="animate-pulse">
                      <div className={`h-10 w-10 rounded-full bg-gray-200`}></div>
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
