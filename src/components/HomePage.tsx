import React, { useContext } from 'react';
import { GlobalStateContext } from '../providers/globalState';
import { useActor } from '@xstate/react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Unstable_Grid2';
import CreateIcon from '@mui/icons-material/Create';
import ComputerIcon from '@mui/icons-material/Computer';

import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import Tooltip from '@mui/material/Tooltip';


const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function HomePage() {
  const globalServices = useContext(GlobalStateContext);
  const [state, send] = useActor(globalServices.stateService);


  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };



  return (
    <Box
      sx={{
        marginTop: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >

<Stack spacing={2} sx={{ width: '100%' }}>
      <Button variant="outlined" onClick={handleClick}>
        Get Infos to use the dapp
      </Button>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="info" sx={{ width: '100%' }}>
          Start by connecting your wallet. Then you can create a new attestation for yourself and download it or claim an attestation by uploading and signing an already existing one.
        </Alert>
      </Snackbar>
      
    </Stack>

      <Grid container display="flex" justifyContent="center" alignItems="center" flexDirection="column" spacing={2}>
        
        <Grid>
          <Tooltip title="Create a new attestation for yourself and download it" placement="right">
            <Button variant="contained" color="success" endIcon={<CreateIcon/>} onClick={() => send('create')}>Create attestation</Button>
          </Tooltip>
        </Grid>

        <Grid>
          <Tooltip title="Upload and sign an already existing one" placement="right">
            <Button variant="contained" color="success" endIcon={<ComputerIcon/>} onClick={() => send('claim')}>Claim attestation</Button>
          </Tooltip>
        </Grid>

      </Grid>
    </Box>
  );
}

export default HomePage;