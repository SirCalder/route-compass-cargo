import { useState } from 'react';
import { Check, AlertCircle } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';

const cargoTypes = [
  "Mercadoria Geral",
  "Eletrônicos",
  "Têxteis",
  "Maquinário",
  "Produtos Químicos",
  "Produtos Alimentícios",
  "Peças Automotivas",
  "Farmacêuticos",
  "Móveis",
  "Materiais de Construção",
  "Madeira",
  "Embalagens"
  
];

interface CargoDetailsFormProps {
  onCargoChange?: (cargoDetails: { cargoType: string; weight: number; budget: number }) => void;
}

const CargoDetailsForm: React.FC<CargoDetailsFormProps> = ({ onCargoChange }) => {
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
      const cargoDetails = {
        cargoType,
        weight: parseFloat(weight),
        budget: parseFloat(budget)
      };
      toast.success("Detalhes da carga enviados com sucesso!");
      onCargoChange?.(cargoDetails);
      console.log(cargoDetails);
    } else {
      toast.error("Por favor, corrija os erros no formulário");
    }
  };

  return (
    <Card className="shadow-md rounded-2xl p-5 mb-6 animate-fade-in">
      <h2 className="text-lg font-semibold mb-4">Detalhes da Carga</h2>
      
      <div className="space-y-4">
        {/* Cargo Type */}
        <div>
          <label htmlFor="cargoType" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Tipo de Carga
          </label>
          <div className="relative">
            <input
              id="cargoType"
              type="text"
              value={cargoType}
              onChange={(e) => handleCargoTypeChange(e.target.value)}
              placeholder="Selecione ou digite o tipo de carga"
              className={`input-field ${formErrors.cargoType ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}`}
            />
            {formErrors.cargoType && (
              <div className="flex items-center mt-1 text-red-500 text-sm">
                <AlertCircle className="h-4 w-4 mr-1" />
                <span>Tipo de carga é obrigatório</span>
              </div>
            )}
            
            {showCargoDropdown && filteredCargoTypes.length > 0 && (
              <div className="absolute w-full bg-white dark:bg-gray-800 mt-1 rounded-xl shadow-lg z-10 border border-gray-100 dark:border-gray-700 max-h-60 overflow-auto">
                {filteredCargoTypes.map((type, index) => (
                  <div
                    key={index}
                    className="p-2 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
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
          <label htmlFor="weight" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Peso da Carga (toneladas)
          </label>
          <input
            id="weight"
            type="text"
            value={weight}
            onChange={(e) => handleWeightChange(e.target.value)}
            placeholder="Digite o peso em toneladas"
            className={`input-field ${formErrors.weight ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}`}
          />
          {formErrors.weight && (
            <div className="flex items-center mt-1 text-red-500 text-sm">
              <AlertCircle className="h-4 w-4 mr-1" />
              <span>Peso deve ser maior que 0</span>
            </div>
          )}
        </div>
        
        {/* Budget */}
        <div>
          <label htmlFor="budget" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Orçamento Estimado (R$)
          </label>
          <input
            id="budget"
            type="text"
            value={budget}
            onChange={(e) => handleBudgetChange(e.target.value)}
            placeholder="Digite o orçamento em R$"
            className={`input-field ${formErrors.budget ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}`}
          />
          {formErrors.budget && (
            <div className="flex items-center mt-1 text-red-500 text-sm">
              <AlertCircle className="h-4 w-4 mr-1" />
              <span>Orçamento deve ser maior que 0</span>
            </div>
          )}
        </div>
        
        <button
          onClick={handleSubmit}
          className="btn-primary w-full flex items-center justify-center gap-2 mt-2"
        >
          <Check className="h-5 w-5" />
          Enviar Detalhes da Carga
        </button>
      </div>
    </Card>
  );
};

export default CargoDetailsForm;
