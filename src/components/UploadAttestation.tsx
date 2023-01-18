import React, { useContext } from 'react';
import { GlobalStateContext } from '../providers/globalState';
import { useActor } from '@xstate/react';

import Button from '@mui/material/Button';
import UploadIcon from '@mui/icons-material/Upload';

function UploadAttestation() {

  const globalServices = useContext(GlobalStateContext);
  const [state, send] = useActor(globalServices.stateService);


  return (
    <Button variant="contained" endIcon={<UploadIcon />} onClick={() => { send("submit file") }}>Upload Attestation</Button>
  );
};

export default UploadAttestation

