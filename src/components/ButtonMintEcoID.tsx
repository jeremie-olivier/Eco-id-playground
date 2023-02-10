import React, { useContext } from 'react';
import { GlobalStateContext } from '../providers/globalState';
import { useActor } from '@xstate/react';

import {  useSigner } from 'wagmi'

import Button from '@mui/material/Button';

function ButtonMintEcoID(){

  const globalServices = useContext(GlobalStateContext);
  const [state, send] = useActor(globalServices.stateService);

  const { data: signer } = useSigner();

    return (
      //@ts-ignore
      <Button variant="contained" color="primary" onClick={()=>{send({type: "call mint method", signer})}}>Mint Eco ID</Button>
    );
};

export default ButtonMintEcoID