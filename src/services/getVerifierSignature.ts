import { ethers } from "ethers";
import EcoID from "../abi/EcoID.json";


export default  async function GetVerifierSignature(context: any, event: any ) {

  console.log("context",context)
  console.log("event",event);
  let signer = event.signer



let attestation = context.attestation
console.log(attestation);

let nonce = await getNounce(signer,attestation.message.claim)
console.log("nonce",nonce)
attestation.message.nonce = nonce 

let types = JSON.parse(JSON.stringify(attestation.types));
types.Register = types.Register.filter( (item: any)=> item.name !== "verifier")

let message = JSON.parse(JSON.stringify(attestation.message));

delete message.verifier;



let promiseRes = await  signer._signTypedData(attestation.domain, types, message)

console.log(promiseRes);


return promiseRes


}

async function  getNounce(signer: any,claim: any){
  console.log("in getNounce");
    
  const nftContract = new ethers.Contract("0x6FEC2db7DD68adbb28bF17F4e9Dd0c566Ec75b49", EcoID.abi, signer);



  const nonce = await nftContract.nonces(claim, { gasLimit: 500_000 });

  console.log("nonce",nonce);
  


  return parseInt(nonce._hex,16)
}

