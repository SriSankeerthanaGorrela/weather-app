// import axios from 'axios';

// export const FETCH_WEATHER_TODAY = 'FETCH_WEATHER_TODAY';
// export const FETCH_WEATHER_WEEKLY = 'FETCH_WEATHER_WEEKLY';

// // Replace with your actual OpenWeatherMap API key
// const API_KEY = 'cbb4cbcd3a35d7abddd827cf13751700'; 
// const BASE_URL = 'https://api.openweathermap.org/data/2.5';

// // Action to fetch today's weather
// export const fetchWeatherToday = (location) => async (dispatch) => {
//   if (!location) {
//     console.error("No location provided for weather data");
//     return;
//   }

//   try {
//     const { data } = await axios.get(`${BASE_URL}/weather`, {
//       params: {
//         q: location,
//         units: 'metric',  // 'metric' for Celsius
//         appid: API_KEY,
//       },
//     });
//     console.log("Weather data:", data); // Log the response
//     dispatch({ type: FETCH_WEATHER_TODAY, payload: data });
//   } catch (error) {
//     console.error("Error fetching today's weather:", error);
//   }
// };

// // Action to fetch weekly forecast
// export const fetchWeatherWeekly = (location) => async (dispatch) => {
//   try {
//     const { data } = await axios.get(`${BASE_URL}/forecast`, {
//       params: {
//         q: location,
//         cnt: 7,  // Getting 7 days forecast
//         units: 'metric',  // 'metric' for Celsius
//         appid: API_KEY,
//       },
//     });
//     dispatch({ type: FETCH_WEATHER_WEEKLY, payload: data });
//   } catch (error) {
//     console.error("Error fetching weekly weather:", error);
//   }
// };

// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';


// export const FETCH_WEATHER_TODAY = 'FETCH_WEATHER_TODAY';
// export const FETCH_WEATHER_WEEKLY = 'FETCH_WEATHER_WEEKLY';

// // Replace with your actual OpenWeatherMap API key
// const API_KEY = 'cbb4cbcd3a35d7abddd827cf13751700'; 
// const BASE_URL = 'https://api.openweathermap.org/data/2.5';

// // Action to fetch today's weather
// export const fetchWeatherToday = (location) => async (dispatch) => {
//   if (!location) {
//     console.error("No location provided for weather data");
//     return;
//   }

//   try {
//     const response = await axios.get(`${BASE_URL}/weather`, {
//       params: {
//         q: location,
//         units: 'metric',  // Use metric for Celsius
//         appid: API_KEY,
//       },
//     });
    
//     const data = response.data;
//     console.log("Today's weather data:", data);

//     // Extract temperature in Celsius from the response
//     const temperatureInCelsius = data.main.temp;
//     console.log("Current temperature (Celsius):", temperatureInCelsius);

//     dispatch({ type: FETCH_WEATHER_TODAY, payload: data });
//   } catch (error) {
//     console.error("Error fetching today's weather:", error);
//   }
// };

// // Action to fetch weekly forecast
// export const fetchWeatherWeekly = (location) => async (dispatch) => {
//   if (!location) {
//     console.error("No location provided for weather data");
//     return;
//   }

//   try {
//     const response = await axios.get(`${BASE_URL}/forecast`, {
//       params: {
//         q: location,
//         cnt: 7,  // Get 7-day forecast
//         units: 'metric',  // Use metric for Celsius
//         appid: API_KEY,
//       },
//     });

//     const data = response.data;
//     const temperatures = data.list.map(forecast => forecast.main.temp); // Extract temperatures in Celsius
//     console.log("Weekly forecast data:", data);

//     // Log temperatures for each day in Celsius
//     temperatures.forEach((temp, index) => {
//       console.log(`Day ${index + 1} temperature (Celsius):`, temp);
//     });

//     dispatch({ type: FETCH_WEATHER_WEEKLY, payload: { ...data, temperatures } });
//   } catch (error) {
//     console.error("Error fetching weekly weather:", error);
//   }
// };
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
export const FETCH_WEATHER_TODAY = 'FETCH_WEATHER_TODAY';
export const FETCH_WEATHER_WEEKLY = 'FETCH_WEATHER_WEEKLY';


const apiKey = 'cbb4cbcd3a35d7abddd827cf13751700';
const baseUrl = 'https://api.openweathermap.org/data/2.5/';

export const fetchWeatherToday = createAsyncThunk(
  'weather/fetchWeatherToday',
  async (city) => {
    const response = await axios.get(
      `${baseUrl}weather?q=${city}&units=metric&appid=${apiKey}`
    );
    return response.data;
  }
);

export const fetchWeatherWeekly = createAsyncThunk(
  'weather/fetchWeeklyWeather',
  async (city) => {
    const response = await axios.get(
      `${baseUrl}forecast?q=${city}&units=metric&appid=${apiKey}`
    );
    return response.data;
  }
);

const weatherActions = createSlice({
  name: 'weather',
  initialState: {
    currentWeather: null,
    weeklyWeather: [],
    status: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeatherToday.fulfilled, (state, action) => {
        state.currentWeather = action.payload;
      })
      .addCase(fetchWeatherWeekly.fulfilled, (state, action) => {
        state.weeklyWeather = action.payload.list;
      });
  },
});

export default weatherActions;