import * as React from 'react';
import Button from '@mui/material/Button';
import InputIcon from '@mui/icons-material/Input';
import { useMachine } from '@xstate/react';
import machine from "../machine"

function UserDashboard(){
  const [state, send] = useMachine(machine, { devTools: true });

  return (
    <div>
      <Button variant="contained" color='secondary' endIcon={<InputIcon/>} onClick={() => send('submit file')}>Select attestation</Button>
    </div>
  );
}

export default UserDashboard;