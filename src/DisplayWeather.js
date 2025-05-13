
import React from 'react';

const DisplayWeather = ({ data, unit }) => {
  const weather = data.weather[0];
  const main = data.main;
  const wind = data.wind;
  const iconUrl = `https://openweathermap.org/img/wn/${weather.icon}@2x.png`;

  return (
    <div className="weather-display">
      <h2>
        Weather in {data.name}
        <img src={iconUrl} alt={weather.description} />
      </h2>
      
      <div className="weather-grid">
        <div className="main-temp">
          {Math.round(main.temp)}°{unit === 'metric' ? 'C' : 'F'}
          <div className="description">{weather.description}</div>
        </div>
        
        <div className="details">
          <div>Feels like: {Math.round(main.feels_like)}°</div>
          <div>Humidity: {main.humidity}%</div>
          <div>Wind: {Math.round(wind.speed)} {unit === 'metric' ? 'm/s' : 'mph'}</div>
          <div>Pressure: {main.pressure} hPa</div>
        </div>
      </div>
    </div>
  );
};

export default DisplayWeather;