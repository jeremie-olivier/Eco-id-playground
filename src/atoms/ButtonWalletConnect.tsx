import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from 'wagmi'
import { GlobalStateContext } from '../providers/globalState';
import { useActor } from '@xstate/react';
import { useContext } from 'react';


function ButtonWalletConnect() {

  const globalServices = useContext(GlobalStateContext);
  const [state, send] = useActor(globalServices.stateService);


  useAccount({
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
