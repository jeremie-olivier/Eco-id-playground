import React, { useContext } from "react";
import { Formik } from "formik";
import * as yup from "yup";
// import DatePicker from 'react-datepicker';
import Error from "./Error";
import Box from '@mui/material/Box';

import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';


import Checkbox from '@mui/material/Checkbox';
import download from "../utilities/download";
import { sendParent } from "xstate/lib/actions";
import { GlobalStateContext } from "../providers/globalState";
import { useActor } from '@xstate/react';

import {FormData} from '../types/types';
import { useSigner } from "wagmi";



const ValidationSchema = yup.object().shape({
  receiverAddress: yup.string()
    .min(26, "26 characters minimum")
    .max(35, "Limited to 35 characters")
    .required("Must enter a wallet address"),
  deadline: yup.date()
  .required("Enter the deadline"),
  revocable: yup.boolean().oneOf([true]),
  claim: yup.string()
  .min(26, "26 characters minimum")
  .max(35, "Limited to 35 characters")
  .required("Claim required"),

});


export default function FormikForm() {

  const globalServices = useContext(GlobalStateContext);
  const [state, send] = useActor(globalServices.stateService);
  const { data: signer } = useSigner();


  let form: FormData;


  const getSignature =()=>{
    signer &&
    send({ type : 'verifier sign', form, signer})
  }


  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />

      <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
        <Typography component="h1" variant="h5">
            Verifier Form
        </Typography>
        <Box component="form" noValidate sx={{ mt: 1 }}>

          <Formik
            
            initialValues={{ 
              receiverAddress: "", 
              deadline: "",
              revocable: true,
              claim: ""}}
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
              isSubmitting 
            }) => (
              <form onSubmit={handleSubmit}>

                {JSON.stringify(values)}

                <Typography component="h1" variant="h5">
                  Verifier form
                </Typography>
                
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
                    className={touched.receiverAddress && errors.receiverAddress ? "has-error" : null}
                    autoFocus
                  />
                
                  <Error touched={touched.receiverAddress} message={errors.receiverAddress} />
                
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
                  className={touched.deadline && errors.deadline ? "has-error" : null}
                />

                  <Error touched={touched.deadline} message={errors.deadline} />
                
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
                <Box
                    alignItems="center"
                    display="flex"
                    ml={-1} 
                    >
                    <FormControlLabel 
                      control={<Checkbox 
                      color="success"
                      checked={values.revocable}
                      name="revocable"
                      onChange={handleChange}
                    />} label="Revocable ?" />
                </Box>  


                {state.matches({"connected":{"create attestation":{"form is valid":"form ready to sign"}}} ) &&
                <div className="input-row">
                  {/* @ts-ignore */}
                  <Button color="success" sx={{ mt: 3, mb: 2 }} onClick={()=>{getSignature()}} >
                    Sign Attestation
                    </Button>
                </div>
                }

                {state.matches({"connected":{"create attestation":{"form is valid":"form signed"}}} ) &&
                <div className="input-row">

                  <Button color="success" sx={{ mt: 3, mb: 2 }} onClick={()=>{
                    /* @ts-ignore */
                    download("attestation-" + state.context.attestation.message.recipient, state.context.attestation)
                    send("download")
                    }}>
                    Download Attestation
                    </Button>
                </div>
                }

                {state.matches({"connected":{"create attestation":{"form is valid":"certification downloaded"}}} ) &&
                <div className="input-row">
                  {/* @ts-ignore */}
                  <Button color="success" sx={{ mt: 3, mb: 2 }} onClick={()=>{send("go to home page")}}>
                    Home Page 
                    </Button>
                </div>
                }

              </form>
            )}
          </Formik>
    </Box>
    </Box>
    </Container>
  );
}