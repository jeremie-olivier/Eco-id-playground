import React, { useContext } from 'react';
import { GlobalStateContext } from '../../providers/globalState';
import { useActor } from '@xstate/react';
import BlockInvitationToConnect from '../BlockInvitationToConnect';
import HomePage from '../HomePage';
import FormikForm from '../FormikForm';
import ClaimEcoID from '../ClaimEcoID';
import { Container } from '@mui/material';

function PageContainer() {


  const globalServices = useContext(GlobalStateContext);
  const [state, send] = useActor(globalServices.stateService);

  return (
    <Container sx={{ m: 2 }}>

      {state.matches('idle') ? <BlockInvitationToConnect></BlockInvitationToConnect> : ""}
      {state.matches({ "connected": "home page" }) ? <HomePage></HomePage> : ""}
      {state.matches({ "connected": { "create attestation": "empty form" } }) ? <FormikForm></FormikForm> : ""}
      {state.matches({ "connected": "claim eco id" }) ? <ClaimEcoID></ClaimEcoID> : ""}

    </Container>
  );
};

export default PageContainer






