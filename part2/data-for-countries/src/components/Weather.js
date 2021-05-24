import axios from 'axios';
import { useEffect, useState } from 'react';

const api_key = process.env.REACT_APP_API_KEY;

const Weather = ({ capital }) => {
  const [weather, setWeather] = useState({});

  useEffect(() => {
    axios
      .get(
        `http://api.weatherapi.com/v1/current.json?key=${api_key}&q=${capital}`
      )
      .then(res => {
        console.log(res.data.current.temp_c);
        setWeather(res.data);
        console.log(weather.current.temp_c);
      });
  }, [capital]);

  return (
    <div>
      <h3>Weather in {capital}</h3>
      <p>Temperature: {weather.current.temp_c} Celcius</p>
      <p>{weather.current.condition.text}</p>
      {/* <img src={weather.current.weather_icons[0]} /> */}
    </div>
  );
};

export default Weather;

// http://api.weatherstack.com/current?access_key=487d5896706dcc6379563410f685e478&query=ottawa
