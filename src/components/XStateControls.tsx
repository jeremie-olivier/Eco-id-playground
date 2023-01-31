import React, { useContext } from 'react';
import { GlobalStateContext } from '../providers/globalState';
import { useActor } from '@xstate/react';
import { Container } from '@mui/material';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';


function XStateControls() {

  const globalServices = useContext(GlobalStateContext);
  const [state, send] = useActor(globalServices.stateService);


  return (

    <Container sx={{ p: 1 }} style={{
      backgroundColor: "black",
      color: "white",
      bottom: "0"
    }}>
      <Typography component="h1" variant="h5">
        State machine Controls (to be deleted )
      </Typography>
    
      <Typography component="h2" variant="h5">
        Current state : 
        <span>{JSON.stringify(state.value)}</span>
      </Typography>

      <Box sx={{ '& button': { m: 1 } }}>
        <div>
          <Button variant="outlined" size="small" color="success" onClick={() => send('connect')}>Connect</Button>
          {/** You can send events to the running service */}
          <Button variant="outlined" size="small" color="success" onClick={() => send('create')}>Create</Button>
          <Button variant="outlined" size="small" color="success" onClick={() => send('claim')}>Claim</Button>
          <Button variant="outlined" size="small" color="success" onClick={() => send('done')}>Done</Button>
          <Button variant="outlined" size="small" color="success" onClick={() => send('fail')}>Fail</Button>
        </div>
      </Box>
    </Container>
  )
}

export default XStateControls