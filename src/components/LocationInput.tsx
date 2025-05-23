
import { useState } from 'react';
import { Search, MapPin } from 'lucide-react';
import { Card } from '@/components/ui/card';

const LocationInput = () => {
  const [searchValue, setSearchValue] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [selectedLocation, setSelectedLocation] = useState('');

  // Simulated location search
  const handleSearch = (query: string) => {
    setSearchValue(query);
    
    // Mock API call - in a real app, this would call a geocoding service
    if (query.length > 2) {
      const mockSuggestions = [
        `${query} Logistics`,
        `${query} International`,
        `${query} Shipping Co.`,
        `${query} Freight Services`
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
  };

  return (
    <Card className="shadow-md rounded-2xl p-5 mb-6 animate-fade-in">
      <h2 className="text-lg font-semibold mb-4">Origin Location</h2>
      
      <div className="relative">
        <div className="flex items-center border rounded-xl overflow-hidden input-field">
          <MapPin className="h-5 w-5 text-gray-400 mr-2" />
          <input
            type="text"
            value={searchValue}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Search company or location"
            className="flex-1 py-2 focus:outline-none bg-transparent"
          />
          <button className="p-2">
            <Search className="h-5 w-5 text-gray-400" />
          </button>
        </div>
        
        {/* Suggestions dropdown */}
        {suggestions.length > 0 && (
          <div className="absolute w-full bg-white mt-1 rounded-xl shadow-lg z-10 border border-gray-100">
            {suggestions.map((suggestion, index) => (
              <div
                key={index}
                className="p-2 hover:bg-gray-50 cursor-pointer"
                onClick={() => selectLocation(suggestion)}
              >
                {suggestion}
              </div>
            ))}
          </div>
        )}
      </div>
      
      <div className="mt-4 h-60 bg-gray-100 rounded-xl flex items-center justify-center">
        <p className="text-gray-500">Interactive map will be displayed here</p>
        {/* This would be replaced with an actual map component */}
      </div>
      
      {selectedLocation && (
        <div className="mt-4 p-3 bg-neutral-light rounded-xl flex items-center">
          <MapPin className="h-5 w-5 text-accent1 mr-2" />
          <span className="text-sm font-medium">{selectedLocation}</span>
        </div>
      )}
    </Card>
  );
};

export default LocationInput;
