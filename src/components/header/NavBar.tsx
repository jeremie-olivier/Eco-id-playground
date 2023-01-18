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



function NavBar() {
  const globalServices = useContext(GlobalStateContext);
  const [state, send] = useActor(globalServices.stateService);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Button variant="contained" color='secondary' onClick={() => { send("go to home page") }}>Home</Button>

          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Eco ID Dapp
          </Typography>
          <ButtonWalletConnect></ButtonWalletConnect>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default NavBar