
import { useState } from 'react';
import { Search, MapPin } from 'lucide-react';
import { Card } from '@/components/ui/card';
import Map from './Map';

const LocationInput = ({ onLocationChange }: { onLocationChange?: (location: string) => void }) => {
  const [searchValue, setSearchValue] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [selectedLocation, setSelectedLocation] = useState('');

  // Simulação de busca de localização com empresas brasileiras
  const handleSearch = (query: string) => {
    setSearchValue(query);
    
    if (query.length > 2) {
      const mockSuggestions = [
        `${query} Logística`,
        `${query} Internacional`,
        `${query} Transportes`,
        `${query} Cargas`
      ];
      setSuggestions(mockSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  const selectLocation = (location: string) => {
    setSelectedLocation(location);
    setSearchValue(location);
    setSuggestions([]);
    onLocationChange?.(location);
  };

  return (
    <Card className="shadow-md rounded-2xl p-5 mb-6 animate-fade-in">
      <h2 className="text-lg font-semibold mb-4">Localização de Origem</h2>
      
      <div className="relative">
        <div className="flex items-center border rounded-xl overflow-hidden input-field">
          <MapPin className="h-5 w-5 text-gray-400 mr-2" />
          <input
            type="text"
            value={searchValue}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Buscar empresa ou localização"
            className="flex-1 py-2 focus:outline-none bg-transparent"
          />
          <button className="p-2">
            <Search className="h-5 w-5 text-gray-400" />
          </button>
        </div>
        
        {/* Sugestões dropdown */}
        {suggestions.length > 0 && (
          <div className="absolute w-full bg-white dark:bg-gray-800 mt-1 rounded-xl shadow-lg z-10 border border-gray-100 dark:border-gray-700">
            {suggestions.map((suggestion, index) => (
              <div
                key={index}
                className="p-2 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
                onClick={() => selectLocation(suggestion)}
              >
                {suggestion}
              </div>
            ))}
          </div>
        )}
      </div>
      
      <div className="mt-4">
        <Map originLocation={selectedLocation} height="240px" />
      </div>
      
      {selectedLocation && (
        <div className="mt-4 p-3 bg-neutral-light dark:bg-gray-700 rounded-xl flex items-center">
          <MapPin className="h-5 w-5 text-accent1 mr-2" />
          <span className="text-sm font-medium">{selectedLocation}</span>
        </div>
      )}
    </Card>
  );
};

export default LocationInput;
