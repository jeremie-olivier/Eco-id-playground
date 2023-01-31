import { ethers, TypedDataDomain, TypedDataField } from "ethers";
import EcoID from "../abi/EcoID.json";



export default  function callRegister(context:  any, event: any) {
    let signer = context.signer
    let attestation = context.attestation
    if (!signer) return;
    const nftContract = new ethers.Contract("0x6FEC2db7DD68adbb28bF17F4e9Dd0c566Ec75b49", EcoID.abi, signer);
    let att = attestation.message


    return nftContract.register(att.claim, att.feeAmount, att.revocable, att.recipient, att.verifier, att.deadline, attestation.sig, attestation.verifySig, { gasLimit: 500_000 });

    // const registerReceipt = await registerTx.wait();
    // console.log("registerReceipt.status", registerReceipt.status)

    // if (!registerReceipt.status) {
    // throw new Error(registerTx);
}
