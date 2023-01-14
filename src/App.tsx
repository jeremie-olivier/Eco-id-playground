import React from 'react';
import './App.css';
import { useMachine } from '@xstate/react';
import { Machine } from 'xstate';
import machine from './machine'

import BlockInvitationToConnect from './components/BlockInvitationToConnect';
import NavBar from './components/header/NavBar';
import ButtonCreateAttestation from './components/landingpage/ButtonCreateAttestation';
import ButtonMintAttestation from './components/landingpage/ButtonMintAttestation';
import ButtonDownloadAttestation from './components/ButtonDownloadAttestation';
import ButtonMintEcoID from './components/ButtonMintEcoID';
import FormikForm from './components/FormikForm';
import HomePage from './components/HomePage';
import UserDashboard from './components/UserDashboard';


function App() {
  const [state, send] = useMachine(machine, { devTools: true });

  console.log(state);


  return (
    <div>
      <NavBar></NavBar>
      <FormikForm/>

      {state.matches('Idle') && <BlockInvitationToConnect></BlockInvitationToConnect>}
      {state.matches('connecting') && <p>connecting</p>}
      {state.matches('connected') && <p>connected</p>}

      {state.matches({"connected": "Home Page"}) && <HomePage></HomePage>}

      {state.matches({"connected": {"Create Attestation": "Empty Form"}}) && <p>empty form</p>}
      
      {state.matches({"Claim Eco ID": "submit file"}) && <UserDashboard></UserDashboard>}

      <div>
        <button onClick={() => send('Connect')}>Connect</button>

        {/** You can send events to the running service */}
        <button onClick={() => send('Create')}>Create</button>
        <button onClick={() => send('Claim')}>Claim</button>

        <button onClick={() => send('done')}>Done</button>
        <button onClick={() => send('fail')}>Fail</button>
      </div>
    </div>
  );
};

export default App;
