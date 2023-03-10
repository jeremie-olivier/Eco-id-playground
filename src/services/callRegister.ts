import { ethers, TypedDataDomain, TypedDataField } from "ethers";
import EcoID from "../abi/EcoID.json";



export default  async function callRegister(context:  any, event: any) {

    console.log("in register",event);
    
    let signer = event.signer
    let attestation = context.attestation
    if (!signer) return;

     // @ts-ignore
    const nftContract = new ethers.Contract(process.env.REACT_APP_ECO_ID_CONTRACT, EcoID.abi, signer);
    let att = attestation.message


    const registerTx = await nftContract.register(att.claim, att.feeAmount, att.revocable, att.recipient, att.verifier, att.deadline, attestation.sig, attestation.verifySig, { gasLimit: 500_000 });
    // return  registerTx.wait();
    const registerReceipt = await registerTx.wait();
    console.log("registerReceipt", registerReceipt)

    if (!registerReceipt.status) {
    throw new Error(registerTx);
    }
}
