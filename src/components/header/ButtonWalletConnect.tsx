import React, { useContext } from 'react';
import { GlobalStateContext } from '../../providers/globalState';
import { useActor } from '@xstate/react';

import Button from '@mui/material/Button';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';

function ButtonWalletConnect() {

  const globalServices = useContext(GlobalStateContext);
  const [state, send] = useActor(globalServices.stateService);


  return (
    <div>
      {state.matches("idle") ?
        <Button variant="contained" color='secondary' startIcon={<AccountBalanceWalletIcon />} onClick={() => { send("connect"); send("done") }}>Connect your wallet</Button>
        : ""}
      {state.matches("connected") ?
        <Button variant="contained" color='secondary' startIcon={<AccountBalanceWalletIcon />} onClick={() => { send("disconnect") }}>0x3343342...F5323</Button>
        : ""}
    </div>

  );
};

export default ButtonWalletConnect