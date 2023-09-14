import React, { useState, useEffect } from 'react';

const predefinedColors: string[] = ['#ff5733', '#33ff57', '#5733ff', '#ff57b7', '#57b7ff'];

interface Country {
  name: string;
  code: string;
  size: string;
}

const countriesData: Country[] = [
  { name: 'Country 1', code: 'C1', size: 'Small' },
  { name: 'Country 2', code: 'C2', size: 'Medium' },
  // Add more countries here
];

const CountryFilter: React.FC = () => {
  const [filteredCountries, setFilteredCountries] = useState<Country[]>(countriesData);
  const [selectedItemIndex, setSelectedItemIndex] = useState<number | null>(null);

  const handleFilterChange = (filter: string) => {
    const filterParts = filter.split(' ');
    let filtered = countriesData;

    filterParts.forEach((part) => {
      const [key, value] = part.split(':');
      if (key === 'search') {
        filtered = filtered.filter((country) =>
          country.name.toLowerCase().includes(value.trim().toLowerCase())
        );
      } else if (key === 'group') {
        const grouped: { [key: string]: Country[] } = {};
        filtered.forEach((country) => {
          if (value === 'size' && country.size) {
            const keyValue = country.size;
            if (!grouped[keyValue]) {
              grouped[keyValue] = [];
            }
            grouped[keyValue].push(country);
          }
        });
        filtered = Object.values(grouped).flat();
      }
    });

    setFilteredCountries(filtered);
    setSelectedItemIndex(null);
  };

  const handleItemSelect = (index: number) => {
    setSelectedItemIndex(index);
  };

  useEffect(() => {
    if (filteredCountries.length > 0 && selectedItemIndex === null) {
      setSelectedItemIndex(Math.min(9, filteredCountries.length - 1));
    }
  }, [filteredCountries, selectedItemIndex]);

  return (
    <div>
      <input
        type="text"
        placeholder="Filter..."
        onChange={(e) => handleFilterChange(e.target.value)}
      />
      <ul>
        {filteredCountries.map((country, index) => (
          <li
            key={index}
            onClick={() => handleItemSelect(index)}
            className={index === selectedItemIndex ? 'selected' : ''}
            style={{ backgroundColor: predefinedColors[index % predefinedColors.length] }}
          >
            {country.name} ({country.size})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CountryFilter;
