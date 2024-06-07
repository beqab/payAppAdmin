/* eslint-disable no-use-before-define */
/* eslint-disable */
import React, { useState, useEffect } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { CardBody, Row, Col, FormGroup, Label, Input, Button } from 'reactstrap';
import { useLoaderData, useSubmit } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { serialize } from 'object-to-formdata';

import Axios from 'axios';
import Resizer from 'react-image-file-resizer';
import ComponentCard from '../../components/ComponentCard';
// import Axios from '../../services/Axios';
import Endpoints from '../../services/endpints';
import ReactGoogleMap from '../../components/googlemap/reactGooglemap';
import MultiSelect from '../ui/form/multiSelect';
import ImageUploader from '../../components/imageUploader';
import getOptimizedImgs from '../../utils/imageOptimizer';
import convertUrlsToFiles from '../../utils/stringUrlToFile';
import PageName from './pageName';
import TranslatesModal from '../../components/translatesModal';
import './restaurant.scss';

const resizeFile = (file, width = 300, height = 20, qty = 70, minWidth = 300) =>
  new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,
      width,
      height,
      'WEBP',
      qty,
      0,
      (uri) => {
        resolve(uri);
      },
      'file',
      minWidth,
    );
  });

const RestaurantInfo = () => {
  const [images, setImages] = useState([]);
  const profileData = useLoaderData();
  const [load, setLoad] = useState(false);
  const [slag, setSlag] = useState('');
  const [coords, setCoords] = useState();
  const [translateText, setTranslateText] = useState();

  const [categoryTypes, setCategoryTypes] = useState();
  const [kitchenTypes, setKitchenTypes] = useState();
  const [spTypes, setSpTypes] = useState();

  useEffect(() => {
    if (profileData.lat && profileData.lng) {
      setCoords({
        lat: profileData.lat,
        lng: profileData.lng,
      });
    }
    // if (profileData.images[0]) {
    //   const fetchImage = async (imageUrl) => {
    //     let blob;
    //     try {
    //       const response = await fetch(imageUrl, { mode: 'cors' });
    //       console.log(response, 'rrrrrrrrrrrrrrrrrr');
    //       const blob = await response.blob();
    //     } catch (er) {}
    //     return blob;
    //   };

    //   console.log(fetchImage(profileData.images[0]), 'dddd');
    // }

    // console.log(convertUrlsToFiles(profileData.images), 'ddd');
    if (profileData.images && profileData.images.length) {
      const getImgs = async () => {
        const imgs = await convertUrlsToFiles(profileData.images);
        console.log(imgs, 'ddddddddddd');
        setImages(imgs);
      };
      getImgs();
    }
    if (profileData.slag) {
      setSlag(profileData.slag);
    }
    if (profileData.translates) {
      setTranslateText(profileData.translates);
    }
  }, [profileData]);

  useEffect(() => {
    const fetChCategories = async () => {
      try {
        const res = await Axios.get(Endpoints.categories.get());
        console.log(res);
        setCategoryTypes(res.data.types);
        setKitchenTypes(res.data.kitchens);
        setSpTypes(res.data.spaceTypes);
      } catch (err) {
        console.log(err);
      }
    };

    fetChCategories();
  }, []);

  const handleSave = async (data) => {
    // console.log(data, 'dddddddddddddddddddddddd');
    if (images.length < 4) {
      toast.error('ატვირთეთ მინიმუმ 4 სურათი');
      return;
    }
    setLoad(true);
    const imgsFormData = new FormData();

    const previewImgs = await getOptimizedImgs(images);
    const regularImgs = await getOptimizedImgs(images, 'regularImgs', 1360, 400, 1360, 80);

    [...previewImgs, ...regularImgs].forEach((img) => {
      imgsFormData.append('image', img);
    });

    console.log(previewImgs, regularImgs, 'immmimmmimmm');

    const { kitchenTypes, categoryTypes, spaceTypes, ...restData } = data;
    const formData = serialize(
      {
        ...data.coords,
        ...restData,
        slag,
        kitchenTypes: JSON.stringify(kitchenTypes),
        categoryTypes: JSON.stringify(categoryTypes),
        spaceTypes: JSON.stringify(spaceTypes),
      },
      {},
      imgsFormData,
    );

    try {
      const res = await Axios.post(Endpoints.saveRestaurantInfo(), formData, {
        params: {
          locale: 'ka',
        },
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      toast.success('წარმატებით შეინახა', {});
      setModal(true);

      setTranslateText(res.data.translates);
      // console.log(res);
    } catch (err) {
      console.log(err.response);
      if (err.response.data.msg) {
        toast.error(err.response.data.msg, {});
      } else {
        toast.err('server error', {});
      }
    } finally {
      setLoad(false);
    }
  };

  // const { buttonLabel, className } = props;

  const [modal, setModal] = useState(false);

  return (
    <div>
      {translateText ? (
        <TranslatesModal
          modal={modal}
          translates={translateText}
          setModal={setModal}
          title="დაწესებულების ინფორმაცია უცხო ენებზე"
        />
      ) : null}

      <ToastContainer />
      {/* <div>
        <h4 className=" test">დაწესებულების ინფორმაცია</h4>
      </div> */}
      <Col md="12">
        <ComponentCard title="დაწესებულების ინფორმაცია">
          <Formik
            initialValues={{
              kitchenTypes: profileData.kitchens || [],
              spaceTypes: profileData.spaceTypes || [],
              categoryTypes: profileData.type || [],
              restaurantName: profileData.restaurantName || '',
              phone: profileData.phone || '',
              phone2: profileData.phone2 || '',
              email: profileData.email || '',
              description: profileData.description || '',
              openAt: profileData.openAt || '',
              closeAt: profileData.closeAt || '',
              type: profileData.type || [],
              address: profileData.address || '',
              coords: { lat: profileData.lat, lng: profileData.lng } || null,
              facebook: profileData.facebook || '',
              instagram: profileData.instagram || '',
              webSite: profileData.webSite || '',
            }}
            onSubmit={async (e) => {
              console.log('mmmmmmmmmmmmmmmmmmm');
              handleSave(e);
            }}
            validate={(v) => {
              console.log(v, 'nnnnnnnnnnnnn');
            }}
            validationSchema={Yup.object({
              restaurantName: Yup.string()
                .min(2, 'უნდა იყოს მინიმუმ 2 სიმბოლო')
                .required('აუცილებელია'),
              description: Yup.string()
                .min(60, 'უნდა შეგებოდეს მინიმუმ 60 ასოსგან')
                .required('აუცილებელია'),
              phone: Yup.string()
                .min(7, 'მინიმუმ 7 სიმბოლო')
                .max(10, 'მაქსიმუმ 10 სიმბოლო')
                .required('აუცილებელია'),
              email: Yup.string()
                .email('ელ-ფოსტა არასწორი ფრმატისაა')
                .required('ელ-ფოსტა აუცილებელია'),
              address: Yup.string()
                .min(3, 'მისამართი უნდა იყოს მინიმუმ 5 სიმბოლო')
                .required('მისამართი აუცილებელია'),
              categoryTypes: Yup.array()
                .min(1, 'აირჩით მიმიმუმ ერთი მნიშვნელობა')
                .max(3, 'მაქსიმუმ 3 მნიშვნეობა'),
              kitchenTypes: Yup.array()
                .min(1, 'აირჩით მიმიმუმ ერთი მნიშვნელობა')
                .max(3, 'მაქსიმუმ 3 მნიშვნეობა'),
              spaceTypes: Yup.array().min(0, 'აირჩით მიმიმუმ ერთი მნიშვნელობა'),
              // coords: Yup.object().required('გთხოვთ რუკაზე მონიშნოთ ობიექტის მდებარეობა'),
              coords: Yup.object().shape({
                lat: Yup.number()
                  .min(-90, 'შუა შემთხვევით -90-დან აქვს')
                  .max(90, 'შუა შემთხვევით 90-დან აქვს')
                  .required('გთხოვთ მიუთითოთ გრძედი'),
                lng: Yup.number()
                  .min(-180, 'შუა შემთხვევით -180-დან აქვს')
                  .max(180, 'შუა შემთხვევით 180-დან აქვს')
                  .required('გთხოვთ მიუთითოთ გრძედი'),
              }),
            })}
            render={({ errors, touched, resetForm, chan, setFieldValue }) => {
              console.log(errors, touched, 'flaaa');
              return (
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
                  <PageName pageName={slag} setPageName={setSlag} />

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
                    <ErrorMessage name="description" component="div" className="invalid-feedback" />
                  </FormGroup>

                  <FormGroup>
                    <Col sm="12">
                      <Label htmlFor="phone">ტელეფონი</Label>

                      <Field
                        className={`form-control ${
                          errors.phone && touched.phone ? ' is-invalid' : ''
                        }`}
                        name="phone"
                        type="tel"
                        placeholder="მაგ: 555234234"
                      />
                      <ErrorMessage name="phone" component="div" className="invalid-feedback" />
                    </Col>
                  </FormGroup>

                  <FormGroup>
                    <Col sm="12">
                      <Label htmlFor="phone2">ტელეფონი2 (არასავალდებულო)</Label>

                      <Field
                        className="form-control"
                        name="phone2"
                        type="tel"
                        placeholder="მაგ: 555234234"
                      />
                      <ErrorMessage name="phone2" component="div" className="invalid-feedback" />
                    </Col>
                  </FormGroup>

                  <FormGroup>
                    <Label htmlFor="email">
                      ელ-ფოსტა{' '}
                      <span className="help"> მაგალითად: &quot;example@gmail.com&quot;</span>
                    </Label>
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
                    <Label htmlFor="facebook">ფესიბუქ გვერდი (არსებობის შემთხვევაში)</Label>
                    <Field
                      name="facebook"
                      type="text"
                      className={`form-control${
                        errors.facebook && touched.facebook ? ' is-invalid' : ''
                      }`}
                    />
                    <ErrorMessage name="facebook" component="div" className="invalid-feedback" />
                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor="facebook"> ინსტაგრამის გვერდი (არსებობის შემთხვევაში)</Label>
                    <Field
                      name="instagram"
                      type="text"
                      className={`form-control${
                        errors.instagram && touched.instagram ? ' is-invalid' : ''
                      }`}
                    />
                    <ErrorMessage name="instagram" component="div" className="invalid-feedback" />
                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor="facebook">
                      დაწესებულების ვებგვერდი (არსებობის შემთხვევაში)
                    </Label>
                    <Field
                      name="webSite"
                      type="text"
                      className={`form-control${
                        errors.webSite && touched.webSite ? ' is-invalid' : ''
                      }`}
                    />
                    <ErrorMessage name="webSite" component="div" className="invalid-feedback" />
                  </FormGroup>

                  <Field
                    name="categoryTypes"
                    label2="რესტორნის ტიპი"
                    component={MultiSelect}
                    options={categoryTypes}
                    maxSelectable={3}
                  />

                  <Field
                    name="kitchenTypes"
                    label2="სამზარეულოს ტიპი"
                    // label="რესტორნის ტიპი"
                    component={MultiSelect}
                    options={kitchenTypes}
                    maxSelectable={3}
                  />

                  <Field
                    name="spaceTypes"
                    label2="დამატებითი მახასიათბლები"
                    // label="რესტორნის ტიპი"
                    component={MultiSelect}
                    options={spTypes}
                    maxSelectable={7}
                  />

                  {/* <MultiSelect items={kitchenTypes} /> */}

                  <FormGroup>
                    <Label sm="2">სამუშაო საათები</Label>
                    <Row>
                      <Col sm="4">
                        <Field
                          name="openAt"
                          type="text"
                          placeholder="9:00"
                          className={`form-control${
                            errors.openAt && touched.openAt ? ' is-invalid' : ''
                          }`}
                        />
                        <ErrorMessage name="openAt" component="div" className="invalid-feedback" />
                      </Col>
                      <>--</>
                      <Col sm="4">
                        <Field
                          name="closeAt"
                          type="text"
                          placeholder="22:00"
                          className={`form-control${
                            errors.closeAt && touched.closeAt ? ' is-invalid' : ''
                          }`}
                        />
                        მ
                        <ErrorMessage name="closeAt" component="div" className="invalid-feedback" />
                      </Col>
                    </Row>
                  </FormGroup>
                  {/* 
                <FormGroup check>
                  <Input type="checkbox" id="check1" />
                  <Label check className="form-label">
                    ცოცხალი მუსიკა
                  </Label>
                </FormGroup>
                <FormGroup check>
                  <Input type="checkbox" id="check1" />
                  <Label check className="form-label">
                    ტაში-ტუშები
                  </Label>
                </FormGroup>

                <FormGroup>
                  <Row>
                    <Col md="4">
                      <FormGroup check>
                        <Input type="checkbox" id="check1" />
                        <Label check className="form-label">
                          სველი სალფეტკი
                        </Label>
                      </FormGroup>
                      <FormGroup check>
                        <Input type="checkbox" id="check2" />
                        <Label check className="form-label">
                          სველი სალფეტკი
                        </Label>
                      </FormGroup>
                      <FormGroup check>
                        <Input type="checkbox" id="check3" />
                        <Label check className="form-label">
                          სველი სალფეტკი
                        </Label>
                      </FormGroup>
                    </Col>
                    <Col md="4">
                      <FormGroup>
                        <FormGroup check>
                          <Input type="radio" name="radio1" />
                          <Label check className="form-label">
                            დანა
                          </Label>
                        </FormGroup>
                        <FormGroup check>
                          <Input type="radio" name="radio1" />
                          <Label check className="form-label">
                            ჩანგალი
                          </Label>
                        </FormGroup>
                        <FormGroup check>
                          <Input type="radio" name="radio1" />
                          <Label check className="form-label">
                            ჩხირები
                          </Label>
                        </FormGroup>
                      </FormGroup>
                    </Col>
                  </Row>
                </FormGroup> */}
                  <ImageUploader images={images} setImages={setImages} />

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

                  {/* <ReactGoogleMap
                  coords={coords}
                  setCoords={(cord) => {
                    console.log(cord);
                    setCoords(cord);
                  }}
                /> */}

                  <Field name="coords" component={ReactGoogleMap} />
                  <div
                    style={{
                      color: 'red',
                      textAlign: 'right',
                    }}
                    className="   mt-5"
                  >
                    {Object.keys(errors).length ? <div> შეემოწმე სავალდებულო ველები</div> : null}
                  </div>

                  <CardBody className="border-top mx-0 px-0 gap-2 mt-1  d-flex flex-column flex-md-row  justify-content-between align-items-center">
                    <div className="createRestaurant_buttons">
                      <Button disabled={load} type="submit" className="btn mx-3  btn-success">
                        {load ? 'მიმდინარეობს სურათების ოპტიმიზაცია...' : 'შენახვა'}
                      </Button>

                      <Button
                        onClick={() => {
                          resetForm();
                        }}
                        type="button"
                        className="btn btn-dark ml-2"
                      >
                        ცვლილების გაუქმება
                      </Button>
                    </div>

                    <div>
                      {translateText && (
                        <Button onClick={() => setModal(true)}>
                          დაწესებულების ინფორმაცია უცხო ენაზე
                        </Button>
                      )}{' '}
                    </div>
                  </CardBody>
                </Form>
              );
            }}
          />
        </ComponentCard>
      </Col>
    </div>
  );
};

export const restaurantProfileLoader = async () => {
  console.log('callformrestaurantProfileLoader');
  try {
    const res = await Axios.get(Endpoints.profile.get(), {
      params: { locale: 'ka' },
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });

    console.log(res, 'restaurantProfileLoader');
    return res.data;
  } catch (err) {
    console.log(err, 'restaurantProfileLoader');

    // console.log(err);
    return { msg: 'error' };
  }
};

export default RestaurantInfo;
