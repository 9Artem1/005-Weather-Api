

import { Container, Grid } from '@mui/material';
import { WeatherForecastComponent } from '../../components/simple/WeatherForecast';

export const ForecastAppHome = () => {





    return (<>
        <Container>
            <Grid container spacing={1} sx={{display: 'flex', }}>
                    <WeatherForecastComponent match={{
                    params: {
                        city: 'Таганрог'
                    }
                }} />
            </Grid>
        </Container>
    </>
    );
};