import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import {loadStripe} from '@stripe/stripe-js';
import { api } from '../axios';

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Cardholder name is required'),
  number: Yup.string()
    .matches(/^\d{16}$/, 'Card number must be 16 digits')
    .required('Card number is required'),
  expiry: Yup.string()
    .matches(/^(0[1-9]|1[0-2])\/\d{2}$/, 'Expiry must be in MM/YY format')
    .required('Expiry date is required'),
  cvv: Yup.string()
    .matches(/^\d{3,4}$/, 'CVV must be 3 or 4 digits')
    .required('CVV is required'),
});

const handleSubmit = async(values) =>{
    try {
        const stripe = await loadStripe("pk_test_51RK9GzJH2p576Rnquyqt2o7UfUzKn2icAYAAASqN9rHsxgyOdd50LKxei1WIozi7erx7dtjfWpeErLEXn9Mws4qa00zh1zJmyj")
        const body = {
            name: values.name,
            number: values.number,
            expiry: values.expiry,
            cvv: values.cvv
        }

        const response = await api.post("/cardpayment", body);
        window.location.href = response.data.url;
        toast.success(response.data.message);
    } catch (error) {
        console.log(error.message);
        toast.error(error.message);
    }
}

const DebitCard = () => {
  return (
    <div className="container my-5">
      <h3 className="mb-4">Enter Card Details</h3>
      <div className="card p-4 shadow-sm col-md-6 mx-auto">
        <Formik
          initialValues={{ name: '', number: '', expiry: '', cvv: '' }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ touched, errors }) => (
            <Form noValidate>
              <div className="mb-3">
                <label className="form-label">Cardholder Name</label>
                <Field
                  type="text"
                  name="name"
                  className={`form-control ${touched.name && errors.name ? 'is-invalid' : ''}`}
                  placeholder="John Doe"
                />
                <ErrorMessage name="name" component="div" className="invalid-feedback" />
              </div>

              <div className="mb-3">
                <label className="form-label">Card Number</label>
                <Field
                  type="text"
                  name="number"
                  className={`form-control ${touched.number && errors.number ? 'is-invalid' : ''}`}
                  placeholder="1234567812345678"
                  maxLength="16"
                />
                <ErrorMessage name="number" component="div" className="invalid-feedback" />
              </div>

              <div className="mb-3 row">
                <div className="col">
                  <label className="form-label">Expiry Date</label>
                  <Field
                    type="text"
                    name="expiry"
                    className={`form-control ${touched.expiry && errors.expiry ? 'is-invalid' : ''}`}
                    placeholder="MM/YY"
                    maxLength="5"
                  />
                  <ErrorMessage name="expiry" component="div" className="invalid-feedback" />
                </div>
                <div className="col">
                  <label className="form-label">CVV</label>
                  <Field
                    type="password"
                    name="cvv"
                    className={`form-control ${touched.cvv && errors.cvv ? 'is-invalid' : ''}`}
                    placeholder="123"
                    maxLength="4"
                  />
                  <ErrorMessage name="cvv" component="div" className="invalid-feedback" />
                </div>
              </div>

              <button type="submit" className="btn btn-primary w-100 mt-3">
                Pay Now
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default DebitCard;
