import React, { useContext } from 'react';
import Button from '@mui/material/Button';
import { useMachine } from '@xstate/react';
import machine from "../machine"
import { GlobalStateContext } from '../providers/globalState';

import { useActor } from '@xstate/react';

function HomePage(){
  const globalServices = useContext(GlobalStateContext);
  const [state,send] = useActor(globalServices.stateService);
  
  return (
    <div>
      
      <Button variant="contained" color='secondary' onClick={() => send('Create')}>Create attestation</Button>
      <Button variant="contained" color='secondary' onClick={() => send('Claim')}>Claim attestation</Button>
    </div>
  );
}

export default HomePage;