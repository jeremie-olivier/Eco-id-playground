import { ethers } from "ethers";
import EcoID from "../abi/EcoID.json";


export default  async function callIsMinted(context:  any, event: any) {

    console.log("in mint",event);
    
    let signer = context.signer
    let attestation = context.attestation
    if (!signer) return;

     // @ts-ignore
    const nftContract = new ethers.Contract(process.env.REACT_APP_ECO_ID_CONTRACT, EcoID.abi, signer);
    let att = attestation.message


    const ecoIDid = await nftContract._verifiedClaims(att.recipient, att.claim, { gasLimit: 200_000 });

    console.log("ecoIDid", ecoIDid)

    if (ecoIDid.tokenID._hex === "0x00") {
        let error = "Eco ID not minted yet"
        context.toast.error.push(error)
        throw new Error(error);
    }

    let success = "Eco ID is already minted"
    context.toast.success.push(success)
}
