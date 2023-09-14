
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CountryList from './CountryList';

const App: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [countries, setCountries] = useState<any[]>([]);

  const SELECTABLE_COLORS = ['#FF5733', '#33FF57', '#5733FF']; // Define your colors

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all') // Public REST API for countries
      .then((response) => {
        setCountries(response.data);
        const tenthCountry = response.data[9]?.currencies?.[0]?.code;
        setSelectedCountry(tenthCountry || null);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSelectCountry = (code: string) => {
    setSelectedCountry(code);
  };

  // Apply filtering logic based on the searchTerm here

  return (
    <div>
      <input
        type="text"
        placeholder="Search and group (e.g., search:tt group:size)"
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <CountryList
        countries={countries}
        selectedCountry={selectedCountry}
        onCountrySelect={handleSelectCountry}
      />
    </div>
  );
};

export default App;