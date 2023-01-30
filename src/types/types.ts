import { TypedDataDomain, TypedDataField } from "ethers"

 export interface FormData  {
    claim : string
    receiverAddress: string
    deadline: string
    revocable: boolean
}

export interface TypeData {
    domain: TypedDataDomain
    types: Record<string, TypedDataField[]>
    message: AttestationValues
    verifySig: string
    sig: string
}

export interface AttestationValues  {
    claim: string
    feeAmount: Number
    revocable: boolean
    recipient: string
    verifier: string
    deadline: Number
    nonce: Number
}

