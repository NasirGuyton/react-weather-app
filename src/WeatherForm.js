import React, { useState } from 'react';

const WeatherForm = ({ onSubmit, unit, setUnit, lastSearched }) => {
  const [zip, setZip] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(zip);
  };

  return (
    <form onSubmit={handleSubmit} className="weather-form">
      <input
        type="text"
        value={zip}
        onChange={(e) => setZip(e.target.value)}  
        placeholder="Enter ZIP code"
        pattern="\d{5}"
        required
      />
      
      <div className="unit-selector">
        <label>
          <input
            type="radio"
            checked={unit === 'imperial'}
            onChange={() => setUnit('imperial')}
          />
          °F
        </label>
        <label>
          <input
            type="radio"
            checked={unit === 'metric'}
            onChange={() => setUnit('metric')}
          />
          °C
        </label>
      </div>
      
      <button type="submit">Get Weather</button>
      
      {lastSearched && (
        <button 
          type="button" 
          className="last-search"
          onClick={() => onSubmit(lastSearched)}
        >
          Reload Last Search
        </button>
      )}
    </form>
  );
};

export default WeatherForm;