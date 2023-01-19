import React, { useContext } from 'react';
import { GlobalStateContext } from '../providers/globalState';
import { useActor } from '@xstate/react';

import Button from '@mui/material/Button';
import UploadIcon from '@mui/icons-material/Upload';


import {  ethers, TypedDataDomain, TypedDataField } from "ethers";
import EcoID from "../abi/EcoID.json";


import { useSigner } from "wagmi";

type TypeData = {
  domain: TypedDataDomain
  types: Record<string, TypedDataField[]>
  message: AttestationValues
  verifySig : string
  sig : string
}

type AttestationValues = {
  claim: string
  feeAmount: Number
  revocable: boolean
  recipient: string
  verifier: string
  deadline : Number
  nonce: Number
}

function UploadAttestation() {

  const globalServices = useContext(GlobalStateContext);
  const [state, send] = useActor(globalServices.stateService);

  const { data: signer } = useSigner();
  let attestation: TypeData;




  // const { address } = useAccount();


  const readFileOnUpload = (uploadedFile : File) =>{
    const fileReader = new FileReader();
    fileReader.onloadend = ()=>{
      try{
          console.log(fileReader.result);

        if (fileReader.result && typeof fileReader.result == 'string'  ){
          attestation = JSON.parse(fileReader.result);
          register()
        }


      }catch(e){
        console.log("**Not valid JSON file!**",e);
      }
    }
    if( uploadedFile!== undefined)
      fileReader.readAsText(uploadedFile);
}


const register = async ( ) => {
  if ( !signer) return;
  const nftContract = new ethers.Contract("0x6FEC2db7DD68adbb28bF17F4e9Dd0c566Ec75b49", EcoID.abi, signer);
  let att  = attestation.message

  const registerTx = await nftContract.register(att.claim, att.feeAmount, att.revocable, att.recipient, att.verifier, att.deadline, attestation.sig, attestation.verifySig, { gasLimit: 500_000 });

  const registerReceipt = await registerTx.wait();

  console.log("registerReceipt.status",registerReceipt.status)

  if (!registerReceipt.status) {
      throw new Error(registerTx);
  }

}

  return (

    <Button variant="contained" component="label" endIcon={<UploadIcon />}> 
      Upload File
    <input
      type="file"
      hidden
      //@ts-ignore
      onChange={(e)=> readFileOnUpload(e.target.files[0])}
    />
    </Button>
  );
};

export default UploadAttestation

