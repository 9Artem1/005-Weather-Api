import { FC, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Card, CardContent, CircularProgress, Container, Stack, Typography } from '@mui/material';
import { useAppDispatch } from '../../../core/store';
import { fetchWeatherForecast, selectWeatherForecast, WeatherForecast } from '../../../core/store/weatherForecastSlice';
import { useParams } from "react-router-dom";

interface Props {
  city: string;
}

export const WeatherForecastComponent: FC<Props> = () => {
  const dispatch = useAppDispatch();
  const { city } = useParams<{ city?: string }>() || {};
  const { forecast, loading, error } = useSelector(selectWeatherForecast);

  useEffect(() => {
    if (city) { 
      dispatch(fetchWeatherForecast(city));
    }
  }, [dispatch, city]);
  if (!city) {
    return <p>город не найден</p>; 
  }

  return (
    <Container>
      <Stack spacing={2}>
        <Typography variant="h3" pt={2} textAlign="center" sx={{color: '#6d737d'}}>
          {city}
        </Typography>
        
        {loading && (
          <CircularProgress
            sx={{ margin: '0 auto' }}
            color="secondary"
            size={64}
          />
        )}

        {!loading && error && (
          <Typography variant="h6" color="error" sx={{ textAlign: 'center' }}>
            {error}
          </Typography>
        )}

        {!loading && !error && forecast.length > 0 && (
          <Stack spacing={2}>
            {forecast.map((data: WeatherForecast, index: number) => (
              <Card key={index} variant="outlined">
                <CardContent>
                  <Typography variant="h5" component="h2">
                    {data.dt_txt}
                  </Typography>
                  <Typography variant="body1">
                    <b>Ожидается:</b> {data.weather[0]?.description}
                  </Typography>
                  <Typography variant="body1">
                    <b>Ветер:</b> {data.wind.speed} м/с
                  </Typography>
                  <Typography variant="body1">
                    <b>Температура воздуха:</b> от {data.temp_min}&deg;C до  {data.temp_max}&deg;C
                  </Typography>
                  <Typography variant="body1">
                    <b>Ощущается как:</b> {data.feels_like} &deg;C
                  </Typography>
                  <Typography variant="body1">
                    <b>Относительная влажность:</b> {data.humidity}%
                  </Typography>
                  <Typography variant="body1">
                    <b>Атмосферное давление</b> {(0.750063755419211*data.pressure).toFixed(1)} мм рт. ст.
                  </Typography>
                </CardContent>
              </Card>
            ))}
            
          </Stack>
          
        )}
      </Stack>
    </Container>
  );
};