import { ethers } from "ethers";
import EcoID from "../abi/EcoID.json";


export default  async function GetVerifierSignature(context: any, event: any ) {

  console.log("context",context)
  console.log("event",event);
  let signer = context.signer



  let attestation = context.attestation
  console.log(attestation);

  let nonce = await getNounce(signer,attestation.message.claim, context)

  attestation.message.nonce = nonce 

  let types = JSON.parse(JSON.stringify(attestation.types));
  types.Register = types.Register.filter( (item: any)=> item.name !== "verifier")

  let message = JSON.parse(JSON.stringify(attestation.message));

  delete message.verifier;



  try{
    let sig = await  signer._signTypedData(attestation.domain, types, message)
    context.toast.success.push('Your signature is : ' +  sig)
    
    context.verifierSignature = sig
    context.attestation.verifySig = sig
  }
  catch(error){
    // @ts-ignore
    let err = error.reason;
    console.log('eerr',err)

    context.toast.error.push('Verifier signature failed : ' + err)
    throw new Error(err);
  }

}

async function  getNounce(signer: any,claim: any, context : any){
  console.log("in getNounce");
  
  // @ts-ignore
  const nftContract = new ethers.Contract(process.env.REACT_APP_ECO_ID_CONTRACT, EcoID.abi, signer);



  const nounce = await nftContract.nonces(claim, { gasLimit: 500_000 });
  context.toast.success.push("attestation  nounce is :" + nounce)

  console.log("nonce",nounce);
  


  return parseInt(nounce._hex,16)
}

