import React, { useContext } from 'react';
import { GlobalStateContext } from '../providers/globalState';
import { useActor } from '@xstate/react';

import Button from '@mui/material/Button';
import Grid from '@mui/material/Unstable_Grid2';
import CreateIcon from '@mui/icons-material/Create';
import ComputerIcon from '@mui/icons-material/Computer';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';


const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

function HomePage() {
  const globalServices = useContext(GlobalStateContext);
  const [state, send] = useActor(globalServices.stateService);

  return (
    <Grid container display="flex" justifyContent="center" alignItems="center" flexDirection="column" spacing={2}>

      <Card sx={{ minWidth: 375 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Here you can create an attestation or claim one 
        </Typography>
        
      </CardContent>

    </Card>

      <Grid>
        <Button variant="contained" color="success" endIcon={<CreateIcon/>} onClick={() => send('create')}>Create attestation</Button>
      </Grid>
      <Grid>
        <Button variant="contained" color="success" endIcon={<ComputerIcon/>} onClick={() => send('claim')}>Claim attestation</Button>
      </Grid>
    </Grid>
  );
}

export default HomePage;