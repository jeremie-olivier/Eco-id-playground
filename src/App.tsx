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
import PageContainer from './components/landingpage/PageContainer';

import '@rainbow-me/rainbowkit/styles.css';
import {
  getDefaultWallets,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { Chain, configureChains, createClient, WagmiConfig } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';

import { mainnet, polygon, optimism, arbitrum } from 'wagmi/chains';
import { infuraProvider } from 'wagmi/providers/infura';
import { PanoramaVerticalSelectSharp } from '@mui/icons-material';


const { chains, provider } = configureChains(
  [Chain[process.env.NEXT_PUBLIC_CHAIN]],
  [
      infuraProvider({ apiKey: process.env.NEXT_PUBLIC_INFURA_ID || "9fac2c4055444f7e9aefd509df789922" }),
      alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_ALCHEMY_KEY || "CjccbhvHOgr96gSq9rbmBIxKaqWBhl7A" }),
      publicProvider(),
  ]
);

const { connectors } = getDefaultWallets({
  appName: 'Eco ID Dapp',
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider
})


inspect({
  // options
 //  url: 'https://stately.ai/registry/editor/b36b17c5-4e17-45bc-9d0d-602d33bb01c6?machineId=710f0813-3934-40d6-9c1b-88fa2349d451', // (default)
  iframe: false // sopen in new window
});

function App() {

  const stateService = useInterpret(machine, { devTools: true });

  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
        <GlobalStateContext.Provider value={{stateService}}>
            <NavBar></NavBar>
            <PageContainer></PageContainer>
            
            <XStateControls></XStateControls>
        </GlobalStateContext.Provider>    
      </RainbowKitProvider>
    </WagmiConfig>

  );
};

export default App;
