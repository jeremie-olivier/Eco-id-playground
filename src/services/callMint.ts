import { ethers } from "ethers";
import EcoID from "../abi/EcoID.json";


export default  async function callMint(context:  any, event: any) {

    console.log("in mint",event);
    
    let signer = context.signer
    let attestation = context.attestation
    if (!signer) return;

     // @ts-ignore
    const nftContract = new ethers.Contract(process.env.REACT_APP_ECO_ID_CONTRACT, EcoID.abi, signer);
    let att = attestation.message


    const mintTx = await nftContract.mintNFT(att.recipient, att.claim, { gasLimit: 200_000 });

    // return  registerTx.wait();
    const mintReceipt = await mintTx.wait();
    console.log("mintReceipt", mintReceipt)

    if (!mintReceipt.status) {
    throw new Error(mintTx);
    }
}
