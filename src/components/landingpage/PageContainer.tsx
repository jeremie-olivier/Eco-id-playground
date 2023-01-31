import React, { useContext } from 'react';
import { GlobalStateContext } from '../../providers/globalState';
import { useActor } from '@xstate/react';
import BlockInvitationToConnect from '../BlockInvitationToConnect';
import HomePage from '../HomePage';
import FormikForm from '../FormikForm';
import ClaimEcoID from '../ClaimEcoID';
import { Container } from '@mui/material';
import Box from '@mui/material/Box';


function PageContainer() {


  const globalServices = useContext(GlobalStateContext);
  const [state, send] = useActor(globalServices.stateService);

  return (

    
    <Container sx={{ m: 2 }}>
      <Box
          sx={{
            marginTop: 8,
            margin: 8,
            display: 'flex',
            p: 2, border: '1px dashed green',           flexDirection: 'column',
            alignItems: 'center',
          }}
        >

      {state.matches('idle') ? <BlockInvitationToConnect></BlockInvitationToConnect> : ""}
      {state.matches({ "connected": "home page" }) ? <HomePage></HomePage> : ""}
      {state.matches({"connected":{"create attestation":"form is valid"}} ) ? <FormikForm></FormikForm> : ""}
      {state.matches({ "connected": "claim eco id" }) ? <ClaimEcoID></ClaimEcoID> : ""}
      </Box>
    </Container>
  );
};

export default PageContainer






