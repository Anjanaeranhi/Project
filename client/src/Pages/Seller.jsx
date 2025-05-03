import React, { Fragment, useState } from 'react';
import { FaBars } from 'react-icons/fa';
import Offcanvas from 'react-bootstrap/Offcanvas';
import {  sellerapi } from '../axios';
import { useFormik } from 'formik';
import * as Yup from "yup";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from 'react-redux';
import { setSeller } from '../Slices/seller.slice';
import { useNavigate } from 'react-router';


const Seller = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [Image, setImage] = useState('');
    const navigate = useNavigate();
    const goToProfile = () =>{navigate("/sellerprofile")}

    // const reduxSeller = useSelector(state => state.Seller?.sellerData);
    // const localSeller = JSON.parse(localStorage.getItem("sellerData"));
    // const sellerData = reduxSeller || localSeller;
    // console.log(sellerData);
    
    const { userData } = useSelector(states => states.User);
    const dispatch = useDispatch();
    const sellerData = userData?._id || localStorage.getItem('sellerid');

    // const {userData} = useSelector(states => states.User);
    // const fullState = useSelector(state => state);
    // console.log("Full Redux State:", fullState);

    

    // if(!userData){
    //   console.log('No UserData');
    // }
    

    // const sellerId = localStorage.getItem("_id");
    // console.log(sellerId);
    
    

      const formik = useFormik({
        initialValues: {
          name: "",
          catagory: "",
          price: "",
          description: ""
          
        },
        validationSchema: Yup.object({
          name: Yup.string().trim().required("Name is required"),
          catagory: Yup.string().trim().required("catagory is required"),
          price: Yup.number().required("Name is required"),
          description: Yup.string().trim().min(6, "desctription must be at least 6 characters").required("desctription is required"),
          
          
        }),
        onSubmit: async (values, {resetForm}) => {
          console.log(values);
          console.log("sellerDaaaataaa", sellerData);
          
          
          try {
            if(!Image){
              toast.error("Image is needed");
              return;
            }

            if (!sellerData) {
              toast.error("Seller information is missing");
              return;
            }
            const formdata = new FormData();
            formdata.append('name', values.name);
            formdata.append('catagory', values.catagory);
            formdata.append('description', values.description);
            formdata.append('price', values.price);
            formdata.append('image', Image);
            formdata.append('sellerId', sellerData);
            
            
            console.log(formdata);
            // console.log("FormData contents:");
            // for (let pair of formdata.entries()) {
            //   console.log(pair[0] + ":", pair[1]);
            // }
            
            const { data } = await sellerapi.post("/seller/upload", formdata);
            console.log(data);
            dispatch(setSeller(data?.seller))
            
            toast.success(data?.message);
            resetForm();

          } catch (err) {
            toast.error(err.response?.data?.message || "Signup failed. Please try again.");
          }
        }
      });
      const handleFileChange = (e) => {
        setImage(e.target.files[0]); 
    }

    

    return (
        <Fragment>
            <div className=' d-flex'>
                
                {/* <>
                      <FaBars variant="primary" className=' m-4' size={20} onClick={handleShow}/>

                      <Offcanvas show={show} onHide={handleClose}>
                        <Offcanvas.Header closeButton>
                          <Offcanvas.Title style={{textAlign:"center"}}>Seller Controller</Offcanvas.Title>
                        </Offcanvas.Header>
                        <Offcanvas.Body>
                        <div className='mb-2' style={{height:"auto", width:"auto",padding:"20px 30px",textAlign:'start', cursor:'pointer'}} onClick={() =>{handleClose();}} >Dashboard</div>
                        <div className='mb-2' style={{height:"auto", width:"auto",padding:"20px 30px",textAlign:'start', cursor:'pointer'}}  onClick={goToProfile}>Profile</div>
                        <div className='mb-2' style={{height:"auto", width:"auto",padding:"20px 30px",textAlign:'start', cursor:'pointer'}} >Products</div>
                        <div className='mb-2' style={{height:"auto", width:"auto",padding:"20px 30px",textAlign:'start', cursor:'pointer' }} >Sales</div>

                        </Offcanvas.Body>
                      </Offcanvas>
                    </>  */}
                    {/* <div>
                        <h3 className='py-3'>Dashboard</h3>
                    </div>       */}
            </div>

    <div className="d-flex justify-content-center align-items-center vh-100" style={{ background: '#D8C4B6' }}>
      <div className="d-flex flex-column p-5 border shadow rounded bg-white" style={{ width: '400px' }}>
        <h2 className="text-center mb-4" style={{ color: '#343a40', fontWeight: 'bold' }}>Add Product</h2>
        <form onSubmit={formik.handleSubmit} >
          <input onChange={formik.handleChange} className={`form-control ${formik.touched.name && formik.errors.name ? 'is-invalid' : ''}`} value={formik.values.name} type="text" placeholder="Product Name"  name='name' />
          {formik.touched.name && formik.errors.name && (
                  <div className="invalid-feedback">{formik.errors.name}</div>
                )}
          <input onChange={formik.handleChange} className={`form-control ${formik.touched.catagory && formik.errors.catagory ? 'is-invalid' : ''}`} value={formik.values.catagory} type="text" placeholder="catagory"  name='catagory' style={{marginTop:"20px"}}/>
          {formik.touched.catagory && formik.errors.catagory && (
                  <div className="invalid-feedback">{formik.errors.catagory}</div>
                )}
          <input onChange={formik.handleChange} className={`form-control ${formik.touched.price && formik.errors.price ? 'is-invalid' : ''}`} value={formik.values.price} type="number" placeholder="Price"  name='price'style={{marginTop:"20px"}} />
          {formik.touched.price && formik.errors.price && (
                  <div className="invalid-feedback">{formik.errors.price}</div>
                )}
          <input onChange={formik.handleChange} className={`form-control ${formik.touched.description && formik.errors.description ? 'is-invalid' : ''}`} value={formik.values.description} type="text" placeholder="Description"  name='description' style={{marginTop:"20px"}}/>
          {formik.touched.description && formik.errors.description && (
                  <div className="invalid-feedback">{formik.errors.description}</div>
                )}
          <input onChange={handleFileChange}   type="file" placeholder="image" className="form-control mb-3" name='image' />
          <button type='submit' className="btn btn-primary w-100 mb-3 mt-3" style={{ fontSize: '16px', fontWeight: 'bold' }}>Upload</button>
        </form>
      </div>
    </div>

        </Fragment>
    );
}

export default Seller;
