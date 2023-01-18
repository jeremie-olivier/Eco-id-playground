import React, { useContext } from 'react';
import { GlobalStateContext } from '../providers/globalState';
import { useActor } from '@xstate/react';
import { Container } from '@mui/material';


function XStateControls() {

  const globalServices = useContext(GlobalStateContext);
  const [state, send] = useActor(globalServices.stateService);


  return (

    <Container sx={{ p: 2 }} style={{
      backgroundColor: "black",
      color: "white",
      position: "fixed",
      bottom: "0"
    }}>
      <h1>State machine Controls (to be deleted ) </h1>
      <h2>
        Current State :
        <span>{JSON.stringify(state.value)}</span>
      </h2>
      <button onClick={() => send('connect')}>Connect</button>

      {/** You can send events to the running service */}
      <button onClick={() => send('create')}>Create</button>
      <button onClick={() => send('claim')}>Claim</button>

      <button onClick={() => send('done')}>Done</button>
      <button onClick={() => send('fail')}>Fail</button>

    </Container>


  )
}

export default XStateControls