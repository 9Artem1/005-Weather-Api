import { Action, ThunkAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import axios from 'axios';
import { WeatherState } from '../types/WeatherState';

// interface WeatherState {
//   loading: boolean;
//   error: string | null;
//   city: string | null;
//   coordLat: string |null;
//   coordLon: string |null;
//   weather: string |null;
//   wind: string |null;
//   temperature: number | null;
// }

const initialState: WeatherState = {
  loading: false,
  error: null,
  city: null,
  coordLat: null,
  coordLon: null,
  weather: null,
  wind: null,
  temperature: null,
}

interface WeatherData {
  name: string;
  main: {
    temp: number;
  };
  coord: {
    lat: string,
    lon: string
  }
  weather: {
    0: {
      description: string;
    }
  };
  wind: {
    speed: string
  }
}

interface WeatherError {
  cod: string;
  message: string;
}

export const getWeatherData = async (city: string) => {
  const API_KEY = '9e0511163cdb840b885d6d0ef36c1073';
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=ru&appid=${API_KEY}&units=metric&cnt=40`;
  const response = await fetch(url);
  if (!response.ok) {
    const { message }: WeatherError = await response.json();
    throw new Error(message);
  }
  const data: WeatherData = await response.json();
  return data;
};


type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string | null>
>

export const fetchWeatherData = (city: string): AppThunk => {
  return async (dispatch) => {
    try {
      dispatch(getWeatherStart());
      const data = await getWeatherData(city);
      const payload = {
        city: data.name,
        coordLat: data.coord.lat,
        coordLon: data.coord.lon,
        weather: data.weather[0].description,
        wind: data.wind.speed,
        temperature: data.main.temp,
      };
      dispatch(getWeatherSuccess(payload));
      const response = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
        params: {
          q: city, // передаем название города
          appid: '9e0511163cdb840b885d6d0ef36c1073', // ваш API-ключ от провайдера
          lang: 'ru', // язык ответа
          units: 'metric', // единицы измерения
          cnt: '40',
        },
      });
      console.log(response.data);
      // dispatch(getWeatherFailure(error.message));
    } catch (error) {
      console.log(error); // выводим ошибку в консоль
    }
  };
};

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    getWeatherStart(state) {
      state.loading = true;
      state.error = null;
    },
    getWeatherSuccess(state, action) {
      state.loading = false;
      state.city = action.payload.city;
      state.coordLat = action.payload.coordLat;
      state.coordLon = action.payload.coordLon;
      state.weather = action.payload.weather;
      state.wind = action.payload.wind;
      state.temperature = action.payload.temperature;
    },
    getWeatherFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { getWeatherStart, getWeatherSuccess, getWeatherFailure } = weatherSlice.actions;

export default weatherSlice.reducer;