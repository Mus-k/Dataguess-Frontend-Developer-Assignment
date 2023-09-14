import React from 'react'
import countries from './countriesData.json'
import CountryFilter from './CountryList';
function App() {
  const {data}=countries;
  console.log(data.countries);
  
  return (
    <div style={{paddingLeft:"150px"}}>
    <h2>countries</h2>
     {data.countries.map((item)=>(
      <div key={item.code}>
       <h3>{item.name} <span>{item.size}</span></h3>
      </div>
     ))}
     <div>
      <CountryFilter/>
     </div>
    </div>
  )
}

export default App

