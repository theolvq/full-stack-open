import { useState } from 'react';
import ResultDetails from './ResultDetails';

const Results = ({ countriesToShow }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [id, setId] = useState('');

  const showDetails = id => {
    setIsVisible(!isVisible);
    setId(id);
  };

  const selectedCountry = countriesToShow.find(
    country => country.alpha2Code === id
  );

  return (
    <div>
      {countriesToShow.length <= 10 && countriesToShow.length > 1 ? (
        countriesToShow.map(country => (
          <div key={country.alpha2Code} id={country.alpha2Code}>
            <p>
              {country.name}{' '}
              <button onClick={() => showDetails(country.alpha2Code)}>
                Show
              </button>{' '}
            </p>
            {isVisible && country === selectedCountry && (
              <ResultDetails country={selectedCountry} />
            )}
          </div>
        ))
      ) : countriesToShow.length === 1 ? (
        <ResultDetails country={countriesToShow[0]} />
      ) : (
        <p>Too many matches, specifiy another filter</p>
      )}
    </div>
  );
};

export default Results;
