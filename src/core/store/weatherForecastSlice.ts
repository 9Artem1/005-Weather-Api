import { Action, createSlice, PayloadAction, ThunkAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import axios from 'axios';

export interface WeatherForecast {
  dt: number;
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
  clouds: {
    all: number;
  };
  wind: {
    speed: number;
    deg: number;
    gust?: number;
  };
  visibility: number;
  pop: number;
  rain?: {
    '3h': number;
  };
  sys: {
    pod: string;
  };
  dt_txt: string;
}

interface WeatherForecastState {
  loading: boolean;
  error: string | null;
  forecast: WeatherForecast[];
}

const initialState: WeatherForecastState = {
  loading: false,
  error: null,
  forecast: [],
};

const weatherForecastSlice = createSlice({
  name: 'weatherForecast',
  initialState,
  reducers: {
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setForecast(state, action: PayloadAction<WeatherForecast[]>) {
      state.forecast = action.payload;
      state.error = null;
      state.loading = false;
    },
    setError(state, action: PayloadAction<string>) {
      state.forecast = [];
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { setLoading, setForecast, setError } = weatherForecastSlice.actions;

// const API_KEY = '9e0511163cdb840b885d6d0ef36c1073';
// const BASE_URL = 'https://api.openweathermap.org/data/2.5/forecast';

type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string | null>
>

export const fetchWeatherForecast = (city: string): AppThunk => async (dispatch) => {
  dispatch(setLoading(true));
  // const { data } = await axios.get(`${BASE_URL}?q=${city}&units=metric&appid=${API_KEY}&cnt=20`);

  const { data } = await axios.get ('https://api.openweathermap.org/data/2.5/forecast', {
    params: {
      q: city, // передаем название города
      appid: '9e0511163cdb840b885d6d0ef36c1073', // ваш API-ключ от провайдера
      lang: 'ru', // язык ответа
      units: 'metric', // единицы измерения
      cnt: '21',
    }
  });


  const forecast: WeatherForecast[] = data.list.map((item: any) => ({
    dt: item.dt,
    temp: item.main.temp,
    feels_like: item.main.feels_like,
    temp_min: item.main.temp_min,
    temp_max: item.main.temp_max,
    pressure: item.main.pressure,
    humidity: item.main.humidity,
    weather: item.weather,
    clouds: item.clouds,
    wind: item.wind,
    visibility: item.visibility,
    pop: item.pop,
    rain: item.rain,
    sys: item.sys,
    dt_txt: item.dt_txt,
  }));

  dispatch(setForecast(forecast));
};

export const selectWeatherForecast = (state: RootState) => state.forecats;

export default weatherForecastSlice.reducer;