import React, { useEffect } from 'react';
import { useFormik } from "formik";
import { api, sellerapi } from '../axios';
import * as Yup from "yup";
import { useNavigate } from 'react-router';
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from 'react-redux';
import { createUser } from '../Slices/user.slice';


const SellerSignUp = () => {
  
  const {userData} = useSelector(states => states.User)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const goToLogin = () =>{
    navigate("/")
  }
 
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirm_password: ""
    },
    validationSchema: Yup.object({
      name: Yup.string().trim().min(2).required("Name is required"),
      email: Yup.string().trim().email("Invalid email").required("Email is required"),
      password: Yup.string().trim().min(6, "Password must be at least 6 characters").required("Password is required"),
      confirm_password: Yup.string().trim()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Confirm password is required")
    }),
    onSubmit: async (values) => {
      try {
        const {data} = await sellerapi.post("/seller/signup", values);
        console.log(data);
        
        dispatch(createUser(data)) ;

        toast.success("Seller Created Successfully");
        goToLogin();
      } catch (err) {
        toast.error(err.response?.data?.message || "Signup failed. Please try again.");
      }
    }
  });


useEffect (()=>{
  console.log("UserData:", userData);
  if (userData && userData.email) {
    console.log(userData.email);
  }
}, [userData]);


  return (
    <div className="d-flex justify-content-center align-items-center vh-100" style={{ background: '#D8C4B6' }}>
      <div className="d-flex flex-column p-5 border shadow rounded bg-white" style={{ width: '400px' }}>
        <h2 className="text-center mb-4" style={{ color: '#343a40', fontWeight: 'bold' }}>Sign up</h2>
        <form onSubmit={formik.handleSubmit}>
          <input onChange={formik.handleChange}  value={formik.values.name} type="text" placeholder="Name" className={`form-control ${formik.touched.name && formik.errors.name ? 'is-invalid' : ''}`} name='name' />
          {formik.touched.name && formik.errors.name && (
                  <div className="invalid-feedback">{formik.errors.name}</div>
                )}
          <input onChange={formik.handleChange}  value={formik.values.email} type="email" placeholder="Email" className={`form-control ${formik.touched.email && formik.errors.email ? 'is-invalid' : ''}`} name='email' style={{marginTop:"20px"}}/>
          {formik.touched.email && formik.errors.email && (
                  <div className="invalid-feedback">{formik.errors.email}</div>
                )}
          <input onChange={formik.handleChange}  value={formik.values.password} type="password" placeholder="Password" className={`form-control ${formik.touched.password && formik.errors.password ? 'is-invalid' : ''}`} name='password' style={{marginTop:"20px"}}/>
          {formik.touched.password && formik.errors.password && (
                  <div className="invalid-feedback">{formik.errors.password}</div>
                )}
          <input onChange={formik.handleChange}  value={formik.values.confirm_password} type="password" placeholder="Confirm Password" className={`form-control ${formik.touched.confirm_password && formik.errors.confirm_password ? 'is-invalid' : ''}`} name='confirm_password' style={{marginTop:"20px"}}/>
          {formik.touched.confirm_password && formik.errors.confirm_password && (
                  <div className="invalid-feedback">{formik.errors.confirm_password}</div>
                )}
          <button type='submit' className="btn btn-primary w-100 mb-3 mt-3" style={{ fontSize: '16px', fontWeight: 'bold' }}>Register</button>
        </form>
        <p className="mt-3 text-center" style={{ color: '#6c757d' }}>
          Already have an account?{' '}
          <a href="/hero" onClick={(e) => { e.preventDefault(); goToLogin(); }} className="text-decoration-none text-primary">Sign in</a>
        </p>
      </div>
    </div>
  );
}

export default SellerSignUp;
