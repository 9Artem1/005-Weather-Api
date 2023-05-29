import React from "react";
import GlobalStyles from '@mui/material/GlobalStyles';
import { RouterProvider } from "react-router";
import { router } from "./core/router";
import { IconButton, ThemeProvider, useTheme } from "@mui/material";
import { createTheme } from "@mui/material";
import store from "./core/store";
import { Provider } from 'react-redux';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';


const ColorModeContext = React.createContext({ toggleColorMode: () => {} });

export function DarkModeToogle() {
  const theme = useTheme();
  const colorMode = React.useContext(ColorModeContext);
  return (
<>
{/* {theme.palette.mode} тема */}
      <IconButton sx={{ ml: 1 }} onClick={colorMode.toggleColorMode} color="inherit">
        {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
      </IconButton>
</> 
  );
}

export default function ToggleColorMode() {
  const [mode, setMode] = React.useState<'light' | 'dark'>('light');
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    [],
  );

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          ...(mode === 'light'
            ? {
                // palette values for light mode
                primary: {
                  main: "#7986cb",
                  contrastText: "#eeeeee",
                },
                secondary: {
                  main: "#f50057",
                },
                background: {
                  paper: "#e6ecf0",
                },
                text: {
                  primary: "#52616B",
                  secondary: "#6d737d",
                },
              }
            : {
                // palette values for dark mode
                primary: {
                  main: "#0d4581",
                  contrastText: "#eeeeee",
                },
                secondary: {
                  main: "#0F4C75",
                },
                background: {
                  paper: "#222831",
                  default: "#0E131A",
                },
                text: {
                  primary: "#eeeeee",
                  secondary: "#eeeeee",
                },
              }),
        },
      }),
    [mode],
  );

  return (
    <Provider store={store}>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
        <GlobalStyles styles={{body: {
        backgroundColor: theme.palette?.background?.default,
      }}} />
      <RouterProvider router={router} />
        </ThemeProvider>
      </ColorModeContext.Provider>
    </Provider>
  );


}

