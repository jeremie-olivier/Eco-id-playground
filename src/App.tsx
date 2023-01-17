import React, { useContext } from 'react';
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

import { GlobalStateContext } from './providers/globalState';
import { useInterpret } from '@xstate/react';
import XStateControls from './components/XStateControls';

import { inspect } from '@xstate/inspect';




inspect({
  // options
 //  url: 'https://stately.ai/registry/editor/b36b17c5-4e17-45bc-9d0d-602d33bb01c6?machineId=710f0813-3934-40d6-9c1b-88fa2349d451', // (default)
  iframe: false // sopen in new window
});



function App() {

  const stateService = useInterpret(machine, { devTools: true });



  return (
    //@ts-ignore
    <GlobalStateContext.Provider value={{stateService}}>
        
        <NavBar></NavBar>
        <FormikForm/>
        <XStateControls></XStateControls>

    </GlobalStateContext.Provider>    


  );
};

export default App;
