import { Container, Grid } from '@mui/material';
import { WeatherForecastComponent } from '../../components/simple/WeatherForecast';

export const ForecastAppHome = () => {
  return (
        <Container sx={{display: 'flex'}}>
      <Grid container spacing={1} >
    <WeatherForecastComponent city={''}/>
          </Grid>
    </Container>
  );
};