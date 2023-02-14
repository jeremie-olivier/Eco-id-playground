// import { GlobalStateContext } from '../../providers/globalState';
// import { useActor } from '@xstate/react';


// import Button from '@mui/material/Button';
// import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';

// function ButtonWalletConnect() {



//   return (
//     <div>
//       {state.matches("idle") ?
//         <Button variant="contained" color='secondary' startIcon={<AccountBalanceWalletIcon />} onClick={() => { send("connect"); send("done") }}>Connect your wallet</Button>
//         : ""}
//       {state.matches("connected") ?
//         <Button variant="contained" color='secondary' startIcon={<AccountBalanceWalletIcon />} onClick={() => { send("disconnect") }}>0x3343342...F5323</Button>
//         : ""}
//     </div>

//   );
// };

// export default ButtonWalletConnect




import { ConnectButton, useConnectModal } from "@rainbow-me/rainbowkit";
import { useAccount, useSigner, } from 'wagmi'

import { GlobalStateContext } from '../../providers/globalState';
import { useActor } from '@xstate/react';
import React, { useContext, useEffect } from 'react';


function ButtonWalletConnect() {

  const globalServices = useContext(GlobalStateContext);
  const [state, send] = useActor(globalServices.stateService);
  const { data: signer } = useSigner();



  const account = useAccount({
    onConnect(connection) {
      setTimeout(() => {   
        console.log( "signer",connection.address)     
        send('connect'); 
      }, 0);

    },
    onDisconnect() {
      setTimeout(() => {
        send("disconnect");
      }, 0)
    }
  })




  return (
    <ConnectButton />
  )
}

export default ButtonWalletConnect;
