import React, { useContext } from 'react';
import { GlobalStateContext } from '../providers/globalState';
import { useActor } from '@xstate/react';

import Button from '@mui/material/Button';
import UploadIcon from '@mui/icons-material/Upload';


import { ethers, TypedDataDomain, TypedDataField } from "ethers";
import EcoID from "../abi/EcoID.json";


import { useSigner, useProvider } from "wagmi";


type TypeData = {
  domain: TypedDataDomain
  types: Record<string, TypedDataField[]>
  message: AttestationValues
  verifySig: string
  sig: string
}

type AttestationValues = {
  claim: string
  feeAmount: Number
  revocable: boolean
  recipient: string
  verifier: string
  deadline: Number
  nonce: Number
}

function GetVerifierSignature() {

  const globalServices = useContext(GlobalStateContext);
  const [state] = useActor(globalServices.stateService);
  state.context.attestation = "hello";

  const { data: signer } = useSigner();
  let attestation: TypeData;


  const provider = useProvider()


  // const { address } = useAccount();



const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("foo");
  }, 3000);
});


return promise

};



export default GetVerifierSignature

