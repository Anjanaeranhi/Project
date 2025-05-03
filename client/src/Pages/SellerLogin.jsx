import React, { useEffect } from 'react';
import { useFormik } from "formik";
import { sellerapi } from '../axios';
import * as Yup from "yup";
import { useNavigate } from 'react-router';
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from 'react-redux';
import { createUser } from '../Slices/user.slice';
import { setSeller } from '../Slices/seller.slice';

const SellerLogin = () => {

 

  const { userData } = useSelector(states => states.User);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const goToSignUp = () => {
    navigate("/sellersignup"); 
  };
  const goToSeller = () =>{navigate("/sellerdashboard")}
//   useEffect(() => {
//     if (localStorage.getItem('sellerData') || userData) {
//       goToSeller();
//     }
//   }, [userData]);

  const formik = useFormik({
    initialValues: {
    
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
    
      email: Yup.string().email("Invalid email").required("Email is required"),
      password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
    }),
    onSubmit: async (values) => {
      try {
        console.log(values);
        const { data } = await sellerapi.post("/seller/login", values);
        // console.log(data.user._id);
        // console.log("daataaa",data.token);
        
        localStorage.setItem("sellerToken", data.token);
        console.log("Hello");
        
        localStorage.setItem("sellerid", data.user._id);
        localStorage.setItem("name", data?.user?.name);
        
        // console.log("UserID>>>>", sa);
        
        dispatch(createUser(data));
        dispatch(setSeller(data.user));
        // localStorage.setItem("sellerData", JSON.stringify(data.user));

        toast.success(data?.message);
        goToSeller();
      } catch (err) {
        toast.error(err.response?.data?.message || "Signup failed. Please try again.");
      }
    }
  });

  useEffect(() => {
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
          {/* <input 
            onChange={formik.handleChange} 
            value={formik.values.name} 
            type="text" 
            placeholder="Name" 
            className="form-control mb-3" 
            name="name" 
          />
          {formik.touched.name && formik.errors.name && <div style={{ color: 'red' }}>{formik.errors.name}</div>} */}
          
          <input 
            onChange={formik.handleChange} 
            value={formik.values.email} 
            type="email" 
            placeholder="Email" 
            className="form-control mb-3" 
            name="email" 
          />
          {formik.touched.email && formik.errors.email && <div style={{ color: 'red' }}>{formik.errors.email}</div>}

          <input 
            onChange={formik.handleChange} 
            value={formik.values.password} 
            type="password" 
            placeholder="Password" 
            className="form-control mb-3" 
            name="password" 
          />
          {formik.touched.password && formik.errors.password && <div style={{ color: 'red' }}>{formik.errors.password}</div>}

          <button type="submit" className="btn btn-primary w-100 mb-3 mt-3" style={{ fontSize: '16px', fontWeight: 'bold' }}>
            Login
          </button>
        </form>
        <p className="mt-3 text-center" style={{ color: '#6c757d' }}>
          Don't have an account?{' '}
          <a href="/hero" onClick={(e) => { e.preventDefault(); goToSignUp();}} className="text-decoration-none text-primary">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default SellerLogin;
