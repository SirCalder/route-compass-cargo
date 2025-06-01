// src/components/LocationInput.tsx (Conforme o seu último input)
import React, { useState, useEffect } from 'react'; //
import { useRoute } from '../contexts/RouteContext'; // Ajuste o caminho conforme sua estrutura
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { MapPin, RotateCcw } from 'lucide-react';

const LocationInput: React.FC = () => {
  const [inputValue, setInputValue] = useState(''); //
  const { geocodeAndSetOrigin, clearRoute, originAddress } = useRoute(); //

  useEffect(() => { //
    setInputValue(originAddress);
  }, [originAddress]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleCalculateRoute = () => { //
    if (inputValue.trim()) {
      geocodeAndSetOrigin(inputValue); //
    } else {
      alert('Por favor, insira um endereço de origem.'); //
    }
  };

  const handleClearRoute = () => { //
    setInputValue(''); //
    clearRoute(); //
  };

  return (
    <Card className="shadow-md rounded-2xl p-5 animate-fade-in"> {/* Removido mb-6 */}
      <h2 className="text-lg font-semibold mb-4">Origem da Rota para o Aeroporto</h2>
      <div className="space-y-4">
        <div className="relative flex items-center">
          <MapPin className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <Input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Digite o endereço de origem"
            className="pl-10 pr-4 py-2 w-full"
          />
        </div>
        <div className="flex space-x-2">
          <Button onClick={handleCalculateRoute} className="flex-1 btn-primary"> {/* */}
            Calcular Rota para Aeroporto
          </Button>
          <Button onClick={handleClearRoute} variant="outline" className="flex-1"> {/* */}
            <RotateCcw className="mr-2 h-4 w-4" /> Limpar Rota
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default LocationInput; //