import { Card, styled } from "@mui/material";

export const WeatherCardMain = styled(Card)(({
    marginTop: '2em',
    marginBottom: '2em',
    width: '80%',
    display: 'flex',
    gap: '10px',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '1em',
    textAlign: 'center',
    justifyContent: 'space-between',
    '@media (max-width: 768px)': {
      width: '88%',
    }
  }))