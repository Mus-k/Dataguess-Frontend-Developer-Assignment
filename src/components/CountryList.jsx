import React, { useState, useEffect, useCallback } from "react";

const COLORS = ["#ddd", "#33FF59"];

const CountryList = ({ data, error, loading }) => {
  const [selectedColor, setSelectedColor] = useState(COLORS[0]);
  const [filter, setFilter] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const [click, setClick] = useState(false);
  console.log(selectedColor);
  const handleSelect = useCallback((item) => {
    setSelectedItem(item);
    // onSelect(item);
  }, []);
  const changeColor = () => {
    setSelectedColor(COLORS[1]);
    setClick(true);
  };
  // const tenItems=data.countries.slice(0, 10).map(el=>
  //   el
  //   )
  //   console.log(tenItems);
  useEffect(() => {
    if (data && data.countries.length > 0) {
      const initialSelection =
        data.countries.length >= 10 ? 9 : data.countries.length - 1;

      if (!click) {
        handleSelect(data.countries[initialSelection]);
      }
    }
  }, [data, handleSelect, click]);

  const filteredCountries = data
    ? data.countries.filter((country) =>
        filter
          .toLowerCase()
          .split(" ")
          .every((term) =>
            term.startsWith("group:")
              ? country.size === term.split(":")[1]
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
          filteredCountries.map((country, index) => (
            <li
              key={index}
              onClick={() => {
                handleSelect(country);
                changeColor();
              }}
              className={!click && index < 10 ? "first10" : ""}
              style={{
                backgroundColor: selectedItem === country ? selectedColor : "",
              }}
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
