import React, { useEffect, useState } from 'react';
import { Button, CardTitle, Container, Row, Col, Card, CardBody } from 'reactstrap';
import { Link, useSearchParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import AuthLogo from '../../layouts/logo/AuthLogo';
import { ReactComponent as LeftBg } from '../../assets/images/bg/login-bgleft.svg';
import { ReactComponent as RightBg } from '../../assets/images/bg/login-bg-right.svg';
import Axios from '../../services/Axios';
import Endpoints from '../../services/endpints';
import responseError from '../../services/utils/responseError';
import AuthLinks from '../../components/authLinks';

const EmailConfirmation = () => {
  const [loading, setLading] = useState(false);
  const [verifyLoad, setVerifyLoad] = useState(false);
  const [searchParams] = useSearchParams();
  const [verified, setVerified] = useState('');
  const [verifyError, setVerifyError] = useState('');
  console.log(searchParams.get('email'));
  console.log(searchParams.get('token'));
  const email = searchParams.get('email');
  const token = searchParams.get('token');

  const handleSubmit = async () => {
    setLading(true);
    try {
      const res = await Axios.post(Endpoints.resendEmailVerification(), {
        email: searchParams.get('email'),
      });
      toast.success(res.data.msg, {});
    } catch (err) {
      responseError(err);
    } finally {
      setLading(false);
    }
  };

  useEffect(() => {
    if (token) {
      setLading(true);
      Axios.post(Endpoints.mailConfirmation, {
        token,
      })
        .then((res) => {
          setVerifyLoad(false);
          console.log(res, 'vvvvvvvv');
          setVerified(res.data.email);
        })
        .catch((err) => {
          setVerifyLoad(false);

          if (err.response.data.msg) {
            toast.error(err.response.data.msg);
          } else if (err.response.data.name === 'JsonWebTokenError') {
            setVerifyError('მეილის ვერიფიკაციის ტოკენი დაზინებულია ');
          } else if (err.response.data.name === 'TokenExpiredError') {
            setVerifyError('მეილის ვერიფიკაციის ტოკენს ვადა გაუვიდა გაგზავნე თავიდან. ');
          } else {
            setVerifyError('მეილის ვერიფიკაცისას დაფიქსირდა შეცდომა. ');
          }
        });
    }
  }, [token]);
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
              {token && verifyLoad ? <div className=" p-4 text-center">იგზავნება...</div> : null}

              {token && verified ? (
                <CardBody className="p-4 m-1 text-center">
                  <CardTitle tag="h4">
                    ელ-ფოსტის: {verified} ვერიფიკაცია წარმატებით დასრულდა!
                  </CardTitle>
                  <h5 className="text-muted font-medium mb-4">
                    შეგიზლიათ შეხვიდეთ საიტზე აღნიშნული მეილითი და პაროლით
                  </h5>

                  <div className="d-flex align-items-center justify-content-center gap-2">
                    <Link to={`/auth/loginformik?email=${email}`}>
                      <Button type="submit" color="primary">
                        შესვლა
                      </Button>
                    </Link>
                  </div>
                </CardBody>
              ) : null}

              {token && verifyError ? (
                <CardBody className="p-4 m-1 text-center">
                  <div className="mt-3 mb-2">
                    <i className="bi bi-exclamation-triangle-fill text-warning display-5"></i>
                  </div>
                  <CardTitle tag="h4">ელ-ფოსტის: {email}</CardTitle>
                  <h5 className="text-muted font-medium mb-4">{verifyError}</h5>

                  <div className="d-flex align-items-center justify-content-center gap-2">
                    <Button type="submit" disabled={loading} onClick={handleSubmit} color="primary">
                      {loading ? 'იგზავნება...' : 'თავიდან გაგზავნა'}
                    </Button>
                  </div>
                </CardBody>
              ) : null}

              {!token && email ? (
                <CardBody className="p-4 m-1 text-center">
                  <div className="mt-3 mb-2">
                    <i className="bi bi-exclamation-triangle-fill text-warning display-5"></i>
                  </div>
                  <CardTitle tag="h4">ელ-ფოსტის ვერიფიკაცია</CardTitle>
                  <h5 className="mb-0 text-muted font-medium">
                    მომხმაებელი <b> {searchParams.get('email')}</b> ელ-ფოსტით უკვე რეგისტრირებულია.
                  </h5>
                  <h5 className="text-muted font-medium mb-4">
                    საჭიროა ელ-ფოსტის ერთჯერადი ვერიფიკაცია. გთხოვთ შეამოწმოთ ელ-ფოსტა თუ ვერ ნახეთ
                    ვერიფიკაციის ლინკი შეამოწმოეთ spam განყოფილება.
                  </h5>

                  <div className="d-flex align-items-center justify-content-center gap-2">
                    <Button type="submit" disabled={loading} onClick={handleSubmit} color="primary">
                      {loading ? 'იგზავნება...' : 'თავიდან გაგზავნა'}
                    </Button>
                  </div>
                </CardBody>
              ) : null}
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default EmailConfirmation;
