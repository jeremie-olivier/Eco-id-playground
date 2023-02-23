
import {FormData} from "../types/types"

export default  function generateAttestation(context: any,event: any ){

    let signer = context.signer
    // let form: FormData = context.form
    let form = FormData
    console.log('context',context)
    console.log('event',event)

    let attestation =  buildAttestation(form)

    context.attestation = attestation

}

function buildAttestation(form: FormData){

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
          name: "EcoID",
          version: "1",
          chainId: process.env.REACT_APP_CHAIN_ID,
          verifyingContract: process.env.REACT_APP_ECO_ID_CONTRACT
      },
      message: {
          claim: form.claim,
          recipient: form.receiverAddress,
          verifier: JSON.parse(localStorage["wagmi.store"]).state.data.account,
          deadline: new Date(form.deadline).getTime() / 1000,
          nonce: 0,
          feeAmount: 0,
          revocable: form.revocable
      },
      primaryType: "Register",
  }
  return attestation
  }
  
  