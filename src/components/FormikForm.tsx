import React from "react";
import { Formik } from "formik";
import * as yup from "yup";
// import DatePicker from 'react-datepicker';
import Error from "./Error";

const ValidationSchema = yup.object().shape({
  receiverAddress: yup.string()
    .min(26, "26 characters minimum")
    .max(35, "Limited to 35 characters")
    .required("Must enter a wallet address"),
  deadline: yup.date()
  .required("Enter the deadline")
});


export default function FormikForm() {

  return (
    <Formik 
      initialValues={{ 
        receiverAddress: "", 
        deadline: ""}}
      validationSchema={ValidationSchema}
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

          {/* {JSON.stringify(values)} */}

          <h2> Verifier form</h2>
          
          <div className="input-row">
            <label>Receiver address</label>
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
            <label htmlFor="deadline"></label>
            <input type="date"
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


            <div className="input-row">
              <button type="submit" disabled={isSubmitting}>
                Submit
                </button>
            </div>
          </div>
        </form>
      )}
    </Formik>
  );
}