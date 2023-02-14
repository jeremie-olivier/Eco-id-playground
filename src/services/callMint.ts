import { ethers } from "ethers";
import EcoID from "../abi/EcoID.json";


export default  async function callMint(context:  any, event: any) {

    console.log("in mint",event);
    
    let signer = event.signer
    let attestation = context.attestation
    if (!signer) return;
    const nftContract = new ethers.Contract("0x6FEC2db7DD68adbb28bF17F4e9Dd0c566Ec75b49", EcoID.abi, signer);
    let att = attestation.message


    const mintTx = await nftContract.mintNFT(att.recipient, att.claim, { gasLimit: 200_000 });

    // return  registerTx.wait();
    const mintReceipt = await mintTx.wait();
    console.log("mintReceipt", mintReceipt)

    if (!mintReceipt.status) {
    throw new Error(mintTx);
    }
}
