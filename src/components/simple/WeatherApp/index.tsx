
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../../../core/store';
import { Box, Button, Typography } from '@mui/material';
import { NavLink } from "react-router-dom";
import { SearchCityForm } from '../../ordinray/searchCityForm';
import { addFavorite } from '../../../core/store/favoritesSlice';
import { WeatherCardMain } from './styledWeatherCardMain';


const WeatherApp = () => {
  const dispatch = useAppDispatch();
  const { city: weatherCity, coordLat, coordLon, weather, wind, temperature } = useSelector((state: RootState) => state.weather);

  return (
    <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', flexDirection: "column" }}>
      {weatherCity && temperature && (
        <WeatherCardMain>
          <Typography variant="h4" color="#6d737d">{weatherCity}</Typography>
          <Typography variant="body1">
            <b>координаты:</b> <NavLink style={{ textDecoration: 'none', color: "rgb(129 165 225)" }} to={`https://yandex.ru/maps/?ll=${coordLon},${coordLat}&z=12`}>
              {coordLat},{coordLon}
            </NavLink>
          </Typography>
          <Typography variant="body1">
            <b> текущая погода:</b> {weather}
          </Typography>
          <Typography variant="body1">
            <b>скорость ветара:</b> {wind} м/с
          </Typography>
          <Typography variant="body1">
            <b>температура воздуха:</b> {temperature}&deg;C
          </Typography>
          <Button variant="contained" sx={{ width: '17em' }} size="large" component={NavLink} to={`/forecast/${weatherCity}`}>Подробнее</Button>
          <Button variant="contained" sx={{ width: '17em' }} size="large" onClick={() => dispatch(addFavorite({
              city: weatherCity,
              coordLat,
              coordLon,
              weather,
              wind,
              temperature
            }))}>Добавить в избранное</Button>
        </WeatherCardMain>
      )}
      <SearchCityForm />
    </Box>
  );
};

export default WeatherApp;