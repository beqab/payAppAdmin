import React, { useState } from 'react';
import { Button, Label, FormGroup, Container, Row, Col, Card, CardBody, Input } from 'reactstrap';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate, createSearchParams, useSearchParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import AuthLogo from '../../layouts/logo/AuthLogo';
import { ReactComponent as LeftBg } from '../../assets/images/bg/login-bgleft.svg';
import { ReactComponent as RightBg } from '../../assets/images/bg/login-bg-right.svg';
import Axios from '../../services/Axios';
import Endpoints from '../../services/endpints';
import responseError from '../../services/utils/responseError';
import { getProfile } from '../../store/profile/profileSlice';

const LoginFormik = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [searchParams] = useSearchParams();

  const validationSchema = Yup.object().shape({
    userName: Yup.string().required('userName is require'),
    password: Yup.string().required('Password is require'),
  });

  const submitForm = async (fields, { setSubmitting, setErrors }) => {
    setLoading(true);
    try {
      const res = await Axios.post(Endpoints.signIn(), fields);
      toast.success(res.data.msg, {});
      localStorage.setItem('token', res.data.token);
      dispatch(getProfile({ token: res.data.token, userName: res.data.userName }));
      // debugger;
      console.log(res, 'res');

      navigate('/');
    } catch (err) {
      console.log(err, 'errr');
      if (err.response.status === 402) {
        navigate({
          pathname: '/auth/emailVerification',
          search: createSearchParams({
            email: fields.email,
          }).toString(),
        });
      }
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
            <Card>
              <CardBody className="p-4 m-1">
                <h5 className="mb-0">Authentication</h5>

                <Formik
                  initialValues={{
                    userName: '',
                    password: '',
                  }}
                  validationSchema={validationSchema}
                  onSubmit={submitForm}
                  render={({ errors, touched }) => (
                    <Form>
                      <FormGroup>
                        <Label htmlFor="userName">UserName</Label>
                        <Field
                          name="userName"
                          type="text"
                          className={`form-control${
                            errors.userName && touched.userName ? ' is-invalid' : ''
                          }`}
                        />
                        <ErrorMessage name="email" component="div" className="invalid-feedback" />
                      </FormGroup>
                      <FormGroup>
                        <Label htmlFor="password">Password</Label>
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
                        <Button type="submit" color="primary" disabled={loading} className="me-2">
                          {loading ? 'sending...' : 'Log In'}
                        </Button>
                      </FormGroup>
                    </Form>
                  )}
                />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default LoginFormik;
