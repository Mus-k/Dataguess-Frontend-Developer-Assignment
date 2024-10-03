import { useQuery, gql } from "@apollo/client";
import CountryList from "./components/CountryList";
import "./App.css";
import Navbar from "./components/Navbar";
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
      <Navbar />
      <h1 className="title">Working with Apollo Client in Reactjs</h1>
      <h4 className="list-title">Fetching Country Names</h4>
      <div className="container">
        <CountryList data={data} error={error} loading={loading} />
      </div>
    </div>
  );
}

export default App;
