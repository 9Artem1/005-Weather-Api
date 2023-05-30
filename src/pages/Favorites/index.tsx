

import { Container, Grid } from '@mui/material';
import { WeatherFavoritesComponent } from '../../components/simple/WeatherFavoritesComponent';

export const FavoritesAppHome = () => {





    return (<>
        <Container>
            <Grid container spacing={1} sx={{display: 'flex', }}>
                    <WeatherFavoritesComponent />
            </Grid>
        </Container>
    </>
    );
};