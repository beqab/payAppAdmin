import React, { useState } from 'react';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { ErrorMessage, Field, Formik, Form } from 'formik';
import { Button, FormGroup, Label } from 'reactstrap';
import Axios from '../../services/Axios';
import Endpoints from '../../services/endpints';

const ChangePassword = ({ user }) => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (data) => {
    console.log(data);
    setLoading(true);
    try {
      const res = await Axios.post(Endpoints.profile.changePassword, data);
      toast.success('პაროლი წარმატებით შეიცვალა');
      console.log(res);
    } catch (err) {
      console.log(err?.response?.data?.message, 'err?.response?.data?.message');
      if (err?.response?.data?.msg) {
        toast.error(err?.response?.data?.msg);
      }
    } finally {
      setLoading(false);
    }
  };
  console.log(user, 'useruser');
  return (
    <Formik
      initialValues={{
        current_password: '',
        password: '',
      }}
      validationSchema={Yup.object().shape({
        // email: Yup.string().email('wrong email format').required('email is require'),
        password: Yup.string()
          .required('პაროლი აუცილებელია')
          .min(6, 'პაროლი უნდა იყოს მინიმუმ 6 სიმბოლო'),
        current_password: Yup.string()
          .required('მიმდინარე პაროლი აუცილებელია')
          .min(6, 'პაროლი უნდა იყოს მინიმუმ 6 სიმბოლო'),
      })}
      onSubmit={handleSubmit}
      render={({ errors, touched }) => (
        <Form>
          <FormGroup>
            <Label htmlFor="current_password">მიმდინარე პაროლი</Label>
            <Field
              name="current_password"
              type="password"
              className={`form-control${
                errors.current_password && touched.current_password ? ' is-invalid' : ''
              }`}
            />
            <ErrorMessage name="current_password" component="div" className="invalid-feedback" />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="password">ახალი პაროლი</Label>
            <Field
              name="password"
              type="password"
              className={`form-control${errors.password && touched.password ? ' is-invalid' : ''}`}
            />
            <ErrorMessage name="current_password" component="div" className="invalid-feedback" />
          </FormGroup>

          <FormGroup>
            <Button type="submit" color="primary" disabled={loading} className="me-2">
              {loading ? 'იგზავნება...' : 'პაროლის შეცვლა'}
            </Button>
          </FormGroup>
        </Form>
      )}
    />
  );
};

export default ChangePassword;
