import { Action, createSlice, PayloadAction, ThunkAction } from '@reduxjs/toolkit';
import { RootState, useAppDispatch } from '../store';
import axios from 'axios';



export interface WeatherForecast {
    date: number;
    weather: string;
    minTemp: number;
    maxTemp: number;
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

export const weatherForecastSlice = createSlice({
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

const BASE_URL = 'https://api.openweathermap.org/data/2.5/forecast';
const API_KEY = '9e0511163cdb840b885d6d0ef36c1073';

type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string | null>
>

export const fetchWeatherForecast = (city: string): AppThunk => {
  return async (dispatch) => {
    try {
    const dispatch = useAppDispatch();
      dispatch(setLoading(true));
      const url = `${BASE_URL}?q=${city}&units=metric&appid=${API_KEY}`;
      const{ data } = await axios.get(url);

      const forecast: WeatherForecast[] = data.list.map((item: any) => ({
        date: item.dt,
        weather: item.weather[0].description,
        minTemp: item.main.temp_min,
        maxTemp: item.main.temp_max,
      }));

      dispatch(setForecast(forecast));
    } catch (error) {
        
    //   dispatch(setError(error.message));
    }
  };
};

export const selectWeatherForecast = (state: RootState) => state.forecats;

export default weatherForecastSlice.reducer;