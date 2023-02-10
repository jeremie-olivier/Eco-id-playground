import React, { useContext } from 'react';
import { GlobalStateContext } from '../../providers/globalState';
import { useActor } from '@xstate/react';
import BlockInvitationToConnect from '../BlockInvitationToConnect';
import HomePage from '../HomePage';
import FormikForm from '../FormikForm';
import ClaimEcoID from '../ClaimEcoID';
import AboutPage from '../About';
import { Container } from '@mui/material';
import Box from '@mui/material/Box';


function PageContainer() {


  const globalServices = useContext(GlobalStateContext);
  const [state, send] = useActor(globalServices.stateService);

  return (

    
    <Container sx={{ m: 2, margin:"0 auto", padding: "20px 5px" }}>
      <Box
          sx={{
            backgroundColor: 'primary.light',
            //'&:hover': { backgroundColor: 'primary.main', opacity: [0.9, 0.8, 0.7], }, 
            marginTop: 2,
            margin: 1,
            borderRadius: "15px",
            display: 'flex',
            p: 2,           
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >

        {state.matches('idle') ? <BlockInvitationToConnect></BlockInvitationToConnect> : ""}
        {state.matches({ "connected": "home page" }) ? <HomePage></HomePage> : ""}
        {state.matches( "about page") ? <AboutPage></AboutPage> : ""}
        {state.matches({ "connected": "about page" }) ? <AboutPage></AboutPage> : ""}
        {state.matches({"connected":{"create attestation":"form is valid"}} ) ? <FormikForm></FormikForm> : ""}
        {state.matches({ "connected": "claim eco id" }) ? <ClaimEcoID></ClaimEcoID> : ""}
      </Box>
    </Container>
  );
};

export default PageContainer






