import React, { useState, useEffect, useCallback } from "react";

//predefined set of colors
const COLORS = [
  "#CCC8AA",
  "#7D7C7C",
  "#004225",
  "#EBE4D1",
  "#26577C",
  "#35A29F",
  "#AE445A",
  "#8ECDDD",
  "#4F709C",
  "#176B87",
  "#435334",
  "#5C5470",
  "#5C5470",
];

const CountryList = ({ data, error, loading }) => {
  const [initialColor] = useState(COLORS[7]);
  const [selectedColor, setSelectedColor] = useState(COLORS[0]);
  const [filter, setFilter] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const [click, setClick] = useState(false);
  const [firstTen, setFirstTen] = useState(false);

  // handle select function
  const handleSelect = useCallback((item) => {
    setSelectedItem(item);
  }, []);

  function getRandomColor() {
    const randomIndex = Math.floor(Math.random() * COLORS.length);
    return COLORS[randomIndex];
  }

  // Generate a random color on each click
  const changeColor = () => {
    const randomBackgroundColor = getRandomColor();
    setSelectedColor(randomBackgroundColor);
    setClick(true);
  };

  // the logic to give background-color to the first 10 countries
  useEffect(() => {
    if (data && data.countries.length > 0) {
      const initialSelection =
        data.countries.length >= 10
          ? setFirstTen(true)
          : data.countries.length - 1;
      if (!click) {
        handleSelect(data.countries[initialSelection]);
      }
    }
  }, [data, handleSelect, click]);

  // filtering logic
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
    <div className="countryList">
      <div className="inputBox">
        <input
          type="text"
          placeholder="Filter countries..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
      </div>
      <div>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error.message}</p>
        ) : filteredCountries.length === 0 ? (
          <p>No matching countries found.</p>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>Fetching Country Names</th>
                <th>CODES</th>
              </tr>
            </thead>
            <tbody>
              {filteredCountries.map((country, index) => (
                <tr
                  key={index}
                  onClick={() => {
                    handleSelect(country);
                    changeColor();
                  }}
                  style={{
                    backgroundColor:
                      // eslint-disable-next-line no-unused-vars
                      selectedItem === country
                        ? // eslint-disable-next-line no-unused-vars
                          selectedColor
                        : firstTen && !click && index < 10
                        ? ""
                        : "",
                  }}
                >
                  <td>{country.name}</td>
                  <td>{country.code}</td>
                  {/* no country size in it so I display code */}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default CountryList;
