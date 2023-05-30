import { Card, styled } from "@mui/material";

export const WeatherCardFavorite = styled(Card)(({
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
  