import { ErrorMessage, Field, Form, Formik } from 'formik';
import React, { useState } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ButtonGroup,
  FormGroup,
  Label,
} from 'reactstrap';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import styled from 'styled-components';
// import Axios from '../../services/Axios';
import Axios from 'axios';
import Endpoints from '../../services/endpints';

const StyledModalWrapper = styled.div`
  .modal-dialog {
    min-width: 800px !important;
    /* max-width: 800p% !important; */
  }
`;

const languages = {
  Eng: {
    key: 'en',
  },
};

const TranslatesModal = ({ translates, modal, setModal, className, title = '' }) => {
  const toggle = () => setModal(!modal);
  const [lang, setLang] = React.useState(Object.keys(languages)[0]);
  const [load, setLoad] = useState(false);
  const data = translates ? translates.en : {};

  const handleSubmit = async (formData) => {
    console.log(formData);
    try {
      setLoad(true);
      const res = await Axios.post(Endpoints.profile.editTranslate, formData, {
        params: {
          locale: 'en',
        },
      });
      toast.success('წარმატებით განახლდა', {});
      setModal(false);
      console.log(res);
    } catch (err) {
      toast.error('დაფიქსირდა შეცდომა', {});

      console.log(err);
    } finally {
      setLoad(false);
    }
  };
  return (
    <StyledModalWrapper>
      <Modal
        isOpen={modal}
        toggle={toggle}
        style={{ width: ' 800px !important', maxWidth: '800px' }}
      >
        <ModalHeader toggle={toggle}>{title}</ModalHeader>
        <ModalBody>
          <p> გთავაზობთ ავტომატურად ნათარგმნ ტექსტს რომელიც თქვენი სურვილით შეგიძლიათ ჩაასწოროთ</p>
          <div className="mb-3">
            <ButtonGroup>
              {Object.entries(languages).map(([id]) => (
                <Button key={id} outline={lang !== id} color="primary" onClick={() => setLang(id)}>
                  {id}
                </Button>
              ))}
            </ButtonGroup>
          </div>
          <div className=" ">
            <Formik
              initialValues={{
                restaurantName: data.restaurantName || '',
                description: data.description || '',
                address: data.address || '',
              }}
              onSubmit={handleSubmit}
              validationSchema={Yup.object({
                restaurantName: Yup.string()
                  .min(2, 'უნდა იყოს მინიმუმ 2 სიმბოლო')
                  .required('აუცილებელია'),
                description: Yup.string()
                  .min(30, 'უნდა შეგებოდეს მინიმუმ 60 ასოსგან')
                  .required('აუცილებელია'),
                address: Yup.string()
                  .min(3, 'მისამართი უნდა იყოს მინიმუმ 5 სიმბოლო')
                  .required('მისამართი აუცილებელია'),
              })}
              render={({ errors, touched, resetForm, chan, setFieldValue }) => (
                <>
                  <Form>
                    <FormGroup>
                      <Label htmlFor="restaurantName">დაწესებულების სახელი</Label>
                      <Field
                        className={`form-control ${
                          errors.restaurantName && touched.restaurantName ? ' is-invalid' : ''
                        }`}
                        id="restaurantName"
                        name="restaurantName"
                        type="text"
                      />
                      <ErrorMessage name="name" component="div" className="invalid-feedback" />
                    </FormGroup>
                    <FormGroup>
                      <Label htmlFor="description">დაწესებულების შესახებ</Label>
                      <Field
                        className={`form-control ${
                          errors.description && touched.description ? ' is-invalid' : ''
                        }`}
                        id="description"
                        name="description"
                        type="textarea"
                        as="textarea"
                      />
                      <ErrorMessage
                        name="description"
                        component="div"
                        className="invalid-feedback"
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label htmlFor="name">მისამართი</Label>
                      <Field
                        className={`form-control ${
                          errors.address && touched.address ? ' is-invalid' : ''
                        }`}
                        id="address"
                        name="address"
                        type="text"
                      />
                      <ErrorMessage name="address" component="div" className="invalid-feedback" />
                    </FormGroup>
                    <ModalFooter>
                      <Button disabled={load} type="submit" color="primary">
                        {load ? 'იგზავნება...' : 'შენახვა'}
                      </Button>{' '}
                      <Button
                        color="secondary"
                        onClick={() => {
                          // resetForm();
                          toggle();
                        }}
                      >
                        გაუქმება
                      </Button>
                    </ModalFooter>
                  </Form>
                </>
              )}
            />
          </div>
        </ModalBody>
      </Modal>
    </StyledModalWrapper>
  );
};

export default TranslatesModal;
