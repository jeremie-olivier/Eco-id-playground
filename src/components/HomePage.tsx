import React, { useContext } from 'react';
import { GlobalStateContext } from '../providers/globalState';
import { useActor } from '@xstate/react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Unstable_Grid2';
import CreateIcon from '@mui/icons-material/Create';
import ComputerIcon from '@mui/icons-material/Computer';

import { styled } from '@mui/material/styles';
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import HtmlTooltip from './HtmlTooltip';



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

      <Grid container display="flex" justifyContent="center" alignItems="center" flexDirection="column" spacing={2}>
    
        <Grid>
          <HtmlTooltip
            title={
              <React.Fragment>
                <Typography color="inherit">Tooltip with HTML</Typography>
                <em>{"And here's"}</em> <b>{'some'}</b> <u>{'amazing content'}</u>.{' '}
                {"Create a new attestation for yourself and download it"}
              </React.Fragment>
            } placement="right"
          >
            <Button variant="contained" color="success" endIcon={<CreateIcon/>} onClick={() => send('create')}>Create attestation</Button>
          </HtmlTooltip>
        </Grid>

        <Grid>
          <HtmlTooltip
            title={
              <React.Fragment>
                <Typography color="inherit">Tooltip with HTML</Typography>
                <em>{"And here's"}</em> <b>{'some'}</b> <u>{'amazing content'}</u>.{' '}
                {"Upload and sign an already existing one"}
              </React.Fragment>
            }
          >
            <Button variant="contained" color="success" endIcon={<ComputerIcon/>} onClick={() => send('claim')}>Claim attestation</Button>
            </HtmlTooltip>
        </Grid>
        
      </Grid>
    </Box>
  );
}

export default HomePage;