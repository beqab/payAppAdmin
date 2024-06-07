import { ErrorMessage, Field, Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
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
import { convertFromRaw, convertToRaw, EditorState } from 'draft-js';

import * as Yup from 'yup';
import { toast } from 'react-toastify';
import styled from 'styled-components';
// import Axios from '../../services/Axios';
import Axios from 'axios';
import Endpoints from '../../services/endpints';
import FormEditor from '../../views/form-editor/FormEditor';

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

const OfferTranslatesModal = ({ translates, modal, setModal, offerId, className, title = '' }) => {
  const toggle = () => setModal(!modal);
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const data = translates ? translates.en : {};
  const [lang, setLang] = React.useState(Object.keys(languages)[0]);
  const [load, setLoad] = useState(false);
  useEffect(() => {
    console.log(translates, ' translates');
    if (data.text) {
      // debugger;
      setEditorState(EditorState.createWithContent(convertFromRaw(JSON.parse(data.text))));
    }
  }, [data]);

  const handleSubmit = async (formData) => {
    console.log(formData);

    const text = JSON.stringify(convertToRaw(editorState.getCurrentContent()));
    try {
      setLoad(true);
      const res = await Axios.post(
        Endpoints.specialOffer.editTranslate,
        { ...formData, text },
        {
          params: {
            locale: 'en',
            offerId,
          },
        },
      );
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
                title: data.title || '',
              }}
              onSubmit={handleSubmit}
              validationSchema={Yup.object({
                title: Yup.string().min(2, 'უნდა იყოს მინიმუმ 2 სიმბოლო').required('აუცილებელია'),
              })}
              render={({ errors, touched, resetForm, chan, setFieldValue }) => (
                <>
                  <Form>
                    <FormGroup>
                      <Label htmlFor="title">სათაური</Label>
                      <Field
                        className={`form-control ${
                          errors.title && touched.title ? ' is-invalid' : ''
                        }`}
                        id="title"
                        name="title"
                        type="text"
                      />
                      <ErrorMessage name="name" component="div" className="invalid-feedback" />
                    </FormGroup>
                    <FormGroup>
                      <Label for="title1" tag="h5">
                        დეტალური ინფორმაცია
                      </Label>

                      <FormEditor
                        editorState={editorState}
                        setEditorState={(c) => setEditorState(c)}
                      />
                    </FormGroup>

                    <ModalFooter>
                      <Button disabled={load} type="submit" color="primary">
                        {load ? 'იგზავნება...' : 'შენახვა'}
                      </Button>{' '}
                      {/* <Button
                        color="secondary"
                        onClick={() => {
                          resetForm();
                        }}
                      >
                        სვლილების გაუქმება
                      </Button> */}
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

export default OfferTranslatesModal;
