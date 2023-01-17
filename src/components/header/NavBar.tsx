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



 function NavBar() {
  const globalServices = useContext(GlobalStateContext);
  const [state,send] = useActor(globalServices.stateService);

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
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          test
          </Typography>
          <ButtonWalletConnect></ButtonWalletConnect>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default NavBar