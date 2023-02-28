import { ethers } from "ethers";
import EcoID from "../abi/EcoID.json";

export default  async function callIsClaimRegistered(context:  any, event: any) {

  console.log("callIsClaimRegistered",event);
  
  let signer = context.signer

  let attestation = context.attestation
  if (!signer) {
    throw new Error('no signers detected');
  }

   // @ts-ignore
  const nftContract = new ethers.Contract(process.env.REACT_APP_ECO_ID_CONTRACT, EcoID.abi, signer);
  let att = attestation.message


  const isClaimVerified= await nftContract.isClaimVerified( att.recipient, att.claim, att.verifier, { gasLimit: 500_000 });
 
  console.log("callIsClaimRegistered receipt", isClaimVerified)

  if (!isClaimVerified) {
    let error = "Eco ID not registered yet"
    context.toast.error.push(error)
    throw new Error(error);
    }

    let success = "Eco ID is already registered"
    context.toast.success.push(success)

}
