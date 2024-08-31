// src/Weather.js
import React, { useState } from 'react';

const Weather = () => {
  const [location, setLocation] = useState('');
  const [coordinates, setCoordinates] = useState(null);
  const [temperature, setTemperature] = useState(null);
  const [error, setError] = useState('');

  const API_KEY = '7350367e9f3b19ef6d2187dc7553e936';

  const getCoordinates = async () => {
    try {
      const response = await fetch(
        `http://api.openweathermap.org/geo/1.0/direct?q=${location}&appid=${API_KEY}`
      );
      const data = await response.json();
      if (data.length === 0) {
        setError('Location not found');
        return;
      }
      const { lat, lon } = data[0];
      setCoordinates({ lat, lon });
      getTemperature(lat, lon);
    } catch (err) {
      setError('Failed to fetch coordinates');
    }
  };

  const getTemperature = async (lat, lon) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
      );
      const data = await response.json();
      setTemperature(data.main.temp);
    } catch (err) {
      setError('Failed to fetch temperature');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    getCoordinates();
  };

  return (
    <div>
      <h1>Weather App</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Enter location"
        />
        <button type="submit">Get Weather</button>
      </form>
      {error && <p>{error}</p>}
      {coordinates && (
        <div>
          <h2>Coordinates</h2>
          <p>Latitude: {coordinates.lat}</p>
          <p>Longitude: {coordinates.lon}</p>
        </div>
      )}
      {temperature !== null && (
        <div>
          <h2>Temperature</h2>
          <p>{temperature} °C</p>
        </div>
      )}
    </div>
  );
};

export default Weather;
