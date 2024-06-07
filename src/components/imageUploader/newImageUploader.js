import React, { useEffect } from 'react';
import ImageUploading from 'react-images-uploading';
import { Label } from 'reactstrap';
import styled from 'styled-components';
import * as Icon from 'react-feather';
import { ToastContainer, toast } from 'react-toastify';
import Endpoints from '../../services/endpints';
import Axios from '../../services/Axios';
import convertUrlsToFiles from '../../utils/stringUrlToFile';

const ImageUploaderWrapper = styled.div`
  @media screen and (max-width: 769px) {
    .upload__image-wrapper {
      /* flex-direction: column; */
      /* justify-content: center; */
      /* align-items: center; */
      flex-wrap: wrap;
    }
    .image-item {
      margin-top: 8px;
      margin-right: 8px;
      max-width: 219px !important;
      img {
        max-width: 100%;
      }
    }
  }
`;

const ImgUploaderBtn = styled.button`
  border: 1px solid var(--bs-border-color);
  padding: 10px;
  height: 200px;
  cursor: pointer;
  &:hover {
    i {
      transform: scale(1.2);
    }
  }
  i {
    display: inline-block;
    transition: 0.3s;
    font-size: 50px;
    color: var(--bs-border-color);
  }
  div {
    font-size: 18px;
    padding-top: 10px;
  }
`;

const UploadedImgWrapper = styled.div`
  border: 1px solid var(--bs-border-color);
  display: flex;
  /* flex-direction: column; */
  justify-content: space-between;
  position: relative;
  img {
    width: 100%;

    width: 230px;
    height: 200px;
    object-fit: cover;
  }
  &:hover {
    .image-item__btn-wrapper {
      opacity: 1;
    }
  }

  .image-item__btn-wrapper {
    opacity: 0;
    position: absolute;
    width: 100%;
    left: 0;
    top: 0;
    display: flex;
    justify-content: space-between;
    padding: 8px;
  }
  button {
    border: 1px solid var(--bs-border-color);
    border-radius: 12px;
  }

  @media screen and (max-width: 769px) {
    .upload__image-wrapper {
      flex-direction: column;
      justify-content: center;
      align-items: center;
      background-color: red !important;
    }
  }
`;

const ImageUploader = ({
  label = 'upload image',
  maxImgs = 12,
  field,
  form: { touched, values, errors, setFieldTouched, validateField, setFieldValue, handleBlur },
}) => {
  const [images, setImages] = React.useState([]);
  const maxNumber = 69;

  const uploadImage = async (image) => {
    console.log(image);
    const formData = new FormData();
    // formData.append('file', image, image.name);
    formData.append('image', image);
    return Axios.post(Endpoints.uploadImage, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  };

  useEffect(() => {
    if (field.value) {
      console.log(field.value, 'field.value');
      const getImgs = async () => {
        // const imgs = await convertUrlsToFiles([field.value]);
        // setImages(imgs);
      };
      getImgs();
    }
  }, [field.value]);

  const onChange = async (imageList, addUpdateIndex, ...rest) => {
    if (imageList.length > maxImgs) {
      toast.error(`you can upload ${maxImgs} image`, {});
      return;
    }
    // data for submit
    console.log(imageList, addUpdateIndex, rest, 'dddddddddddddd');
    setImages(imageList);

    if (imageList.length) {
      try {
        const res = await uploadImage(imageList[0].file);
        console.log(res);
        setFieldValue(field.name, res.data.fileName);
      } catch (err) {
        toast.error('image upload error', {});
      }
    } else {
      setFieldValue(field.name, undefined);
    }
  };

  return (
    <ImageUploaderWrapper>
      <div className="App pb-3 border-bottom  mb-4">
        <ToastContainer />
        <Label>{label}</Label>
        <div className="test">
          <ImageUploading
            multiple
            value={images}
            onChange={onChange}
            maxNumber={maxNumber}
            dataURLKey="data_url"
            acceptType={['jpg', 'png', 'WEBP', 'webp']}
          >
            {({
              imageList,
              onImageUpload,
              onImageRemoveAll,
              onImageUpdate,
              onImageRemove,
              isDragging,
              dragProps,
            }) => (
              // write your building UI
              <div className="upload__image-wrapper d-flex align-items-center">
                <ImgUploaderBtn
                  className="imageUploaderBtn"
                  type="button"
                  style={isDragging ? { color: 'red' } : null}
                  onClick={onImageUpload}
                  {...dragProps}
                >
                  <i className="me-2 bi-images" />
                  <div>Click here or drag image</div>
                </ImgUploaderBtn>

                {imageList.length ? (
                  <>
                    {/* {maxImgs > 1 && (
                    <h4 className="text-center pt-4">
                      გაითვალისწინეთ, ატვირთული სურათები გამოჩნდება იგივე თანმიმდევრობით{' '}
                    </h4>
                  )} */}

                    <div className=" d-flex  flex-wrap flex-wrap gap  mx-3   gap-3">
                      {imageList.map((image, index) => (
                        <UploadedImgWrapper
                          key={index}
                          className="image-item flex flex-row justify-content-between"
                        >
                          <img src={image.data_url} alt="" width="100" />
                          <div className="image-item__btn-wrapper">
                            <button type="button" onClick={() => onImageUpdate(index)}>
                              <Icon.Upload size={20} /> Update
                            </button>
                            <button type="button" onClick={() => onImageRemove(index)}>
                              <i className="bi bi-trash ms-auto " /> Remove
                            </button>
                          </div>
                        </UploadedImgWrapper>
                      ))}
                    </div>
                  </>
                ) : null}
                {!imageList.length && field.value ? (
                  <UploadedImgWrapper className="image-item flex flex-row justify-content-between">
                    <img src={field.value} alt="" width="100" />
                    <div className="image-item__btn-wrapper">
                      <button type="button" onClick={() => onImageUpdate()}>
                        <Icon.Upload size={20} /> Update
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setFieldValue(field.name, undefined);
                        }}
                      >
                        <i className="bi bi-trash ms-auto " /> Remove
                      </button>
                    </div>
                  </UploadedImgWrapper>
                ) : null}
              </div>
            )}
          </ImageUploading>
        </div>
      </div>
    </ImageUploaderWrapper>
  );
};

export default ImageUploader;
