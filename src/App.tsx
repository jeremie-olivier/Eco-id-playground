import React, { useContext } from 'react';

import './App.css';
import "@rainbow-me/rainbowkit/styles.css";

import { inspect } from '@xstate/inspect';
import machine from './machine'
import { GlobalStateContext } from './providers/globalState';
import { useInterpret } from '@xstate/react';

import XStateControls from './components/XStateControls';

import NavBar from './components/header/NavBar';
import PageContainer from './components/landingpage/PageContainer';

import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import {
  configureChains, createClient, WagmiConfig, goerli
} from "wagmi";

import { infuraProvider } from "wagmi/providers/infura";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";

import { ThemeProvider } from '@mui/material/styles';
import theme from './Styles'


const { chains, provider } = configureChains(
  [goerli
  ],
  [
    infuraProvider({ apiKey: process.env.NEXT_PUBLIC_INFURA_ID || "9fac2c4055444f7e9aefd509df789922" }),
    alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_ALCHEMY_KEY || "CjccbhvHOgr96gSq9rbmBIxKaqWBhl7A" }),
    publicProvider(),
  ]
);

const { connectors } = getDefaultWallets({
  appName: 'Eco ID Playground',
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
    <ThemeProvider theme={theme}>
      <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider chains={chains}>
          <GlobalStateContext.Provider value={{ stateService }}>
            <NavBar></NavBar>
            <PageContainer></PageContainer>
            <XStateControls></XStateControls>
          </GlobalStateContext.Provider>
        </RainbowKitProvider>
      </WagmiConfig>
    </ThemeProvider>
  );
};

export default App;
