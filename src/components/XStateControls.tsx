import React, { useContext } from 'react';
import { GlobalStateContext } from '../providers/globalState';
import { useActor } from '@xstate/react';
import { Container } from '@mui/material';
import Typography from '@mui/material/Typography';


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
      <Typography component="h1" variant="h5">
        State machine current state :
      </Typography>
    
      <Typography component="h2" variant="h5"> 
        <span>{JSON.stringify(state.value)}</span>
      </Typography>
    </Container>
  )
}

export default XStateControls