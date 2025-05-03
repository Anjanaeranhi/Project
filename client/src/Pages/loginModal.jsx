import React from 'react';
import { Modal} from 'react-bootstrap';
import { toast } from "react-hot-toast";
import { api } from '../axios';
const { Formik } = formik;
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import * as formik from 'formik';
import * as yup from 'yup';
import { useNavigate } from 'react-router';


const LoginModal = ({show, handleClose}) => {

const navigate = useNavigate();
const goToSignup = () =>{navigate("/signup")}
const goToCloth = () => {navigate("/cloths")}
const gotoRecover =() =>{navigate("/recover")}
  
  const handleLogin = async(values) =>{
    try {
      console.log("values",values);
     
      
      
      const {data} = await api.post("login", values);
      console.log(data);
      
     
      localStorage.setItem("_id", data._id);
      console.log(localStorage.setItem("_id", data._id));
      
      localStorage.setItem("userToken",data.token)
      if(!data){
        toast.error("Email and password needed")
      }

      toast.success(data?.message);
      goToCloth();

    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message)
      
    }
  }

  const schema = yup.object().shape({
    
    email: yup.string().email().required(),
    password: yup.string().required(),
    
    
  });
  
    return (
      <Formik
      validationSchema={schema}
      onSubmit={handleLogin}
      initialValues={{
        
        email: '',
        password: '',
        
      }}
    >{({ handleSubmit, handleChange, values, touched, errors }) => (
      <div >
            <Modal show={show} onHide={handleClose} centered >
            <Modal.Header style={{ borderBottom: 'none',background:"#D8C4B6"}}>
          <button
            type="button"
            className="btn-close ms-auto"
            aria-label="Close"
            onClick={handleClose}
          ></button>
        </Modal.Header>
        <Modal.Body style={{background:"#D8C4B6"}}>
          
          <div
            className="d-flex justify-content-center align-items-start pt-2 mb-5"
            
          >
            <div
              className="d-flex flex-column p-5 border shadow rounded"
              style={{ backgroundColor: 'white' }}
            >
              <h2
                className="text-center mb-4"
                style={{ color: '#343a40', fontWeight: 'bold' }}
              >
                Sign in
              </h2> 
            <Form noValidate onSubmit={handleSubmit}>
            <Row>
            <Form.Group  md="4" controlId="validationFormik02" >
             
              <Form.Control
                style={{width: '300px',padding: '12px 20px',fontSize: '16px'}} className=" my-3 shadow text-center"
                type="text"
                name="email"
                placeholder='Email Id'
                value={values.email}
                onChange={handleChange}
                isValid={touched.email && !errors.email}
              />

              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
            </Row>
            <Row className="mb-3">
            <Form.Group  md="6" controlId="validationFormik03" >
              
              <Form.Control
                style={{width: '300px',padding: '12px 20px',fontSize: '16px'}} className=" my-3 shadow text-center"
                type="text"
                placeholder="password"
                name="password"
                value={values.password}
                onChange={handleChange}
                isInvalid={!!errors.password}
              />

              <Form.Control.Feedback type="invalid">
                {errors.password}
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Button type="submit" className=' btn btn-primary my-2' style={{padding: '12px 20px',width:"300px"}}>Submit </Button>
        </Form>
              <p className="mt-3" style={{ color: '#6c757d' }}>Forgot password?{' '} 
                <span onClick={gotoRecover} style={{color:'blue',cursor:'pointer'}}>Reset Here</span>
              </p>
              <p className="mt-3" style={{ color: '#6c757d' }}>Don't have an account?{' '}
                <span onClick={goToSignup} style={{color:'blue',cursor:'pointer'}}>Sign Up</span>
              </p>
              </div> 
          </div>
          
        </Modal.Body>
      </Modal>
        </div>
    )}
          
    </Formik>
        
    );
}

export default LoginModal;
