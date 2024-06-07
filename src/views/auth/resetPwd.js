import { useState } from 'react';
import {
  Button,
  Label,
  FormGroup,
  CardTitle,
  Container,
  Row,
  Col,
  Card,
  CardBody,
} from 'reactstrap';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { ToastContainer, toast } from 'react-toastify';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import AuthLogo from '../../layouts/logo/AuthLogo';
import { ReactComponent as LeftBg } from '../../assets/images/bg/login-bgleft.svg';
import { ReactComponent as RightBg } from '../../assets/images/bg/login-bg-right.svg';
import img1 from '../../assets/images/users/user4.jpg';
import Axios from '../../services/Axios';
import Endpoints from '../../services/endpints';
import { getProfile } from '../../store/profile/profileSlice';
import AuthLinks from '../../components/authLinks';

const RecoverPassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [load, setLoad] = useState(false);
  const [searchParams] = useSearchParams();
  const [recovered, setRecovered] = useState(false);
  const token = searchParams.get('resetToken');
  const email = searchParams.get('email');

  const initialValues = {
    password: '',
    confirmPassword: '',
  };

  const validationSchema = Yup.object().shape({
    password: Yup.string().min(6, 'მინუმ 6 სიმბოლო').required('პაროლი აუცილებელია'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'პაროლი არ ემთხვევა')
      .required('პაროლის დადასტურება აუცილებელია'),
  });

  const submitForm = async (fields, { setErrors }) => {
    setLoad(true);
    try {
      const res = await Axios.post(Endpoints.resetPassword, { ...fields, token });
      // alert('mdah');
      toast.success('პაროლის აღდგენის ლინკი წარატებით გამოიგზავნა გთხოვთ შეამოწმოთ ელ-ფოსტა', {});
      setRecovered(fields.password);
    } catch (err) {
      // console.log(err);
      if (err.response?.data?.message) {
        toast.error(err.response.data.message);
      }
    } finally {
      setLoad(false);
    }
  };

  const handleLogin = async () => {
    setLoad(true);
    try {
      const res = await Axios.post(Endpoints.signIn(), { email, password: recovered });
      toast.success(res.data.msg, {});
      localStorage.setItem('token', res.data.token);
      dispatch(getProfile({ token: res.data.token, email: res.data.restaurant.email }));
      // debugger;
      console.log(res, 'res');

      navigate('/');
    } catch (err) {
      console.log(err, 'errr');
      if (err.response.status === 402) {
        // navigate({
        //   pathname: '/auth/emailVerification',
        //   search: createSearchParams({
        //     email: fields.email,
        //   }).toString(),
        // });
      }
      // responseError(err, setErrors);
    } finally {
      setLoad(false);
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
              <AuthLinks />
              {!recovered ? (
                <CardBody className="p-4 m-1">
                  <p>
                    <b>პაროლის აღდგენა</b>
                  </p>
                  <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={submitForm}
                    render={({ errors, touched, isSubmiting }) => (
                      <Form className="mt-3">
                        <FormGroup>
                          <Label htmlFor="password">ახალი პაროლი</Label>
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
                          <Label htmlFor="confirmPassword">გაიმეორეთ პაროლი</Label>
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
                        <FormGroup>
                          <Button type="submit" disabled={load} color="info" block className="me-2">
                            გაგზავნა
                          </Button>
                        </FormGroup>
                      </Form>
                    )}
                  />
                </CardBody>
              ) : (
                <CardBody className="p-4 m-1">
                  <p>
                    <b>პაროლი წარმატებით განახლდა</b>
                  </p>

                  <FormGroup>
                    <Button
                      type="submit"
                      disabled={load}
                      onClick={handleLogin}
                      color="info"
                      block
                      className="me-2"
                    >
                      შესვლა
                    </Button>
                  </FormGroup>
                </CardBody>
              )}
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default RecoverPassword;
