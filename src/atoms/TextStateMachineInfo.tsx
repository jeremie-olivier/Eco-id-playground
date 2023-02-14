import { useContext } from 'react';
import { GlobalStateContext } from '../providers/globalState';
import { useActor } from '@xstate/react';
import { Container } from '@mui/material';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../providers/Styles'


function TextStateMachineInfo() {

  const globalServices = useContext(GlobalStateContext);
  const [state] = useActor(globalServices.stateService);

  return (
    <ThemeProvider theme={theme}>

      <Container sx={{ p: 1 }} style={{
        backgroundColor: "secondary",
        color: "primary",
        bottom: 0,
        position: "fixed"
      }}>

        <Typography gutterBottom variant="body2">
          <LightbulbIcon />If you want to better understand the logic behind this Dapp, click pop-up blocked <img src="//lh3.googleusercontent.com/eySL1iWYR66hTR7K0dPzOfUo-a7NXTNg3XbfsMHiCg6B4y6PeYOELaFsDsBrvT4wrA=h36" height="18" alt="Pop-up blocked" data-mime-type="image/png" data-alt-src="//lh3.googleusercontent.com/eySL1iWYR66hTR7K0dPzOfUo-a7NXTNg3XbfsMHiCg6B4y6PeYOELaFsDsBrvT4wrA"></img> in the address bar, to play with the Interactive State Machine
        </Typography>
        <Divider variant="middle" color="primary" />
        <Grid container alignItems="center">
          <Typography color="grey" variant="body2">
            State machine current state : <span>{JSON.stringify(state.value)}</span>
          </Typography>
        </Grid>
      </Container>
    </ThemeProvider>
  )
}

export default TextStateMachineInfo