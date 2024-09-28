import React from 'react';
import './WeatherWeekly.css';

const WeatherWeekly = ({ weeklyData,isMobile }) => {
  return (
    <div className="weather-weekly"   style={{
      flexDirection: isMobile ? 'column' : 'row', // Stack items vertically on mobile
    }}>
      <h3>Weekly Forecast</h3>
      <div className="weekly-container">
        {weeklyData.map((day, index) => (
          <div key={index} className="daily-forecast" style={{
            width: isMobile ? '100%' : '150px', // Adjust width for mobile
          }}>
            <p className="day">{day.day}</p>
            <p className="date">{day.date}</p> {/* Displaying the date */}
            <img
              src={`http://openweathermap.org/img/wn/${day.icon}@2x.png`}
              alt={day.weather}
              className="weather-icon"
            />
            <p className="temp">{Math.round(day.temp)}°C</p>
            <p className="weather">{day.weather}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeatherWeekly;
