import { useContext } from 'react';
import { GlobalStateContext } from './providers/globalState';
import { useActor } from '@xstate/react';
import BlockInvitationToConnect from './atoms/TextInvitationToConnect';
import Home from './pages/Home';
import CreateAttestation from './pages/CreateAttestation';
import ClaimAttestation from './pages/ClaimAttestation';
import AboutPage from './pages/About';
import { Container } from '@mui/material';
import Box from '@mui/material/Box';
import ErrorToast from './atoms/ToastError';
import SuccessToast from './atoms/ToastSuccess';


function PageContainer() {


  const globalServices = useContext(GlobalStateContext);
  const [state] = useActor(globalServices.stateService);

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


        {state.matches({ "connected": "home page" }) ? <Home></Home> : ""}
        {state.matches("about page") ? <AboutPage></AboutPage> : ""}
        {state.matches({ "connected": "about page" }) ? <AboutPage></AboutPage> : ""}
        {state.matches({ "connected": { "create attestation": "form is valid" } }) ? <CreateAttestation></CreateAttestation> : ""}
        {state.matches({ "connected": "claim eco id" }) ? <ClaimAttestation></ClaimAttestation> : ""}
      </Box>
    </Container>
  );
};

export default PageContainer






