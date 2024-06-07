import React, { useEffect, useState } from 'react';
import { Form, Formik, Field, ErrorMessage } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import * as Yup from 'yup';
import { convertFromRaw, convertToRaw, EditorState, convertFromHTML, ContentState } from 'draft-js';
import { serialize } from 'object-to-formdata';
import { toast } from 'react-toastify';
import draftToHtml from 'draftjs-to-html';
import Axios from 'axios';
import { Link } from 'react-router-dom';
import { Input, FormGroup, Button, Label, Row, Col } from 'reactstrap';
import {
  SelectOffer,
  UpdateNote,
  addSpecialOffer,
  setDetailType,
} from '../../store/apps/SpecialOffers/SpecialOffersSlice';
import FormEditor from '../form-editor/FormEditor';
import ImageUploader from '../../components/imageUploader';
import getOptimizedImgs from '../../utils/imageOptimizer';
import Endpoints from '../../services/endpints';
// import Axios from '../../services/Axios';
import OfferPreview from './offerPreview';
import FormikSelect from '../../components/apps/formikSelect';
import convertUrlsToFiles from '../../utils/stringUrlToFile';
import TranslatesModal from '../../components/translatesModal';
import OfferTranslatesModal from '../../components/translatesModal/offerTranslateModal';

const personsOption = () => {
  const options = [<option value="">აირჩიე რაოდენობა</option>];

  for (let i = 1; i < 50; i++) {
    options.push(<option value={i}>{i} მომხმარებელი</option>);
  }
  return options;
};

const content = {
  entityMap: {},
  blocks: [
    {
      key: '637gr',
      text: 'Initialized from content state.',
      type: 'unstyled',
      depth: 0,
      inlineStyleRanges: [],
      entityRanges: [],
      data: {},
    },
  ],
};

const NoteDetail = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [images, setImages] = useState([]);
  const [load, setLad] = useState(false);
  const [edit, setEdit] = useState(false);
  const [translateText, setTranslateText] = useState();
  const [modal, setModal] = useState(false);

  const dispatch = useDispatch();

  const selectedOffer = useSelector((state) => {
    return state.SpecialOffersReducer.SpecialOffers.find(
      (item) => item._id === state.SpecialOffersReducer.SpecialOffersContent,
    );
  });
  const DetailType = useSelector((state) => state.SpecialOffersReducer.DetailType);
  const haveProfile = useSelector((state) => state.SpecialOffersReducer.haveProfile);
  const offersList = useSelector((state) => state.SpecialOffersReducer.SpecialOffers);
  const id = useSelector((state) => state.SpecialOffersReducer.SpecialOffers.length + 1);

  useEffect(() => {
    if (selectedOffer) {
      if (selectedOffer.text) {
        setEditorState(
          EditorState.createWithContent(convertFromRaw(JSON.parse(selectedOffer.text))),
        );

        setTranslateText(selectedOffer.translates);
        console.log(JSON.parse(selectedOffer.text), 'JSON.parse(selectedOffer.text)');
        // console.log(
        //   convertFromRaw(JSON.parse(selectedOffer.text)),
        //   'convertFromRaw(JSON.parse(selectedOffer.text))',
        // );
      }
      const getImgs = async () => {
        const imgs = await convertUrlsToFiles(selectedOffer.images);

        setImages(imgs);
      };
      getImgs();
    } else {
      setEditorState(EditorState.createEmpty());
      setImages([]);
    }
  }, [selectedOffer]);

  const addNewOffer = (e) => {
    setEditorState(EditorState.createEmpty());
    setImages([]);
    if (DetailType !== 'addNew') {
      dispatch(setDetailType(false));
      setTimeout(() => {
        dispatch(setDetailType('addNew'));
        dispatch(SelectOffer(null));
      }, 10);
      dispatch(SelectOffer(null));
    }
  };

  const translateBeforeSave = (text, format = 'text', target = 'en') => {
    return new Promise((resolve, reject) => {
      Axios.post(
        Endpoints.translate(),
        { translateFrom: text },
        {
          params: {
            format,
            target,
          },
        },
      )
        .then((res) => {
          if (format === 'html') {
            const blocksFromHTML = convertFromHTML(res.data.translate);
            // console.log(blocksFromHTML);
            const state = ContentState.createFromBlockArray(
              blocksFromHTML.contentBlocks,
              blocksFromHTML.entityMap,
            );
            resolve(convertToRaw(state));
          }
          resolve(res.data.translate);
        })
        .catch((err) => {
          reject(err);
        });
    });
  };

  const handleSave = async (data) => {
    if (images.length <= 0) {
      toast.error('სურათი აუცილებელი, გთხოვთ ატვირთოთ სურათი', {});
      return;
    }
    setLad(true);

    const imgsFormData = new FormData();

    try {
      const previewImgs = await getOptimizedImgs(images);
      const regularImgs = await getOptimizedImgs(images, 'regularImgs', 1260, 400, 1260, 80);

      [...previewImgs, ...regularImgs].forEach((img) => {
        imgsFormData.append('image', img);
      });

      const stateToRav = convertToRaw(editorState.getCurrentContent());
      const html = draftToHtml(stateToRav);

      let enText = null;
      let enTitle = null;
      if (!selectedOffer) {
        enText = await translateBeforeSave(html, 'html', 'en');
        enTitle = await translateBeforeSave(data.title);
      }

      const formData = serialize(
        { ...data, text: JSON.stringify(stateToRav), enText: JSON.stringify(enText), enTitle },
        {},
        imgsFormData,
      );
      const response = await Axios.post(Endpoints.specialOffer.post(), formData, {
        params: {
          offerId: selectedOffer ? selectedOffer._id : null,
          // restaurantSlag:
        },
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      dispatch(addSpecialOffer(response.data));
      if (!selectedOffer) {
        setTranslateText(response.data.translates);
        setModal(true);
      }

      toast.success('ოპერაცია წამაატებით შესრულდა', {});
    } catch (err) {
      console.log(err);
    } finally {
      setLad(false);
    }
  };

  return (
    <div>
      {translateText ? (
        <OfferTranslatesModal
          modal={modal}
          offerId={selectedOffer ? selectedOffer._id : null}
          translates={translateText}
          setModal={setModal}
          title="სპეციალური შეთავაზება უცხო ენაზე"
        />
      ) : null}
      <div className="border-bottom p-3 text-end addOfferBtn_wrapper">
        <Button className="btn btn-success ms-auto" size="md" onClick={addNewOffer}>
          დაამატე ახალი შეთავაზება <i></i>
        </Button>
      </div>
      {selectedOffer && DetailType === 'preview' ? (
        <OfferPreview {...selectedOffer} />
      ) : (selectedOffer && DetailType === 'edit') || DetailType === 'addNew' ? (
        <>
          {!haveProfile ? (
            <div
              style={{
                textAlign: 'center',
                marginTop: ' 70px',
              }}
              className=" text-center"
            >
              <p>სპეციალური შეთავაზების დასამატებლად აუცილებელია დაწესებულების პროფილის შექმნა</p>

              <div>
                <Link to="/apps/about">
                  <Button>პროფილის შექმნა</Button>
                </Link>
              </div>
            </div>
          ) : (
            <div className="p-4">
              <Formik
                initialValues={{
                  title: selectedOffer ? selectedOffer.title : '',
                  price: selectedOffer ? selectedOffer.price : '',
                  originalPrice: selectedOffer ? selectedOffer.originalPrice : '',
                  persons: selectedOffer ? selectedOffer.persons : '',
                }}
                onSubmit={handleSave}
                validationSchema={Yup.object({
                  title: Yup.string().min(3, 'უნდა იყოს მინიმუმ 3 სიმბოლო').required('აუცილებელია'),
                  persons: Yup.string().required('მომხმარებლების რაოდენობა აუცილებელია'),
                  price: Yup.string().required('ფასი აუცილებელია'),
                  originalPrice: Yup.string().required('ფასი აუცილებელია'),
                })}
                render={({ errors, touched, resetForm, chan, setFieldValue }) => (
                  <Form>
                    <FormGroup>
                      <Label htmlFor="title" tag="h5">
                        სათაური
                      </Label>
                      <Field
                        className={`form-control ${
                          errors.title && touched.title ? ' is-invalid' : ''
                        }`}
                        id="title"
                        name="title"
                        type="text"
                        // onChange={(e) => dispatch(UpdateNote(noteDetails.id, 'title', e.target.value))}
                      />
                      <ErrorMessage name="title" component="div" className="invalid-feedback" />
                    </FormGroup>
                    <FormGroup>
                      <Row>
                        <Col sm="4">
                          <Label htmlFor="originalPrice" tag="h5">
                            პირვანდელი ფასი (ლარში)
                          </Label>
                          <Field
                            name="originalPrice"
                            type="number"
                            placeholder="დან"
                            className={`form-control${
                              errors.originalPrice && touched.originalPrice ? ' is-invalid' : ''
                            }`}
                          />
                          <ErrorMessage
                            name="originalPrice"
                            component="div"
                            className="invalid-feedback"
                          />
                        </Col>

                        <Col sm="4">
                          <Label htmlFor="price" tag="h5">
                            ფასდაკლებული ფასი (ლარში)
                          </Label>
                          <Field
                            name="price"
                            type="number"
                            placeholder="მდე"
                            className={`form-control${
                              errors.price && touched.price ? ' is-invalid' : ''
                            }`}
                          />
                          <ErrorMessage name="price" component="div" className="invalid-feedback" />
                        </Col>
                      </Row>
                    </FormGroup>

                    <FormikSelect
                      options={personsOption()}
                      label="რამდენ მომხმარებელზეა გათვლილი"
                      name="persons"
                    />
                    <FormGroup>
                      <Label for="title1" tag="h5">
                        დეტალური ინფორმაცია
                      </Label>

                      <FormEditor
                        editorState={editorState}
                        setEditorState={(c) => setEditorState(c)}
                      />
                    </FormGroup>

                    <ImageUploader images={images} maxImgs={1} setImages={setImages} />
                    <div className=" d-flex justify-content-between">
                      <div>
                        {translateText && (
                          <Button onClick={() => setModal(true)}>შეთავაზება უცხო ენაზე</Button>
                        )}{' '}
                      </div>
                      <div>
                        <Button disabled={load}>{load ? 'იგზავნება..' : 'შენახვ'}</Button>
                      </div>
                    </div>
                  </Form>
                )}
              />
            </div>
          )}
        </>
      ) : (
        <div className="d-flex mt-3 p-4 flex-column align-items-center justify-content-center">
          <i className="ti-agenda display-5" />
          <h4 className="mt-2">
            {offersList.length > 0
              ? 'აირჩიეთ სპეციალური შეთავაზება ან დაამატეთ ახალი'
              : 'დაამატე ახალი შეთავაზება'}
          </h4>
        </div>
      )}
    </div>
  );
};

export default NoteDetail;
