
import {FormData} from "../types/types"

export default  function generateAttestation(context: any,event: any ){

    let signer = event.signer
    let form: FormData = event.form

    // let verifierAddress = await signer.getAddress()
    let verifierAddress = "0xE8EDD6d8dd72b9B390335f838480a7D62cb72BEE"

    
    

    let attestation =  buildAttestation(event.form,verifierAddress)



    context.attestation = attestation
    context.form = form

}

function buildAttestation(form: FormData, verifierAddress: any){

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
          chainId: 5,
          verifyingContract: "0x6FEC2db7DD68adbb28bF17F4e9Dd0c566Ec75b49"
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
  
  