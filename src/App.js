
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import WeatherToday from './components/WeatherToday';
import WeatherWeekly from './components/WeatherWeekly';
import SearchBar from './components/SearchBar';
import './App.css';

const App = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [weeklyData, setWeeklyData] = useState([]);
  const [city, setCity] = useState('Hyderabad'); // Default city
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const [isMobile, setIsMobile] = useState(false); // State to track mobile screen size
  // Function to fetch weather data
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Consider mobile if screen width <= 768px
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Check initial screen size on load

    return () => window.removeEventListener('resize', handleResize);
  }, []);
  const fetchWeatherData = async (cityName) => {
    try {
      setLoading(true); // Start loading
      setError(null); // Reset error state
      const apiKey = 'cbb4cbcd3a35d7abddd827cf13751700'; // Replace with your API key

      // Fetch current weather data
      const currentWeatherRes = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${apiKey}`
      );
      setWeatherData(currentWeatherRes.data);

      // Fetch 5-day forecast data
      const forecastRes = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=metric&appid=${apiKey}`
      );

      // Process forecast data to extract daily forecast
      const dailyForecast = forecastRes.data.list
        .filter((item) => item.dt_txt.includes('12:00:00')) // Filter for mid-day forecasts
        .map((item) => {
          const date = new Date(item.dt_txt);
          return {
            day: date.toLocaleDateString('en-US', { weekday: 'short' }),
            date: date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }), // Full date
            temp: item.main.temp,
            weather: item.weather[0].main,
            icon: item.weather[0].icon,
          };
        });

      setWeeklyData(dailyForecast);
    } catch (error) {
      console.error('Error fetching weather data:', error);
      setError('Failed to fetch weather data. Please check the city name or your API key.');
    } finally {
      setLoading(false); // Stop loading
    }
  };

  // Fetch weather data when the component mounts or when the city changes
  useEffect(() => {
    fetchWeatherData(city);
  }, [city]); // city as a dependency

  const handleSearch = (cityName) => {
    setCity(cityName); // Update the city state to trigger useEffect
  };

  return (
    <div className="weather-app"
       style={{
        height: '130vh', // Full viewport height
        background: 'linear-gradient(180deg, #1C3F94 0%, #87CEFA 100%)', // Background gradient
        
        padding: '20px', // Optional: padding around content
      }}>
      <SearchBar onSearch={handleSearch} /> {/* Search bar is here */}
      
      {loading && <p>Loading...</p>} {/* Display loading state */}

      {error && <p className="error-message">{error}</p>} {/* Display error message */}
      
      {weatherData && <WeatherToday weatherData={weatherData} />}
      {weeklyData.length > 0 && <WeatherWeekly weeklyData={weeklyData} />}
    </div>
  );
};

export default App;
