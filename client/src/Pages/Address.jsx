import { useFormik } from 'formik';
import React, { Fragment, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import * as yup from "yup";
import { userapi } from '../axios';
import { useNavigate } from 'react-router';

const Address = () => {
  const [address, setAddress] = useState([]);
  const userId = localStorage.getItem("_id");
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [selectedAddress, setSelectedAddress] = useState(null);

  const navigate = useNavigate();

  const handleCheckout = () => {
    if (selectedAddress) {
      navigate("/checkout", { state: { address: selectedAddress } });
    }
  };

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const { data } = await userapi.get(`/details/${userId}`);
        setAddress(data);
      } catch (error) {
        toast.error(error?.response?.data?.message || "Error fetching address");
      }
    };
    fetchDetails();
  }, [userId]);

  const formik = useFormik({
    initialValues: {
      firstname: '',
      lastname: '',
      address: '',
      phone: '',
      city: '',
      state: ''
    },
    validationSchema: yup.object({
      firstname: yup.string().min(2).trim().required("First name is required"),
      lastname: yup.string().trim().required("Last name is required"),
      address: yup.string().trim().required("Address is required"),
      phone: yup.string().matches(/^[0-9]{10}$/, 'Phone number must be exactly 10 digits').required("Phone is required"),
      city: yup.string().trim().required("City is required"),
      state: yup.string().trim().required("State is required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        const { data } = await userapi.post("/address", { values, userId });
        toast.success(data.message);
        resetForm();
        const refreshed = await userapi.get(`/details/${userId}`);
        setAddress(refreshed.data);
      } catch (error) {
        toast.error(error?.response?.data?.message || "Error saving address");
      }
    }
  });

  return (
    <Fragment>
      <div className='container my-5'>
        <div className='row'>
          <div className='col-md-6 mb-4'>
            <h4 className='mb-4'>Choose an Address</h4>
            {address.length ? (
              <>
                {address.map((item, index) => (
                  <div
                    key={index}
                    className={`card p-3 mb-3 shadow-sm ${selectedIndex === index ? 'border border-success border-3' : ''}`}
                    style={{ cursor: 'pointer' }}
                    onClick={() => {
                      setSelectedIndex(index);
                      setSelectedAddress(item);
                    }}
                  >
                    <p><strong>{item.firstname} {item.lastname}</strong></p>
                    <p>{item.address}, {item.city}, {item.state}</p>
                    <p>Phone: {item.phone}</p>
                  </div>
                ))}
                {selectedAddress && (
                  <div className="text-end">
                    <button className='btn btn-success mt-3' style={{position:"sticky", bottom:"50px"}} onClick={handleCheckout}>
                      Proceed to Checkout
                    </button>
                  </div>
                )}
              </>
            ) : (
              <p>No saved addresses.</p>
            )}
          </div>

          <div className='col-md-6'>
            <h4 className='mb-4'>Add New Address</h4>
            <form onSubmit={formik.handleSubmit} className='card p-4 shadow-sm'>

              <div className="mb-3">
                <label className='form-label'>First Name</label>
                <input
                  type="text"
                  name="firstname"
                  className={`form-control ${formik.touched.firstname && formik.errors.firstname ? 'is-invalid' : ''}`}
                  value={formik.values.firstname}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.firstname && formik.errors.firstname && (
                  <div className="invalid-feedback">{formik.errors.firstname}</div>
                )}
              </div>

              <div className="mb-3">
                <label className='form-label'>Last Name</label>
                <input
                  type="text"
                  name="lastname"
                  className={`form-control ${formik.touched.lastname && formik.errors.lastname ? 'is-invalid' : ''}`}
                  value={formik.values.lastname}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.lastname && formik.errors.lastname && (
                  <div className="invalid-feedback">{formik.errors.lastname}</div>
                )}
              </div>

              <div className="mb-3">
                <label className='form-label'>Address</label>
                <input
                  type="text"
                  name="address"
                  className={`form-control ${formik.touched.address && formik.errors.address ? 'is-invalid' : ''}`}
                  value={formik.values.address}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.address && formik.errors.address && (
                  <div className="invalid-feedback">{formik.errors.address}</div>
                )}
              </div>

              <div className="mb-3">
                <label className='form-label'>Phone</label>
                <input
                  type="text"
                  name="phone"
                  className={`form-control ${formik.touched.phone && formik.errors.phone ? 'is-invalid' : ''}`}
                  value={formik.values.phone}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.phone && formik.errors.phone && (
                  <div className="invalid-feedback">{formik.errors.phone}</div>
                )}
              </div>

              <div className="mb-3">
                <label className='form-label'>City</label>
                <input
                  type="text"
                  name="city"
                  className={`form-control ${formik.touched.city && formik.errors.city ? 'is-invalid' : ''}`}
                  value={formik.values.city}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.city && formik.errors.city && (
                  <div className="invalid-feedback">{formik.errors.city}</div>
                )}
              </div>

              <div className="mb-3">
                <label className='form-label'>State</label>
                <input
                  type="text"
                  name="state"
                  className={`form-control ${formik.touched.state && formik.errors.state ? 'is-invalid' : ''}`}
                  value={formik.values.state}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.state && formik.errors.state && (
                  <div className="invalid-feedback">{formik.errors.state}</div>
                )}
              </div>

              <button type='submit' className='btn btn-success w-100'>Submit Address</button>
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Address;
