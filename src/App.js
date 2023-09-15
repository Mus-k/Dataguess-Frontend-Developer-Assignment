import { useQuery, gql } from "@apollo/client";
import CountryList from "./CountryList";
const GET_COUNTRIES = gql`
  query {
    countries {
      code
      name
    }
  }
`;
function App() {
  const { loading, error, data } = useQuery(GET_COUNTRIES);
  return (
    <div className="App">
      <h1>Country List</h1>
      <div className="container">
        <CountryList data={data} error={error} loading={loading} />
      </div>
    </div>
  );
}

export default App;
