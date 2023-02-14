import React, { useContext } from 'react';
import { GlobalStateContext } from './providers/globalState';
import { useActor } from '@xstate/react';
import BlockInvitationToConnect from './atoms/BlockInvitationToConnect';
import HomePage from './pages/Home';
import FormikForm from './pages/CreateAttestation';
import ClaimEcoID from './pages/ClaimAttestation';
import AboutPage from './pages/About';
import { Container } from '@mui/material';
import Box from '@mui/material/Box';
import ErrorToast from './atoms/ErrorToast';
import SuccessToast from './atoms/SuccessToast';


function PageContainer() {


  const globalServices = useContext(GlobalStateContext);
  const [state, send] = useActor(globalServices.stateService);

  return (


    <Container sx={{ m: 2, margin: "0 auto", padding: "20px 5px" }}>
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

        {state.event.type.includes("error") ? <ErrorToast></ErrorToast> : ""}
        {state.event.type.includes("done.invoke") ? <SuccessToast></SuccessToast> : ""}


        {state.matches({ "connected": "home page" }) ? <HomePage></HomePage> : ""}
        {state.matches("about page") ? <AboutPage></AboutPage> : ""}
        {state.matches({ "connected": "about page" }) ? <AboutPage></AboutPage> : ""}
        {state.matches({ "connected": { "create attestation": "form is valid" } }) ? <FormikForm></FormikForm> : ""}
        {state.matches({ "connected": "claim eco id" }) ? <ClaimEcoID></ClaimEcoID> : ""}
      </Box>
    </Container>
  );
};

export default PageContainer






