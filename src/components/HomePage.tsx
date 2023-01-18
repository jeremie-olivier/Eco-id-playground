import React, { useContext } from 'react';
import { GlobalStateContext } from '../providers/globalState';
import { useActor } from '@xstate/react';

import Button from '@mui/material/Button';
import Grid from '@mui/material/Unstable_Grid2';


function HomePage() {
  const globalServices = useContext(GlobalStateContext);
  const [state, send] = useActor(globalServices.stateService);

  return (
    <Grid container display="flex" justifyContent="center" alignItems="center" flexDirection="column" spacing={2}>
      <Grid>
        <Button variant="contained" onClick={() => send('create')}>Create attestation</Button>
      </Grid>
      <Grid>
        <Button variant="contained" onClick={() => send('claim')}>Claim attestation</Button>
      </Grid>
    </Grid>
  );
}

export default HomePage;