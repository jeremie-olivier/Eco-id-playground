import { useContext } from 'react';
import { GlobalStateContext } from '../providers/globalState';
import { useActor } from '@xstate/react';
import CreateAttestation from './CreateAttestation';
import UploadAttestation from '../molecules/UploadAttestation';
import ButtonRegister from '../atoms/ButtonRegister';
import ButtonMintEcoID from '../atoms/ButtonMintEcoID';
import { Button, Grid, Typography } from '@mui/material';
import download from "../utilities/downloadFile";
import { useSigner } from 'wagmi'
import LinearProgress from '@mui/material/LinearProgress';
import { Container } from '@mui/system';
import CardContent from "@mui/material/CardContent";
import Card from "@mui/material/Card";


export default function ClaimAttestation() {

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
                    {state.matches({ "connected": { "claim eco id": { "attestation is loaded": "attestation is valid" } } }) ? <CreateAttestation></CreateAttestation> : ""}
                    {state.matches({ "connected": { "claim eco id": "idle" } }) ?
                        <Grid>
                            <UploadAttestation></UploadAttestation>
                        </Grid>
                        : ""}

                    {state.matches({ "connected": { "claim eco id": { "attestation is loaded": "attestation miss receiver signature" } } }) ?
                        <Grid container display="flex" justifyContent="center" alignItems="center" flexDirection="column">
                            <Button variant="contained" color="secondary" onClick={
                                //@ts-ignore
                                () => send({ type: "sign", signer })
                            }>Sign</Button>
                            <br /><br />
                            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                By signing the attestation you add your signature to the attestation.
                                A wallet signature is like a physical one, if only you have this
                                document no one can proof that you actually signed it.
                            </Typography>
                        </Grid>
                        : ""}


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
                            <br /><br />
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

                    {state.matches({ "connected": { "claim eco id": { "attestation is loaded": "registered" } } }) ?
                        <Grid display="flex" flexDirection="column">
                            <ButtonMintEcoID></ButtonMintEcoID>
                            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                The <b>MINT</b> method create an Eco ID soulbound NFT. That means that you won't be able
                                to transfer this NFT to someone else. It will stay in your wallet forever.
                                This NFT will be composed of the Attestation Data you registered in the previous step
                            </Typography>
                        </Grid>
                        : ""}

                    {state.matches({ "connected": { "claim eco id": { "attestation is loaded": "calling mint" } } }) ?
                        <Grid>
                            <Typography variant="overline" display="block" gutterBottom>
                                Calling Eco ID smart contract : mint method
                            </Typography>
                            <LinearProgress color="secondary" />
                            <Typography variant="caption" display="block" gutterBottom>
                                Please do not close or refresh this page
                            </Typography>
                        </Grid>
                        : ""}

                    {state.matches({ "connected": { "claim eco id": { "attestation is loaded": "nft minted" } } }) ?
                        <Grid>
                            <Typography variant="overline" display="block" gutterBottom>
                                You're Eco ID soulbound NFT is now minted ! 🥳
                            </Typography>

                            <Typography variant="caption" display="block" gutterBottom>
                                You can go to <a target="_blank" rel="noopener noreferrer"
                                    href={process.env.REACT_APP_CHAIN == "goerli" ? "https://testnets.opensea.io/account" : "https://opensea.io/account"} >your OpenSea account</a> to see your Eco ID.
                            </Typography>
                        </Grid>
                        : ""}

                </CardContent>
            </Card>
        </Container >
    );
};








