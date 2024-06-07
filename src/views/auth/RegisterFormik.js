import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Label, FormGroup, Container, Row, Col, Card, CardBody } from 'reactstrap';
import { ToastContainer, toast } from 'react-toastify';
import {
  Formik,
  Field,
  ErrorMessage,
  Form,
  useFormikContext,
  useFormik,
  yupToFormErrors,
} from 'formik';
import * as Yup from 'yup';
import { Link, redirect, useSubmit, useActionData } from 'react-router-dom';
import AuthLogo from '../../layouts/logo/AuthLogo';
import { ReactComponent as LeftBg } from '../../assets/images/bg/login-bgleft.svg';
import { ReactComponent as RightBg } from '../../assets/images/bg/login-bg-right.svg';
import Endpoints from '../../services/endpints';
import responseError from '../../services/utils/responseError';
import Axios from '../../services/Axios';

const initialValues = {
  // UserName: '',
  email: '',
  password: '',
  confirmPassword: '',
  acceptTerms: false,
};

const RegisterFormik = () => {
  const [successRegistration, setSuccessRegistration] = useState(false);
  const [loading, setLoading] = useState(false);

  const validationSchema = Yup.object().shape({
    // UserName: Yup.string().required('სახელი აუცილებელია'),
    email: Yup.string().email('ელ-ფოსტა არასწორი ფრმატისაა').required('ელ-ფოსტა აუცილებელია'),
    password: Yup.string()
      .min(6, 'პაროლი უნდა შედგებოდეს მინიმუმ 6 სიმბოლოსგან')
      .required('პაროლი აუცილებელია'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'პაროლები არ ემთხვევა')
      .required('პაროლის გამეორება აუცილებელია'),
    acceptTerms: Yup.bool().oneOf([true], 'დაეთანხმეთ წესებს და პირობებს'),
  });

  const submitForm = async (fields, { setSubmitting, setErrors }) => {
    setLoading(true);
    try {
      const res = await Axios.post(Endpoints.auth(), fields);
      toast.success(res.data.msg, {});
      setSuccessRegistration(res.data.msg);
    } catch (err) {
      responseError(err, setErrors);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="loginBox">
      <ToastContainer />
      <LeftBg className="position-absolute left bottom-0" />
      <RightBg className="position-absolute end-0 top" />
      <Container fluid className="h-100">
        <Row className="justify-content-center align-items-center h-100">
          <Col lg="12" className="loginContainer">
            <AuthLogo />
            {successRegistration ? (
              <Card>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    width: '100%',
                    textDecoration: 'unset',
                    padding: '10px 30px',
                  }}
                  className="  d-flex items-center justify-between w-100    "
                >
                  <Link to="/auth/loginformik">ავტორიზაცია</Link>
                  <Link
                    to="/auth/registerformik"
                    onClick={(e) => {
                      e.preventDefault();
                      setSuccessRegistration(false);
                    }}
                  >
                    რეგისტრაცია
                  </Link>
                </div>
                <p className=" text-center p-3">{successRegistration}</p>
              </Card>
            ) : (
              <Card>
                <CardBody className="p-4 m-1">
                  <h5 className="mb-0">რეგისტრაცია</h5>
                  <small className="pb-4 d-block">
                    უკვე რეგისტრირებული ხარ? <Link to="/auth/loginformik">შესვლა</Link>
                  </small>
                  <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={submitForm}
                    render={({ errors, touched }) => (
                      <Form>
                        {/* <FormGroup>
                          <Label htmlFor="firstName">მომხმარებლის სახელი</Label>
                          <Field
                            name="UserName"
                            type="text"
                            className={`form-control ${
                              errors.UserName && touched.UserName ? ' is-invalid' : ''
                            }`}
                          />
                          <ErrorMessage
                            name="UserName"
                            component="div"
                            className="invalid-feedback"
                          />
                        </FormGroup> */}

                        <FormGroup>
                          <Label htmlFor="email">ელ-ფოსტა</Label>
                          <Field
                            name="email"
                            type="text"
                            className={`form-control${
                              errors.email && touched.email ? ' is-invalid' : ''
                            }`}
                          />
                          <ErrorMessage name="email" component="div" className="invalid-feedback" />
                        </FormGroup>
                        <FormGroup>
                          <Label htmlFor="password">პაროლი</Label>
                          <Field
                            name="password"
                            type="password"
                            className={`form-control${
                              errors.password && touched.password ? ' is-invalid' : ''
                            }`}
                          />
                          <ErrorMessage
                            name="password"
                            component="div"
                            className="invalid-feedback"
                          />
                        </FormGroup>
                        <FormGroup>
                          <Label htmlFor="confirmPassword">გაიმეორე პაროლი</Label>
                          <Field
                            name="confirmPassword"
                            type="password"
                            className={`form-control${
                              errors.confirmPassword && touched.confirmPassword ? ' is-invalid' : ''
                            }`}
                          />
                          <ErrorMessage
                            name="confirmPassword"
                            component="div"
                            className="invalid-feedback"
                          />
                        </FormGroup>
                        <FormGroup inline className="form-check">
                          <Field
                            type="checkbox"
                            name="acceptTerms"
                            id="acceptTerms"
                            className={`form-check-input ${
                              errors.acceptTerms && touched.acceptTerms ? ' is-invalid' : ''
                            }`}
                          />
                          <Label htmlFor="acceptTerms" className="form-check-label">
                            ვეთანხმები წესებს და პირობებს
                          </Label>
                          <ErrorMessage
                            name="acceptTerms"
                            component="div"
                            className="invalid-feedback"
                          />
                        </FormGroup>
                        <FormGroup>
                          <Button type="submit" color="primary" disabled={loading} className="me-2">
                            {loading ? 'იგზავნება...' : 'რეგისტრაცია'}
                          </Button>
                          {/* <Button type="reset" color="secondary">
                          Reset
                        </Button> */}
                        </FormGroup>
                      </Form>
                    )}
                  />
                </CardBody>
              </Card>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default RegisterFormik;
