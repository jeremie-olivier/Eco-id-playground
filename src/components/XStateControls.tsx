import React, { useContext } from 'react';
import { GlobalStateContext } from '../providers/globalState';
import { useActor } from '@xstate/react';
import { Container } from '@mui/material';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import LightbulbIcon from '@mui/icons-material/Lightbulb';



function XStateControls() {

  const globalServices = useContext(GlobalStateContext);
  const [state, send] = useActor(globalServices.stateService);


  return (

    <Container sx={{ p: 1 }} style={{
      backgroundColor: "black",
      color: "white",
      bottom: 0,
      position: "fixed"
    }}>
          
      <Typography gutterBottom variant="body2">
        <LightbulbIcon/>How to use the app : Start by connecting your wallet. Then follow the tips !
      </Typography>
      <Divider variant="middle" color="green" />
        <Grid container alignItems="center">
          <Typography color="grey" variant="body2"> 
          State machine current state : <span>{JSON.stringify(state.value)}</span>
          </Typography>
        </Grid>
    </Container>
  )
}

export default XStateControls