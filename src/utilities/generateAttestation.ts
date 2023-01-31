
import { FetchSignerResult } from "@wagmi/core";
import { ethers, Signer, TypedDataDomain, TypedDataField } from "ethers";
import {FormData} from "../types/types"

export default function generateAttestation(context: any,event: any ){

    let signer = context.signer
    let form: FormData = event.form

    let attestation = buildAttestation(event.form,signer)

    context.attestation = attestation
    context.form = form

}

function buildAttestation(form: FormData, signer: FetchSignerResult<ethers.Signer>){

    let attestation = {
      types: {
          Register: [
              {
                  name: "claim",
                  type: "string"
              },
              {
                  name: "feeAmount",
                  type: "uint256"
              },
              {
                  name: "revocable",
                  type: "bool"
              },
              {
                  name: "recipient",
                  type: "address"
              },
              {
                  name: "verifier",
                  type: "address"
              },
              {
                  name: "deadline",
                  type: "uint256"
              },
              {
                  name: "nonce",
                  type: "uint256"
              }
          ]
      },
      domain: {
          name: "Eco ID",
          version: "1",
          chainId: 5,
          verifyingContract: "0x5bc2Fa9426e882710d055C1A60F8cc93A31Edc58"
      },
      message: {
          claim: form.claim,
          recipient: form.receiverAddress,
          verifier: "0xBcF96b9bbBe9b5A385A611bFf48BAf0cccf4C0Ab",
          deadline: new Date(form.deadline).getTime() / 1000,
          nonce: 0,
          feeAmount: 0,
          revocable: false
      },
      primaryType: "Register",
  }
  return attestation
  }
  
  