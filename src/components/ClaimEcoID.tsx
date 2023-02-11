import React, { useContext } from 'react';
import { GlobalStateContext } from '../providers/globalState';
import { useActor } from '@xstate/react';
import FormikForm from './FormikForm';
import UploadAttestation from './UploadAttestation';
import ButtonRegister from './ButtonRegister';
import ButtonMintEcoID from './ButtonMintEcoID';
import { Button, Grid, Typography } from '@mui/material';
import download from "../utilities/download";
import { useSigner } from 'wagmi'
import LinearProgress from '@mui/material/LinearProgress';
import { Container } from '@mui/system';
import CardContent from "@mui/material/CardContent";
import Card from "@mui/material/Card";



function ClaimEcoID() {


    const globalServices = useContext(GlobalStateContext);
    const [state, send] = useActor(globalServices.stateService);
    const { data: signer } = useSigner();


    return (

        <Container sx={{ m: 2, margin: "0 auto", padding: "20px 5px" }}>
            <Card style={{ maxWidth: 450, margin: "0 auto", padding: "20px 5px" }}>
                <CardContent>
                    <Button
                        size="small"
                        color="primary"
                        onClick={() => {
                            send("go to home page");
                        }}
                    >
                        ← Back
                    </Button>
                    <Typography variant="subtitle2" gutterBottom>
                        Receiver
                    </Typography>
                    <Typography color="secondary" component="h1" variant="h5">
                        Claim your Attestation
                    </Typography>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        Upload the attestation already signed by the verifier, add your signature with
                        your wallet address. You can then mint your Eco ID and download the new attestation
                    </Typography>
                </CardContent>

                <CardContent>
                    {state.matches({ "connected": { "claim eco id": { "attestation is loaded": "attestation is valid" } } }) ? <FormikForm></FormikForm> : ""}
                    {state.matches({ "connected": { "claim eco id": "idle" } }) ?
                        <Grid>
                            <UploadAttestation></UploadAttestation>
                        </Grid>
                        : ""}
                    {state.matches({ "connected": { "claim eco id": { "attestation is loaded": "attestation miss receiver signature" } } }) ? <Button variant="contained" color="secondary" onClick={
                        //@ts-ignore
                        () => send({ type: "sign", signer })
                    }>Sign</Button> : ""}

                    {state.matches({ "connected": { "claim eco id": { "attestation is loaded": "signing" } } }) ?
                        <Grid>
                            <Typography variant="overline" display="block" gutterBottom>
                                Waiting for signature
                            </Typography>
                            <LinearProgress color="secondary" />
                            <Typography variant="caption" display="block" gutterBottom>
                                Please do not close or refresh this page
                            </Typography>
                        </Grid>
                        : ""}

                    {state.matches({ "connected": { "claim eco id": { "attestation is loaded": "attestation signed by receiver" } } }) &&
                        <Grid container display="flex" justifyContent="center" alignItems="center" flexDirection="column" spacing={5}>
                            <Grid>
                                <Button variant="contained" color="secondary" onClick={() => send("self mint")}>Mint your Eco ID</Button>
                            </Grid>
                            <Grid>
                                <Button variant="contained" color="secondary" onClick={() => {
                                    send("download");
                                    //@ts-ignore   
                                    download("attestation-" + state.context.attestation.message.recipient, state.context.attestation)
                                }}>Download attestation</Button>
                            </Grid>
                        </Grid>
                    }

                    {state.matches({ "connected": { "claim eco id": { "attestation is loaded": "attestation ready to be registered" } } }) ? <ButtonRegister></ButtonRegister> : ""}
                    {state.matches({ "connected": { "claim eco id": { "attestation is loaded": "calling register" } } }) ?
                        <Grid>
                            <Typography variant="overline" display="block" gutterBottom>
                                Calling smart contract : register method
                            </Typography>
                            <LinearProgress color="secondary" />
                            <Typography variant="caption" display="block" gutterBottom>
                                Please do not close or refresh this page
                            </Typography>
                        </Grid>
                        : ""}

                    {state.matches({ "connected": { "claim eco id": { "attestation is loaded": "registered" } } }) ? <ButtonMintEcoID></ButtonMintEcoID> : ""}
                    {state.matches({ "connected": { "claim eco id": { "attestation is loaded": "calling mint" } } }) ?
                        <Grid>
                            <Typography variant="overline" display="block" gutterBottom>
                                Calling mint : register method
                            </Typography>
                            <LinearProgress color="secondary" />
                            <Typography variant="caption" display="block" gutterBottom>
                                Please do not close or refresh this page
                            </Typography>
                        </Grid>
                        : ""}
                </CardContent>
            </Card>
        </Container>
    );
};

export default ClaimEcoID






