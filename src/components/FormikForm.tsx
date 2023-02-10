import React, { useContext } from "react";
import { Formik } from "formik";
import * as yup from "yup";
// import DatePicker from 'react-datepicker';
import Error from "./Error";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Checkbox from "@mui/material/Checkbox";
import download from "../utilities/download";
import { sendParent } from "xstate/lib/actions";
import { GlobalStateContext } from "../providers/globalState";
import { useActor } from "@xstate/react";
import { FormData } from "../types/types";
import { useSigner } from "wagmi";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Unstable_Grid2";

const ValidationSchema = yup.object().shape({
  receiverAddress: yup
    .string()
    .min(26, "26 characters minimum")
    .max(35, "Limited to 35 characters")
    .required("Must enter a wallet address"),
  deadline: yup.date().required("Enter the deadline"),
  revocable: yup.boolean().oneOf([true]),
  claim: yup
    .string()
    .min(26, "26 characters minimum")
    .max(35, "Limited to 35 characters")
    .required("Claim required"),
});

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function FormikForm() {
  const globalServices = useContext(GlobalStateContext);
  const [state, send] = useActor(globalServices.stateService);
  const { data: signer } = useSigner();

  let form: FormData;

  const getSignature = () => {
    signer && send({ type: "verifier sign", form, signer });
  };

  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <Container sx={{ m: 2, margin:"0 auto", padding: "20px 5px"}}>
        <Card style={{ maxWidth: 450, margin: "0 auto", padding: "20px 5px" }}>
          <CardContent>
              <Button
              size="small"
              color="inherit"
              onClick={() => {
                  send("go to home page");
              }}
              >
              ← Back
              </Button>

              <Typography component="h1" variant="h5">
                  Claim Attestation - Sign
              </Typography>

              <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              Sign attestation with your address. You can then mint an Eco ID ou download the new attestation
              </Typography>
            </CardContent>

        <Formik
          initialValues={{
            receiverAddress: "",
            deadline: "",
            revocable: true,
            claim: "",
          }}
          validationSchema={ValidationSchema}
          validate={(values) => {
            console.log(values);
            form = values;
          }}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            setSubmitting(true);
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2));
              resetForm();
              setSubmitting(false);
            }, 500);
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
          }) => (
            <form onSubmit={handleSubmit}>
              <Typography variant="caption" display="block" gutterBottom>
                {JSON.stringify(values)}
              </Typography>

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
                <Error
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

                <Error touched={touched.deadline} message={errors.deadline} />
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
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.claim}
                  //@ts-ignore
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      color="primary"
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
                      color="primary"
                      variant="contained"
                      sx={{ mt: 3, mb: 2 }}
                      onClick={() => {
                        getSignature();
                      }}
                    >
                      Sign Attestation
                    </Button>
                  </div>
                )}

                {state.matches({
                  connected: {
                    "create attestation": { "form is valid": "form signed" },
                  },
                }) && (
                  <div className="input-row">
                    
                    <Button
                      color="primary"
                      variant="contained"
                      onClick={() => {
                        /* @ts-ignore */
                        download(
                          "attestation" +
                            state.context.attestation.message.recipient,
                          state.context.attestation
                        );
                        send("download");
                      }}
                    >
                      Download Attestation
                    </Button>
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
                    {/* @ts-ignore */}
                    <Button
                      color="primary"
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
