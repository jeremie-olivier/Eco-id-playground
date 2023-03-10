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



export default  function getReceiverSignature(context: any, event: any ) {

  console.log("context",context)
  console.log("event",event);
  


let attestation = context.attestation
console.log(attestation);


let signer = event.signer
let promise =  signer._signTypedData(attestation.domain, attestation.types, attestation.message)

console.log(promise);


return promise


};

