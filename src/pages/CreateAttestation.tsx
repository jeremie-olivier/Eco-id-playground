import { useContext } from "react";
import { Formik } from "formik";
import * as yup from "yup";
import TextFormError from "../atoms/TextFormError";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Checkbox from "@mui/material/Checkbox";
import download from "../utilities/downloadFile";
import { GlobalStateContext } from "../providers/globalState";
import { useActor } from "@xstate/react";
import { FormData } from "../types/types";
import { useSigner } from "wagmi";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Unstable_Grid2";
import LinearProgress from '@mui/material/LinearProgress';


const ValidationSchema = yup.object().shape({
  receiverAddress: yup
    .string()
    .min(42, "Wallet address should be 42 characters long")
    .max(42, "Wallet address should be 42 characters long")
    .required("You must enter a wallet address"),
  deadline: yup.date().required("Enter the deadline"),
  revocable: yup.boolean().oneOf([true]),
  claim: yup
    .string()
    .min(4, "4 characters minimum")
    .max(35, "Limited to 35 characters")
    .required("Claim required"),
});


export default function CreateAttestation() {
  const globalServices = useContext(GlobalStateContext);
  const [state, send] = useActor(globalServices.stateService);
  const { data: signer } = useSigner();

  let form: FormData;

  
  const getSignature = () => {
    state.context.form = form;
    signer && send({ type: "verifier sign", form, signer });
  };

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
            Verifier
            {JSON.stringify(state.context.form)}
          </Typography>

          <Typography component="h1" variant="h5">
            Create Attestation
          </Typography>

          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            You are acting as a Verifier. Fill the form with the Receiver address
            (your friend) and the other infos. Then you can sign the attestation then download it !
          </Typography>
        </CardContent>

        <Formik
          initialValues={{
            receiverAddress: "",
            deadline: "",
            revocable: true,
            claim: "Friend",
          }}
          validationSchema={ValidationSchema}
          validate={(values) => {
            console.log(values);
            form = values;
            state.context.form = values;
          }}
          onSubmit= {() => {
            
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
          }) => (
            <form onSubmit={handleSubmit}>

              <Grid>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="receiver address"
                  label="Receiver address :"
                  name="receiverAddress"
                  placeholder="enter the address here"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.receiverAddress}
                  //@ts-ignore
                  className={
                    touched.receiverAddress && errors.receiverAddress
                      ? "has-error"
                      : null
                  }
                  autoFocus
                />
                <TextFormError
                  touched={touched.receiverAddress}
                  message={errors.receiverAddress}
                />
              </Grid>

              <Grid>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  type="date"
                  id="deadline"
                  label=""
                  name="deadline"
                  placeholder="enter the deadline here"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.deadline}
                  //@ts-ignore
                  className={
                    touched.deadline && errors.deadline ? "has-error" : null
                  }
                />

                <TextFormError touched={touched.deadline} message={errors.deadline} />
              </Grid>

              <Grid>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  type="text"
                  id="claim"
                  label="Claim : "
                  name="claim"
                  placeholder="Claim"
                  disabled
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.claim}
                //@ts-ignore
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      color="secondary"
                      checked={values.revocable}
                      name="revocable"
                      onChange={handleChange}
                    />
                  }
                  label="Revocable ?"
                />
              </Grid>

              <Grid>
                {state.matches({
                  connected: {
                    "create attestation": {
                      "form is valid": "form ready to sign",
                    },
                  },
                }) && (
                    <div className="input-row">
                      {/* @ts-ignore */}

                      <Button
                        color="secondary"
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        onClick={() => {
                          getSignature();
                        }}
                      >
                        Sign Attestation
                      </Button>
                      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        By signing the attestation you add your signature to the attestation.
                        A wallet signature is like a physical one, if only you have this document no one can proof that you actually signed it.
                      </Typography>
                    </div>
                  )}

                {state.matches({
                  connected: {
                    "create attestation": {
                      "form is valid": "Signing",
                    },
                  },
                }) && (
                    <Grid>
                      <Typography variant="overline" display="block" gutterBottom>
                        Waiting for signature
                      </Typography>
                      <LinearProgress color="secondary" />
                      <Typography variant="caption" display="block" gutterBottom>
                        Please do not close or refresh this page
                      </Typography>
                    </Grid>
                  )}

                {state.matches({
                  connected: {
                    "create attestation": { "form is valid": "form signed" },
                  },
                })
                  &&

                  (
                    <div className="input-row">

                      <Button
                        color="secondary"
                        variant="contained"
                        onClick={() => {
                          download(
                            "attestation" +
                            /* @ts-ignore */
                            state.context.attestation.message.recipient, state.context.attestation
                          );
                          send("download");
                        }}
                      >
                        Download Attestation
                      </Button>
                      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        Now that you the attestation contains your signature, you can download it
                      </Typography>
                    </div>
                  )}

                {state.matches({
                  connected: {
                    "create attestation": {
                      "form is valid": "certification downloaded",
                    },
                  },
                }) && (
                    <div className="input-row">
                      <Typography gutterBottom>
                        Send this attestation file to the Receiver, so he can sign it as well
                      </Typography>
                      {/* @ts-ignore */}
                      <Button
                        color="secondary"
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        onClick={() => {
                          send("go to home page");
                        }}
                      >
                        Home Page
                      </Button>
                    </div>
                  )}
              </Grid>
            </form>
          )}
        </Formik>
      </Card>
    </Container>
  );
}
