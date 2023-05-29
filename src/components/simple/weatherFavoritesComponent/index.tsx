import { FC } from 'react';
import { Button, Card, Container, Grid, Typography, styled } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../../../core/store';
import { removeFavorite } from '../../../core/types/favoritesSlice';

const WeatherCard = styled(Card)(({
  marginTop: '2em',
  height: '20em',
  width: '80%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '1em',
  textAlign: 'center',
  justifyContent: 'space-between',
  gap: '5px',
  '@media (max-width: 768px)': {
      width: '88%',
    }
}));

interface WeatherFavoritesComponentProps {
}

export const WeatherFavoritesComponent: FC<WeatherFavoritesComponentProps> = ({ }) => {
  const favoriteCities = useSelector((state: RootState) => state.favorites.favoriteCities);
  const dispatch = useAppDispatch();
  
  const handleRemoveFromFavorites = (cityId: string) => {
    dispatch(removeFavorite(cityId));
  };

  return (
    <Container sx={{ flexGrow: 6, pt: 2, pb: 2, display: 'flex', flexWrap: 'wrap' }}>

        {favoriteCities.map((city) => (
          <Grid key={city.id} item xs={12} sm={6} md={4}>
            <WeatherCard>
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
            </WeatherCard>
          </Grid>
        ))}

    </Container>
  );
};