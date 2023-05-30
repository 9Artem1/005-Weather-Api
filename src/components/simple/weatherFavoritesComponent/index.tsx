import { Button, Container, Grid, Typography } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../../../core/store';
import { removeFavorite } from '../../../core/store/favoritesSlice';
import { WeatherCardFavorite } from './styledWeatherCardFavorite';

export const WeatherFavoritesComponent = ({ }) => {
  const favoriteCities = useSelector((state: RootState) => state.favorites.favoriteCities);
  const dispatch = useAppDispatch();
  
  const handleRemoveFromFavorites = (cityId: string) => {
    dispatch(removeFavorite(cityId));
  };

  return (
    <Container sx={{ flexGrow: 6, pt: 2, pb: 2, display: 'flex', flexWrap: 'wrap' }}>

        {favoriteCities.map((city) => (
          <Grid key={city.id} item xs={12} sm={6} md={4}>
            <WeatherCardFavorite>
              <Typography variant="h4" color="#6d737d">{city.city}</Typography>
              <Typography variant="body1">
            <b>координаты:</b> <NavLink style={{ textDecoration: 'none', color: "rgb(129 165 225)" }} to={`https://yandex.ru/maps/?ll=${city.coordLon},${city.coordLat}&z=12`}>
              {city.coordLat},{city.coordLon}
            </NavLink>
          </Typography>
              <Typography variant="body1">
                <b>Текущая погода:</b> {city.weather}
              </Typography>
              <Typography variant="body1">
                <b>Скорость ветра:</b> {city.wind} м/с
              </Typography>   
              <Typography variant="body1">
                <b>Температура:</b> {city.temperature}&deg;C
              </Typography>
              <Button
                variant="contained"
                sx={{ width: '17em' }}
                size="large"
                onClick={() => handleRemoveFromFavorites(city.id)}
              >
                Удалить из избранного
              </Button>
              <Button variant="contained" sx={{ width: '17em' }} size="large" component={NavLink} to={`/forecast/${city.city}`}>Подробнее</Button>
            </WeatherCardFavorite>
          </Grid>
        ))}

    </Container>
  );
};