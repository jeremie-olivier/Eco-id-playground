import * as React from 'react';
import Button from '@mui/material/Button';
import { useMachine } from '@xstate/react';
import machine from "../machine"

function HomePage(){
  const [state, send] = useMachine(machine, { devTools: true });

  return (
    <div>
      
      <Button variant="contained" color='secondary' onClick={() => send('Create')}>Create attestation</Button>
      <Button variant="contained" color='secondary' onClick={() => send('Claim')}>Claim attestation</Button>
    </div>
  );
}

export default HomePage;