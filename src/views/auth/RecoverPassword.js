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
import { useNavigate } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { ToastContainer, toast } from 'react-toastify';
import * as Yup from 'yup';
import AuthLogo from '../../layouts/logo/AuthLogo';
import { ReactComponent as LeftBg } from '../../assets/images/bg/login-bgleft.svg';
import { ReactComponent as RightBg } from '../../assets/images/bg/login-bg-right.svg';
import img1 from '../../assets/images/users/user4.jpg';
import Axios from '../../services/Axios';
import Endpoints from '../../services/endpints';
import AuthLinks from '../../components/authLinks';

const RecoverPassword = () => {
  const navigate = useNavigate();
  const [load, setLoad] = useState(false);

  const initialValues = {
    email: '',
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('ელ-ფოსტა არასწორი ფორმატისაა').required('ელ-ფოსტა აუცილებელია'),
  });

  const submitForm = async (fields, { setErrors }) => {
    setLoad(true);
    try {
      const res = await Axios.post(Endpoints.recoverPassword, fields);
      // alert('mdah');
      toast.success('პაროლის აღდგენის ლინკი წარატებით გამოიგზავნა გთხოვთ შეამოწმოთ ელ-ფოსტა', {});
    } catch (err) {
      // console.log(err);
      if (err.response?.data?.message) {
        toast.error(err.response.data.message);
      }
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
                        <Button type="submit" disabled={load} color="info" block className="me-2">
                          პაროლის აღდგენა
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

export default RecoverPassword;
