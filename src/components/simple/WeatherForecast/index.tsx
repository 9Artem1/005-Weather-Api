import { FC, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  Card,
  CardContent,
  CircularProgress,
  Container,
  Stack,
  Typography,
} from '@mui/material';
import { RootState, useAppDispatch } from '../../../core/store';
import { fetchWeatherForecast } from '../../../core/types/weatherForecastSlice';
import { WeatherForecast } from '../../../core/types/weatherForecastSlice';




interface Props {
  match: {
    params: {
      city: string;
    };
  };
}

export const WeatherForecastComponent: FC<Props> = ({ match }) => {
  const dispatch = useAppDispatch();
  const { forecast, loading, error } = useSelector(
    (state: RootState) => state.forecats,
  );
  const city = match.params.city;

  useEffect(() => {
    dispatch(fetchWeatherForecast(city));
  }, [dispatch, city]);

  return (
    <Container>
      <Stack spacing={2}>
        <Typography variant="h3" textAlign="center">
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
                    {new Date(data.date * 1000).toLocaleDateString('ru-RU', { weekday: 'long' })}
                  </Typography>
                  <Typography variant="body1">
                    <b>Описание:</b> {data.weather}
                  </Typography>
                  <Typography variant="body1">
                    <b>Минимальная температура:</b> {data.minTemp}&deg;C
                  </Typography>
                  <Typography variant="body1">
                    <b>Максимальная температура:</b> {data.maxTemp}&deg;C
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