import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import { Outlet } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { styled } from '@mui/material';
import { DarkModeToogle } from '../../../App';

const StyledLink = styled(NavLink)(({ theme }) => ({
  textDecoration: 'none',
  color: theme.palette.primary.contrastText
}));

export const Navbar = () => {
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const pages = [
    { to: "/", text: "На главную" },
    { to: "WeatherFavorites", text: "Список избранного" },
  ];

  return (
    <>
      <AppBar position="static" >
        <Toolbar disableGutters sx={{ display: 'flex', justifyContent: 'space-around', width: '100%', maxWidth: '100%' }}>
          <IconButton
            edge="end"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2, display: { md: 'none' } }}
            onClick={handleDrawerOpen}
          >
            <MenuIcon />
          </IconButton>
          <Box sx={{ p: 0, m: 0, display: 'flex', justifyContent: 'center' }}>
            <Typography
              variant="h6"
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: 'flex', md: 'flex' },
                fontFamily: 'Inter, system-ui, Avenir, Helvetica, Arial, sans-serif',
                letterSpacing: '.2rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              Прогноз  погоды
            </Typography>
          </Box>

          <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', justifyContent: 'flex-end' }}>
            {pages.map(({ to, text }) => (
              <Button
                href={to}
                key={to}
                sx={{ my: 2, color: 'inherit', display: 'block', marginLeft: '2em', textDecoration: 'none' }}
              >
                {text}
              </Button>
            ))}
            <Box sx={{ height: 1, ml: 3, display: 'flex', justifyContent: 'center' }}>
              <DarkModeToogle />
            </Box>

          </Box>

        </Toolbar>
      </AppBar>
      <Drawer
        variant="temporary"
        open={open}
        onClose={handleDrawerClose}
        ModalProps={{ keepMounted: true }}
      >
        <Box
          sx={{ width: '250px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', p: 2 }}
          role="presentation"
          onClick={handleDrawerClose}
        >
          <DarkModeToogle />
          {pages.map(({ to, text }) => (
            <Button key={to} style={{ margin: '1em 0' }} >
              <StyledLink to={to} sx={{ color: '#00ADB5' }}>{text}</StyledLink>
            </Button>
          ))}
        </Box>
      </Drawer>
      <Outlet />
    </>
  );
};