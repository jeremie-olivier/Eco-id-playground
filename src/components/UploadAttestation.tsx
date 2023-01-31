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

function UploadAttestation() {

  const globalServices = useContext(GlobalStateContext);
  const [state, send] = useActor(globalServices.stateService);

  const { data: signer } = useSigner();
  let attestation: TypeData;


  const provider = useProvider()



  const readFileOnUpload = (uploadedFile: File) => {
    const fileReader = new FileReader();
    fileReader.onloadend = async () => {

      let a = await provider.getCode("0x6FEC2db7DD68adbb28bF17F4e9Dd0c566Ec75b49")

      console.log("contract code ", a);


      try {
        console.log(fileReader.result);

        if (fileReader.result && typeof fileReader.result == 'string') {
          attestation = JSON.parse(fileReader.result);
          send({ type : 'submit file', attestation})
          // register()
        }


      } catch (e) {
        console.log("**Not valid JSON file!**", e);
      }
    }
    if (uploadedFile !== undefined)
      fileReader.readAsText(uploadedFile);
  }




  return (

    <Button variant="contained" color="success" component="label" endIcon={<UploadIcon />}>
      Upload File
      <input
        type="file"
        hidden
        //@ts-ignore
        onChange={(e) => readFileOnUpload(e.target.files[0])}
      />
    </Button>
  );
};

export default UploadAttestation

