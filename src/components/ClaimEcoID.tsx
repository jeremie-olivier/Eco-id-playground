import React, { useContext } from 'react';
import { GlobalStateContext } from '../providers/globalState';
import { useActor } from '@xstate/react';
import FormikForm from './FormikForm';
import UploadAttestation from './UploadAttestation';
import ButtonRegister from './ButtonRegister';
import ButtonMintEcoID from './ButtonMintEcoID';
import { Button, Grid } from '@mui/material';
import download from "../utilities/download";


import {  useSigner } from 'wagmi'


function ClaimEcoID() {


    const globalServices = useContext(GlobalStateContext);
    const [state, send] = useActor(globalServices.stateService);
    const { data: signer } = useSigner();


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
            {state.matches({"connected":{"claim eco id":{"attestation is loaded":"attestation miss receiver signature"}}}) ? <Button variant="contained" color="success" onClick={
                //@ts-ignore
                ()=> send({type : "sign", signer})
            }>Sign</Button> : ""}


            {state.matches({"connected":{"claim eco id":{"attestation is loaded":"attestation signed by receiver"}}}) && 
                <Grid container display="flex" justifyContent="center" alignItems="center" flexDirection="column" spacing={5}>
                    <Grid>
                        <Button variant="contained" color="success" onClick={()=> send("self mint")}>Mint your Eco ID</Button> 
                    </Grid>
                    <Grid>
                        <Button variant="contained" color="success" onClick={()=> {
                            send("download");
                            //@ts-ignore   
                            download("attestation-" + state.context.attestation.message.recipient, state.context.attestation)
                            }}>Download</Button>                
                    </Grid>
                </Grid>
            }


            {state.matches({ "connected": { "claim eco id": { "attestation is loaded": "attestation ready to be registered" } } }) ? <ButtonRegister></ButtonRegister> : ""}
            {state.matches({"connected":{"claim eco id":{"attestation is loaded":"registered"}}}) ? <ButtonMintEcoID></ButtonMintEcoID> : ""}


        </div>

    );
};

export default ClaimEcoID






