import React, { useEffect } from 'react';
import { useFormik } from "formik";
import { api } from '../axios';
import * as yup from "yup";
import { useNavigate } from 'react-router';
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from 'react-redux';
import { createUser } from '../Slices/user.slice';


const Signup = () => {
  
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
      confirmpassword: ""
    },
    validationSchema: yup.object({
      name: yup.string().min(2).trim().required("name is required"),
      email: yup.string().min(2).trim().email("Must be an email").required("First name is required"),
      password: yup.string().trim().min(6, "Password must be at least 6 characters").required("Password is required"),
      confirmpassword: yup.string().trim()
        .oneOf([yup.ref("password"), null], "Passwords must match")
        .required("Confirm password is required")
    }),
    onSubmit: async (values, {resetForm}) => {
      try {
        console.log(values)
        const { data } = await api.post("/signup", values);
        console.log(data);
        resetForm();
       
        // localStorage.setItem("access_token", data.token);
        dispatch(createUser(data)) ;

        toast.success("User Created Successfully")
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
        <form onSubmit={formik.handleSubmit} noValidate>
          <input onChange={formik.handleChange}  value={formik.values.name} type="text" placeholder="Name" className={`form-control ${formik.touched.name && formik.errors.name ? 'is-invalid' : ''}`} name='name' style={{marginTop:"20px"}} />
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
          <input onChange={formik.handleChange}  value={formik.values.confirmpassword} type="password" placeholder="Confirm Password" className={`form-control ${formik.touched.confirmpassword && formik.errors.confirmpassword ? 'is-invalid' : ''}`} name='confirmpassword' style={{marginTop:"20px"}}/>
          {formik.touched.confirmpassword && formik.errors.confirmpassword && (
                  <div className="invalid-feedback">{formik.errors.confirmpassword}</div>
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

export default Signup;

// import React, { useEffect } from 'react';
// import { useFormik } from "formik";
// import { api } from '../axios';
// import * as yup from "yup";
// import { useNavigate } from 'react-router';
// import { toast } from "react-hot-toast";
// import { useDispatch, useSelector } from 'react-redux';
// import { createUser } from '../Slices/user.slice';

// const Signup = () => {
//   const { userData } = useSelector(states => states.User);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const goToLogin = () => {
//     navigate("/");
//   };

//   const formik = useFormik({
//     initialValues: {
//       name: "",
//       email: "",
//       password: "",
//       confirmpassword: ""
//     },
//     validationSchema: yup.object({
//       name: yup.string().min(2).trim().required("Name is required"),
//       email: yup.string().min(2).trim().email("Must be a valid email").required("Email is required"),
//       password: yup.string().trim().min(6, "Password must be at least 6 characters").required("Password is required"),
//       confirmpassword: yup.string().trim()
//         .oneOf([yup.ref("password"), null], "Passwords must match")
//         .required("Confirm password is required")
//     }),
//     onSubmit: async (values, { resetForm }) => {
//       try {
//         const { data } = await api.post("/signup", values);
//         resetForm();
//         dispatch(createUser(data));
//         toast.success("User Created Successfully");
//         goToLogin();
//       } catch (err) {
//         toast.error(err.response?.data?.message || "Signup failed. Please try again.");
//       }
//     }
//   });

//   useEffect(() => {
//     console.log("UserData:", userData);
//     if (userData && userData.email) {
//       console.log(userData.email);
//     }
//   }, [userData]);

//   return (
//     <div className="d-flex justify-content-center align-items-center vh-100" style={{ background: '#D8C4B6' }}>
//       <div className="d-flex flex-column p-5 border shadow rounded bg-white" style={{ width: '400px' }}>
//         <h2 className="text-center mb-4" style={{ color: '#343a40', fontWeight: 'bold' }}>Sign up</h2>
//         <form onSubmit={formik.handleSubmit} noValidate>
//           {/* Name Field */}
//           <div className="mb-3">
//             <input
//               type="text"
//               name="name"
//               placeholder="Name"
//               className={`form-control ${formik.touched.name && formik.errors.name ? 'is-invalid' : ''}`}
//               value={formik.values.name}
//               onChange={formik.handleChange}
//               onBlur={formik.handleBlur}
//             />
//             {formik.touched.name && formik.errors.name && (
//               <div className="invalid-feedback">{formik.errors.name}</div>
//             )}
//           </div>

//           {/* Email Field */}
//           <div className="mb-3">
//             <input
//               type="email"
//               name="email"
//               placeholder="Email"
//               className={`form-control ${formik.touched.email && formik.errors.email ? 'is-invalid' : ''}`}
//               value={formik.values.email}
//               onChange={formik.handleChange}
//               onBlur={formik.handleBlur}
//             />
//             {formik.touched.email && formik.errors.email && (
//               <div className="invalid-feedback">{formik.errors.email}</div>
//             )}
//           </div>

//           {/* Password Field */}
//           <div className="mb-3">
//             <input
//               type="password"
//               name="password"
//               placeholder="Password"
//               className={`form-control ${formik.touched.password && formik.errors.password ? 'is-invalid' : ''}`}
//               value={formik.values.password}
//               onChange={formik.handleChange}
//               onBlur={formik.handleBlur}
//             />
//             {formik.touched.password && formik.errors.password && (
//               <div className="invalid-feedback">{formik.errors.password}</div>
//             )}
//           </div>

//           {/* Confirm Password Field */}
//           <div className="mb-3">
//             <input
//               type="password"
//               name="confirmpassword"
//               placeholder="Confirm Password"
//               className={`form-control ${formik.touched.confirmpassword && formik.errors.confirmpassword ? 'is-invalid' : ''}`}
//               value={formik.values.confirmpassword}
//               onChange={formik.handleChange}
//               onBlur={formik.handleBlur}
//             />
//             {formik.touched.confirmpassword && formik.errors.confirmpassword && (
//               <div className="invalid-feedback">{formik.errors.confirmpassword}</div>
//             )}
//           </div>

//           <button type='submit' className="btn btn-primary w-100 mb-3 mt-3" style={{ fontSize: '16px', fontWeight: 'bold' }}>Register</button>
//         </form>
//         <p className="mt-3 text-center" style={{ color: '#6c757d' }}>
//           Already have an account?{' '}
//           <a href="/hero" onClick={(e) => { e.preventDefault(); goToLogin(); }} className="text-decoration-none text-primary">Sign in</a>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Signup;

