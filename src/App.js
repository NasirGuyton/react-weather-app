
import React, { useState, useEffect } from 'react';
import WeatherForm from './WeatherForm';
import DisplayWeather from './DisplayWeather';
import './App.css';

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [unit, setUnit] = useState('imperial');
  const [lastSearched, setLastSearched] = useState(() => {
    return localStorage.getItem('lastSearched') || '';
  });

  const API_KEY = '76377d16a01762cf5feae4b51830bf42';

  const fetchWeather = async (zip) => {
    if (!zip || zip.length !== 5) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?zip=${zip},us&units=${unit}&appid=${API_KEY}`
      );
      
      const data = await response.json();
      
      if (data.cod !== 200) {
        throw new Error(data.message || 'Failed to fetch weather data');
      }
      
      setWeatherData(data);
      setLastSearched(zip);
      localStorage.setItem('lastSearched', zip);
    } catch (err) {
      setError(err.message);
      setWeatherData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (lastSearched) {
      fetchWeather(lastSearched);
    }
  }, [unit]); 

  return (
    <div className={`app ${weatherData?.weather[0]?.main.toLowerCase()}`}>
      <h1>Weather App</h1>
      
      <WeatherForm 
        onSubmit={fetchWeather} 
        unit={unit} 
        setUnit={setUnit}
        lastSearched={lastSearched}
      />
      
      {loading && <div className="loading">Loading weather data...</div>}
      
      {error && (
        <div className="error">
          Error: {error}
        </div>
      )}
      
      {weatherData && <DisplayWeather data={weatherData} unit={unit} />}
    </div>
  );
}

export default App;