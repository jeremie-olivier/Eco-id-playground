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



function HomePage() {
  const globalServices = useContext(GlobalStateContext);
  const [state, send] = useActor(globalServices.stateService);


  return (

    <Grid container display="flex" justifyContent="center" alignItems="center" flexDirection="column" spacing={2}>

      <Grid>
        
        <Card sx={{ gridColumn: 'span 1', borderRadius: '3' }} onClick={() => send('create')}>
          <CardActionArea >
          <AddCircleOutlineIcon style={{ fontSize: '1rem', padding: '1rem' }} color="success"> </AddCircleOutlineIcon>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Create Attestation
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Click here to create your attestation
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>

      <Grid>
        <Card sx={{ gridColumn: 'span 1', borderRadius: '3' }} onClick={() => send('claim')}>
        
          <CardActionArea >
          <DescriptionOutlinedIcon style={{ fontSize: '1rem', padding: '1rem' }} color="success"> </DescriptionOutlinedIcon>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Claim your attestation
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Click here to mint
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>

    </Grid>
  );
}

export default HomePage;