import React, { useContext } from 'react';
import { GlobalStateContext } from '../../providers/globalState';
import { useActor } from '@xstate/react';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import AdbIcon from '@mui/icons-material/Adb';


import ButtonWalletConnect from './ButtonWalletConnect';
import { Button } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';





function NavBar() {
  const globalServices = useContext(GlobalStateContext);
  const [state, send] = useActor(globalServices.stateService);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="secondary">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <IconButton
            size="large"
            edge="start"
            color="primary"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            
          </IconButton>
          <Button color='primary' endIcon={<HomeIcon/>} onClick={() => { send("go to home page") }}></Button>
        
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/home"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'inherit',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
              flexGrow: 1
            }}
          >
            Eco ID Dapp
          </Typography>

          

          
          
          <Button sx={{fontFamily: 'inherit'}} color='primary' onClick={() => { send("go to about page") }}>About</Button>

          <ButtonWalletConnect></ButtonWalletConnect>
        </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
}

export default NavBar