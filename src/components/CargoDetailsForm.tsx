
import { useState } from 'react';
import { Check, AlertCircle } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';

const cargoTypes = [
  "General Merchandise",
  "Electronics",
  "Textiles",
  "Machinery",
  "Chemicals",
  "Food Products",
  "Automotive Parts",
  "Pharmaceuticals",
  "Furniture",
  "Construction Materials"
];

const CargoDetailsForm = () => {
  const [cargoType, setCargoType] = useState('');
  const [weight, setWeight] = useState('');
  const [budget, setBudget] = useState('');
  const [filteredCargoTypes, setFilteredCargoTypes] = useState<string[]>([]);
  const [showCargoDropdown, setShowCargoDropdown] = useState(false);
  const [formErrors, setFormErrors] = useState({
    cargoType: false,
    weight: false,
    budget: false
  });

  const handleCargoTypeChange = (value: string) => {
    setCargoType(value);
    
    if (value.trim() !== '') {
      const filtered = cargoTypes.filter(type => 
        type.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredCargoTypes(filtered);
      setShowCargoDropdown(true);
    } else {
      setShowCargoDropdown(false);
    }
  };

  const selectCargoType = (type: string) => {
    setCargoType(type);
    setShowCargoDropdown(false);
    setFormErrors(prev => ({ ...prev, cargoType: false }));
  };

  const handleWeightChange = (value: string) => {
    // Only allow numbers and decimals
    const regex = /^\d*\.?\d*$/;
    if (value === '' || regex.test(value)) {
      setWeight(value);
      setFormErrors(prev => ({ ...prev, weight: false }));
    }
  };

  const handleBudgetChange = (value: string) => {
    // Only allow numbers and decimals
    const regex = /^\d*\.?\d*$/;
    if (value === '' || regex.test(value)) {
      setBudget(value);
      setFormErrors(prev => ({ ...prev, budget: false }));
    }
  };

  const validateForm = () => {
    const errors = {
      cargoType: cargoType.trim() === '',
      weight: weight.trim() === '' || parseFloat(weight) <= 0,
      budget: budget.trim() === '' || parseFloat(budget) <= 0
    };
    
    setFormErrors(errors);
    return !Object.values(errors).some(Boolean);
  };

  const handleSubmit = () => {
    if (validateForm()) {
      toast.success("Cargo details submitted successfully!");
      // Here you would typically send the data to your backend
      console.log({
        cargoType,
        weight: parseFloat(weight),
        budget: parseFloat(budget)
      });
    } else {
      toast.error("Please correct the errors in the form");
    }
  };

  return (
    <Card className="shadow-md rounded-2xl p-5 mb-6 animate-fade-in">
      <h2 className="text-lg font-semibold mb-4">Cargo Details</h2>
      
      <div className="space-y-4">
        {/* Cargo Type */}
        <div>
          <label htmlFor="cargoType" className="block text-sm font-medium text-gray-700 mb-1">
            Cargo Type
          </label>
          <div className="relative">
            <input
              id="cargoType"
              type="text"
              value={cargoType}
              onChange={(e) => handleCargoTypeChange(e.target.value)}
              placeholder="Select or type cargo type"
              className={`input-field ${formErrors.cargoType ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}`}
            />
            {formErrors.cargoType && (
              <div className="flex items-center mt-1 text-red-500 text-sm">
                <AlertCircle className="h-4 w-4 mr-1" />
                <span>Cargo type is required</span>
              </div>
            )}
            
            {showCargoDropdown && filteredCargoTypes.length > 0 && (
              <div className="absolute w-full bg-white mt-1 rounded-xl shadow-lg z-10 border border-gray-100 max-h-60 overflow-auto">
                {filteredCargoTypes.map((type, index) => (
                  <div
                    key={index}
                    className="p-2 hover:bg-gray-50 cursor-pointer"
                    onClick={() => selectCargoType(type)}
                  >
                    {type}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        
        {/* Weight */}
        <div>
          <label htmlFor="weight" className="block text-sm font-medium text-gray-700 mb-1">
            Average Weight (kg)
          </label>
          <input
            id="weight"
            type="text"
            value={weight}
            onChange={(e) => handleWeightChange(e.target.value)}
            placeholder="Enter weight in kg"
            className={`input-field ${formErrors.weight ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}`}
          />
          {formErrors.weight && (
            <div className="flex items-center mt-1 text-red-500 text-sm">
              <AlertCircle className="h-4 w-4 mr-1" />
              <span>Weight must be greater than 0</span>
            </div>
          )}
        </div>
        
        {/* Budget */}
        <div>
          <label htmlFor="budget" className="block text-sm font-medium text-gray-700 mb-1">
            Estimated Budget ($)
          </label>
          <input
            id="budget"
            type="text"
            value={budget}
            onChange={(e) => handleBudgetChange(e.target.value)}
            placeholder="Enter budget in $"
            className={`input-field ${formErrors.budget ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}`}
          />
          {formErrors.budget && (
            <div className="flex items-center mt-1 text-red-500 text-sm">
              <AlertCircle className="h-4 w-4 mr-1" />
              <span>Budget must be greater than 0</span>
            </div>
          )}
        </div>
        
        <button
          onClick={handleSubmit}
          className="btn-primary w-full flex items-center justify-center gap-2 mt-2"
        >
          <Check className="h-5 w-5" />
          Submit Cargo Details
        </button>
      </div>
    </Card>
  );
};

export default CargoDetailsForm;
