import React, { useContext } from 'react';
import { GlobalStateContext } from '../providers/globalState';
import { useActor } from '@xstate/react';

import Grid from '@mui/material/Unstable_Grid2';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import Button from '@mui/material/Button';
import { Container } from '@mui/system';




function HomePage() {
  const globalServices = useContext(GlobalStateContext);
  const [state, send] = useActor(globalServices.stateService);


  return (

    <Container sx={{ m: 2, margin:"0 auto", padding: "20px 5px"}}>
      <Grid container display="flex" justifyContent="center" alignItems="center" flexDirection="column" spacing={2}>

        <Grid>
          
          <Card sx={{ gridColumn: 'span 1', borderRadius: '3' }} onClick={() => send('create')}>
            <CardActionArea >
            <AddCircleOutlineIcon style={{ fontSize: '1rem', padding: '1rem' }} color="secondary"> </AddCircleOutlineIcon>
              <CardContent>
                <Typography  color="secondary" gutterBottom variant="h5" component="div">
                  Create Attestation
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Create a new attestation for yourself and download it
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>

        <Grid>
          <Card sx={{ gridColumn: 'span 1', borderRadius: '3', maxWidth: '400px', color: 'secondary' }} onClick={() => send('claim')}>
            <CardActionArea >
            <DescriptionOutlinedIcon style={{ fontSize: '1rem', padding: '1rem' }} color="secondary"> </DescriptionOutlinedIcon>
              <CardContent>
                <Typography color="secondary" gutterBottom variant="h5" component="div">
                  Claim your attestation
                </Typography>
                <Typography variant="body2" color="text.secondary">
                Upload and sign an existing attestation, mint an Eco ID
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>

      </ Grid>
    </Container>
  );
}

export default HomePage;