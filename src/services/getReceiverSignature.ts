import { FetchSignerResult } from "@wagmi/core";
import { ethers, Signer, TypedDataDomain, TypedDataField } from "ethers";
import {FormData} from "../types/types"



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
  deadline: Number
  nonce: Number
}



export default async function  getReceiverSignature(context: any, event: any ) {

  console.log("context",context)
  console.log("event",event);
  


let attestation = context.attestation
console.log(attestation);

console.log('get receiver signature rejected');



let signer = event.signer

try{
  let sig =  await signer._signTypedData(attestation.domain, attestation.types, attestation.message)
  context.toast.success.push('Your signature is : ' +  sig)
}
catch(error){
  // @ts-ignore
  let err = error.reason;

  context.toast.error.push('Receiver signature failed : ' + err)
  throw new Error(err);
}



};

