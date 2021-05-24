import axios from 'axios';
import { useEffect, useState } from 'react';
import Results from './components/Results';
import Search from './components/Search';

function App() {
  const [search, setSearch] = useState('');
  const [results, setResults] = useState([]);

  const handleChange = e => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(res => setResults(res.data));
  }, []);

  const countriesToShow = results.filter(country =>
    country.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h1>Find Countries</h1>
      <Search search={search} handleChange={handleChange} />

      <h2>Search Results</h2>
      <Results countriesToShow={countriesToShow} />
    </div>
  );
}

export default App;
