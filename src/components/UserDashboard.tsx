import React, { useContext } from 'react';
import { GlobalStateContext } from '../providers/globalState';
import { useActor } from '@xstate/react';

import Button from '@mui/material/Button';
import InputIcon from '@mui/icons-material/Input';
import { useMachine } from '@xstate/react';
import machine from "../machine"

function UserDashboard(){
  const globalServices = useContext(GlobalStateContext);
  const [state,send] = useActor(globalServices.stateService);


  return (
    <div>
      <Button variant="contained" color='primary' endIcon={<InputIcon/>} onClick={() => send('submit file')}>Select attestation</Button>
    </div>
  );
}

export default UserDashboard;