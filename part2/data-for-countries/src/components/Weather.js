import axios from 'axios';
import { useEffect, useState } from 'react';

const api_key = process.env.REACT_APP_API_KEY;

const Weather = ({ capital }) => {
  const [weather, setWeather] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const url = `http://api.weatherapi.com/v1/current.json?key=${api_key}&q=${capital}`;

  useEffect(() => {
    setIsLoading(true);
    // fetch(
    //   `http://api.weatherapi.com/v1/current.json?key=${api_key}&q=${capital}`
    // )
    // axios.get(url).then(res => {
    //   setWeather(res.data.current.temp_c);
    //   console.log(res.data.current.temp_c);
    //   console.log(res.data);
    //   console.log(weather);
    // });
    requestWeather();
    console.log(weather);
    setIsLoading(false);
  }, []);

  async function requestWeather() {
    const res = await axios.get(url);
    console.log(res);
    setWeather(res);
    console.log(weather);
    // const json = await res.json();
    // setWeather(json);
    // console.log(json);
  }

  return (
    <div>
      placeholder
      {/* {isLoading ? (
        <h3>Loading...</h3>
      ) : (
        <>
          <h3>Weather in {capital}</h3>
          <p>Temperature: {weather.current.temp_c} Celcius</p>
        </>
      )} */}
      {/* <p>{weather.current.condition.text}</p> */}
      {/* <img src={weather.current.weather_icons[0]} /> */}
    </div>
  );
};

export default Weather;
