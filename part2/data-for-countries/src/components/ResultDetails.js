import Weather from './Weather';

const ResultDetails = ({ country }) => {
  return (
    <div>
      <div key={country.alpha2Code}>
        <h2>{country.name}</h2>
        <p>Capital: {country.capital}</p>
        <p>Population: {country.population}</p>
        <h3>Languages spoken in the country</h3>
        <ul>
          {country.languages.map(language => (
            <li key={language.iso639_2}>{language.name}</li>
          ))}
        </ul>
        <img src={country.flag} alt={`${country.name}'s flag`} width="500px" />
      </div>
      <Weather capital={country.capital} />
    </div>
  );
};

export default ResultDetails;
