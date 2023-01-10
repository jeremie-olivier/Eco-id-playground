import React from 'react';
import './App.css';
import { useMachine } from '@xstate/react';
import machine from './machine'

import BlockInvitationToConnect from './components/BlockInvitationToConnect';
import NavBar from './components/header/NavBar';
import ButtonCreateAttestation from './components/landingpage/ButtonCreateAttestation';
import ButtonMintAttestation from './components/landingpage/ButtonMintAttestation';
import ButtonDownloadAttestation from './components/ButtonDownloadAttestation';
import ButtonMintEcoID from './components/ButtonMintEcoID';


function App() {
  const [state, send] = useMachine(machine, { devTools: true });

  return (
    <div>
      <NavBar></NavBar>
      <ButtonCreateAttestation></ButtonCreateAttestation>
      <ButtonMintAttestation></ButtonMintAttestation>
      <ButtonDownloadAttestation></ButtonDownloadAttestation>
      <ButtonMintEcoID></ButtonMintEcoID>
      

      {state.matches('Idle') && <BlockInvitationToConnect></BlockInvitationToConnect>}
      {state.matches('connecting') && <p>connecting</p>}
      {state.matches('connected') && <p>connected</p>}
      {state.matches({"connected": {"Create Attestation": "Empty Form"}}) && <p>empty form</p>}

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
