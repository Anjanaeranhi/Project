import React from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import * as formik from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router";
import { api } from "../axios";
import toast from "react-hot-toast";

const Adminlogin = () => {
  const { Formik } = formik;
  const navigate = useNavigate();

  const goToAdmin = () => navigate("/admin");

  const schema = yup.object().shape({
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup.string().required("Password is required"),
  });

  const handleLogin = async (values) => {
    try {
      console.log("Admin Login Submitted:", values);
      const {data} = await api.post("/admin/login", values);
      toast.success(data?.message);
      localStorage.setItem("access_token", data.token);
      goToAdmin();
    } catch (error) {
      console.log(error?.message);
      toast.error(error.response?.data?.message);
    }
  };

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ height: "100vh" }}
    >
      <Card style={{ width: "28rem" }} className="shadow">
        <Card.Body>
          <Card.Title className="text-center mb-4" style={{ fontSize: "1.8rem", fontWeight: "600" }}>
            Admin Login
          </Card.Title>
          <Formik
            validationSchema={schema}
            onSubmit={handleLogin}
            initialValues={{
              email: "",
              password: "",
            }}
          >
            {({ handleSubmit, handleChange, values, errors }) => (
              <Form noValidate onSubmit={handleSubmit}>
                <Form.Group as={Col} controlId="validationFormikEmail" className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <InputGroup hasValidation>
                    <Form.Control
                      type="email"
                      placeholder="Enter your email"
                      name="email"
                      value={values.email}
                      onChange={handleChange}
                      isInvalid={!!errors.email}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.email}
                    </Form.Control.Feedback>
                  </InputGroup>
                </Form.Group>

                <Form.Group as={Col} controlId="validationFormikPassword" className="mb-4">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter your password"
                    name="password"
                    value={values.password}
                    onChange={handleChange}
                    isInvalid={!!errors.password}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.password}
                  </Form.Control.Feedback>
                </Form.Group>

                <div className="d-grid">
                  <Button variant="primary" type="submit" size="lg">
                    Login
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Adminlogin;
