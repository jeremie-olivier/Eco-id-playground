import React, { useContext } from 'react';
import { GlobalStateContext } from '../providers/globalState';
import { useActor } from '@xstate/react';
import FormikForm from './FormikForm';
import UploadAttestation from './UploadAttestation';
import ButtonRegister from './ButtonRegister';
import ButtonMintEcoID from './ButtonMintEcoID';

function ClaimEcoID() {


    const globalServices = useContext(GlobalStateContext);
    const [state, send] = useActor(globalServices.stateService);

    return (
        <div style={{
            padding: "50px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            width: "100%"
        }}>

            Eco id Claim page

            {state.matches({ "connected": { "claim eco id": { "attestation is loaded": "attestation is valid" } } }) ? <FormikForm></FormikForm> : ""}
            {state.matches({ "connected": { "claim eco id": "idle" } }) ? <UploadAttestation></UploadAttestation> : ""}
            {state.matches({ "connected": { "claim eco id": { "attestation is loaded": "attestation ready to be registered" } } }) ? <ButtonRegister></ButtonRegister> : ""}
            {state.matches({ "connected": { "claim eco id": { "attestation is loaded": "Eco ID ready to be minted" } } }) ? <ButtonMintEcoID></ButtonMintEcoID> : ""}

        </div>

    );
};

export default ClaimEcoID






