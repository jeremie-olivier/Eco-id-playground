import { useContext } from 'react';
import { GlobalStateContext } from '../providers/globalState';
import { useActor } from '@xstate/react';
import Grid from '@mui/material/Unstable_Grid2';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import { Container } from '@mui/system';

import { useSigner } from 'wagmi'



function Home() {
  const globalServices = useContext(GlobalStateContext);
  const [state, send] = useActor(globalServices.stateService);

  const { data: signer } = useSigner();
  console.log(
   ' home page signer ', signer
  )
  state.context.signer = signer 

  return (

    <Container sx={{ m: 2, margin: "0 auto", padding: "20px 5px" }}>
      <Grid container display="flex" justifyContent="center" alignItems="center" flexDirection="column" spacing={2}>

        <Grid>

          <Card sx={{ gridColumn: 'span 1', borderRadius: '3', maxWidth: "300px" }} onClick={() => send('create')}>
            <CardActionArea >
              <AddCircleOutlineIcon style={{ fontSize: '2rem', padding: '1rem' }} color="secondary"> </AddCircleOutlineIcon>
              <CardContent>
                <Typography variant="subtitle2" gutterBottom>
                  Verifier
                </Typography>
                <Typography color="secondary" gutterBottom variant="h5" component="div">
                  Create Attestation
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Create a new attestation for the receiver of your choice by adding your signature. You can download the attestation after you signed it.
                </Typography>

              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>

        <Grid>
          <Card sx={{ gridColumn: 'span 1', borderRadius: '3', width: '300px', color: 'secondary' }} onClick={() => send('claim')}>
            <CardActionArea >
              <DescriptionOutlinedIcon style={{ fontSize: '2rem', padding: '1rem' }} color="secondary"> </DescriptionOutlinedIcon>
              <CardContent>
                <Typography variant="subtitle2" gutterBottom>
                  Receiver
                </Typography>
                <Typography color="secondary" gutterBottom variant="h5" component="div">
                  Claim your attestation
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Upload and sign your attestation already verified, register and mint an Eco ID
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>

      </ Grid>
    </Container>
  );
}

export default Home;