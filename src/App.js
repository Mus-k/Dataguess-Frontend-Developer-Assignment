// Import everything needed to use the `useQuery` hook
import { useQuery, gql } from "@apollo/client";
import { useState } from "react";
import CountryList from "./CountryList";
import ColorPicker from "./ColorPicker";
const GET_COUNTRIES = gql`
  query {
    countries {
      code
      name
    }
  }
`;
function App() {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const { loading, error, data } = useQuery(GET_COUNTRIES);
  const handleCountrySelect = (country) => {
    setSelectedCountry(country);
  };

  const handleColorSelect = (color) => {
    setSelectedColor(color);
  };

  return (
    <div className="App">
      <h1>Country List</h1>
      <div className="container">
        <CountryList onSelect={handleCountrySelect} data={data}
        error={error} loading={loading}/>
        <ColorPicker onSelectColor={handleColorSelect} />
      </div>
      <div className="selected-country">
        {selectedCountry && (
          <div style={{ backgroundColor: selectedColor }}>
            Selected Country: {selectedCountry.name}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;