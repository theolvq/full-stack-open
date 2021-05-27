import axios from 'axios';
import { useEffect, useState } from 'react';

const api_key = process.env.REACT_APP_API_KEY;

const Weather = ({ capital }) => {
  const [weather, setWeather] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const url = `http://api.weatherapi.com/v1/current.json?key=${api_key}&q=${capital}`;

  useEffect(() => {
    setIsLoading(true);
    axios.get(url).then(res => {
      setWeather(res.data);
    });
    setIsLoading(false);
  }, [url]);

  return (
    <div>
      {!isLoading && weather ? (
        <>
          <h3>Weather in {capital}</h3>
          <p>Temperature: {weather.current.temp_c} Celcius</p>
          <img
            src={weather.current.condition.icon}
            alt={weather.current.condition.text}
          />
          <p>{weather.current.condition.text}</p>
        </>
      ) : (
        <h3>Loading...</h3>
      )}
    </div>
  );
};

export default Weather;
