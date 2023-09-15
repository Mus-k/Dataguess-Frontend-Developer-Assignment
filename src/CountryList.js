import React, { useState, useEffect, useCallback } from "react";
const CountryList = ({ onSelect, data, error, loading }) => {
  const [filter, setFilter] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);

  const handleSelect = useCallback((item) => {
    setSelectedItem(item);
    onSelect(item);
  }, [onSelect]);

  useEffect(() => {
    if (data && data.countries.length > 0) {
      const initialSelection = data.countries.length >= 10 ? 9 : data.countries.length - 1;
      handleSelect(data.countries[initialSelection]);
    }
  }, [data, handleSelect]);

  const filteredCountries = data
    ? data.countries.filter((country) =>
        filter
          .toLowerCase()
          .split(' ')
          .every((term) =>
            term.startsWith('group:')
              ? country.size === term.split(':')[1]
              : country.name.toLowerCase().includes(term)
          )
      )
    : [];

  return (
    <div>
      <input
        type="text"
        placeholder="Filter countries..."
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />
      <ul>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error.message}</p>
        ) : filteredCountries.length === 0 ? (
          <p>No matching countries found.</p>
        ) : (
          filteredCountries.map((country) => (
            <li
              key={country.code}
              onClick={() => handleSelect(country)}
              className={selectedItem === country ? 'selected' : ''}
            >
              {country.name}
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default CountryList;