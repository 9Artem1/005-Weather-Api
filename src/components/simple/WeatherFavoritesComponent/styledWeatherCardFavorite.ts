import { Card, styled } from "@mui/material";

export const WeatherCardFavorite = styled(Card)(({
    marginTop: '2em',
    height: '24em',
    width: '82%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '1em',
    textAlign: 'center',
    justifyContent: 'space-between',

    '@media (max-width: 768px)': {
        width: '88%',
      }
  }));
  


  