import React, { useContext } from 'react';
import { GlobalStateContext } from '../../providers/globalState';
import { useActor } from '@xstate/react';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';


import ButtonWalletConnect from './ButtonWalletConnect';
import { Button } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';





function NavBar() {
  const globalServices = useContext(GlobalStateContext);
  const [state, send] = useActor(globalServices.stateService);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="inherit">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            
          </IconButton>
          <Button color='success' endIcon={<HomeIcon/>} onClick={() => { send("go to home page") }}>Home</Button>

          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Eco ID Dapp
          </Typography>
          
          <Button color='success' onClick={() => { send("go to about page") }}>About</Button>

          <ButtonWalletConnect></ButtonWalletConnect>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default NavBar