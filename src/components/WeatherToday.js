// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchWeatherToday } from '../redux/weatherActions';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faCloudSun, faWind, faTint } from '@fortawesome/free-solid-svg-icons';
// import './WeatherToday.css'
// const WeatherToday = ({ location }) => {
//   const dispatch = useDispatch();
//   const weatherToday = useSelector((state) => state.weather.today);

//   useEffect(() => {
//     if (location) {
//       console.log("Fetching weather data for", location);  // Log the location
//       dispatch(fetchWeatherToday(location));
//     } else {
//       console.error("Invalid location:", location);  // Log if location is invalid
//     }
//   }, [dispatch, location]);
//   return (
//     <div className="weather-today">
//       {weatherToday ? (
//         <div>
//           <h1>{weatherToday.name}</h1>
//           <h2>{Math.round(weatherToday.main.temp)}°</h2>
//           <p>{weatherToday.weather[0].description}</p>
//           <FontAwesomeIcon icon={faCloudSun} /> 
//           <p>
//             <FontAwesomeIcon icon={faWind} /> Wind: {weatherToday.wind.speed} mph
//           </p>
//           <p>
//             <FontAwesomeIcon icon={faTint} /> Humidity: {weatherToday.main.humidity}%
//           </p>
//         </div>
//       ) : (
//         <p>Loading...</p>
//       )}
//     </div>
//   );
// };

// export default WeatherToday;
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudSun, faWind, faTint } from '@fortawesome/free-solid-svg-icons';
import './WeatherToday.css';

const WeatherToday = ({ weatherData,isMobile }) => {
  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric'
  });
  return (
    <div className="weather-today" style={{
      width: isMobile ? '90%' : '300px', // Adjust width based on mobile view
      margin: isMobile ? '10px auto' : '20px auto', // Center it with different margin
    }}>
      {weatherData ? (
        <div>
         <h1>{weatherData.name}</h1>
         <h3>{currentDate}</h3> {/* Displaying the current date */}
          <h2>{Math.round(weatherData.main.temp)}°C</h2>
          <p>{weatherData.weather[0].description}</p>
          <FontAwesomeIcon icon={faCloudSun} />
          <p>
            <FontAwesomeIcon icon={faWind} /> Wind: {weatherData.wind.speed} mph
          </p>
          <p>
            <FontAwesomeIcon icon={faTint} /> Humidity: {weatherData.main.humidity}%
          </p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default WeatherToday;
