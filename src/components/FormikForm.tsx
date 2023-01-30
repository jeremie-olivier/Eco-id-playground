import React, { useContext } from "react";
import { Formik } from "formik";
import * as yup from "yup";
// import DatePicker from 'react-datepicker';
import Error from "./Error";
import Box from '@mui/material/Box';
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

          <h2> Verifier form</h2>
          
          <div className="input-row">
            <label>Receiver address : </label>
            <input 
              type="text"
              name="receiverAddress" 
              id="receiver address" 
              placeholder="enter the address here"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.receiverAddress}
              //@ts-ignore
              className={touched.receiverAddress && errors.receiverAddress ? "has-error" : null}
            />
            <Error touched={touched.receiverAddress} message={errors.receiverAddress} />
          </div>

          <div className="input-row">
            <label htmlFor="deadline">Deadline : </label>
            <input 
              type="date"
              name="deadline" 
              id="deadline" 
              placeholder="enter the deadline here"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.deadline}
              //@ts-ignore
              className={touched.deadline && errors.deadline ? "has-error" : null}
            />
            <Error touched={touched.deadline} message={errors.deadline} />
          </div>
            
          <div className="input-row">
            <label htmlFor="claim">Claim : </label>
            <input 
              type="text"
              name="claim" 
              id="claim" 
              placeholder="Claim"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.claim}
              //@ts-ignore
            />
          </div>

          <div className="input-row">
            <label>Revocable ?</label>
            <Box
              alignItems="center"
              display="flex"
              ml={-1} 
              >
              <Checkbox
                checked={values.revocable}
                name="revocable"
                onChange={handleChange}
              />
            </Box>
          </div>   


          {state.matches({"connected":{"create attestation":{"form is valid":"form ready to sign"}}} ) &&
          <div className="input-row">
            {/* @ts-ignore */}
            <button onClick={()=>{getSignature()}}>
              Sign attestation
              </button>
          </div>
          }

          {state.matches({"connected":{"create attestation":{"form is valid":"form signed"}}} ) &&
          <div className="input-row">
            {/* @ts-ignore */}
            <button onClick={()=>{download("attestation-" + state.context.attestation.message.recipient, state.context.attestation)}}>
              Download attestation
              </button>
          </div>
          }

        </form>
      )}
    </Formik>
  );
}