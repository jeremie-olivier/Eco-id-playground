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
                        <Grid container display="flex" justifyContent="center" alignItems="center" flexDirection="column" >
                            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                The attestation now contains both a Verifier and your signature. Its now ready to be registered on the Ethereum blockchain
                            </Typography>
                            <br /><br />
                            <Grid display="flex" flexDirection="column">
                                <Button variant="contained" color="secondary" onClick={() => {
                                    send("download");
                                    //@ts-ignore   
                                    download("attestation-" + state.context.attestation.message.recipient, state.context.attestation)
                                }}>Download attestation</Button>
                                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                    If you have someone to pay the gas fee for you, you can download the attestation and send it to him
                                </Typography>
                                <br /><br />
                            </Grid>
                            <Grid display="flex" flexDirection="column">
                                <Button variant="contained" color="secondary" onClick={() => send("self mint")}>Mint your Eco ID</Button>
                                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                    Or you can Mint it yourself
                                </Typography>
                            </Grid>


                        </Grid>
                    }

                    {state.matches({ "connected": { "claim eco id": { "attestation is loaded": "attestation ready to be registered" } } }) ?
                        <Grid display="flex" flexDirection="column">
                            <ButtonRegister></ButtonRegister>
                            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                The <b>REGISTER</b> method of the Eco ID smart contract verify the validity of the attestation and store it on-chain
                            </Typography>
                        </Grid>

                        : ""}
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
        </Container >
    );
};

export default ClaimEcoID






