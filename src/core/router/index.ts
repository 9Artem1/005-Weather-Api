import { createBrowserRouter } from "react-router-dom";
import { WeatherAppHome } from "../../pages/Home";
import { Navbar } from "../../components/simple/Navbar";
import { FavoritesAppHome } from "../../pages/Favorites";
import { ForecastAppHome } from "../../pages/Forecast";


export const router = createBrowserRouter([
    { 
      Component: Navbar,
      children: [ 
      {
        path: '/',
        Component: WeatherAppHome
      },
      {
        path: 'WeatherFavorites',
        Component: FavoritesAppHome
      },
      {
        path: 'forecast/:city',
        Component: ForecastAppHome,
        
      }
    ]
    }
  ]);
  