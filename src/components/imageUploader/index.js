import React from 'react';
import ImageUploading from 'react-images-uploading';
import { Label } from 'reactstrap';
import styled from 'styled-components';
import * as Icon from 'react-feather';
import { ToastContainer, toast } from 'react-toastify';

const ImageUploaderWrapper = styled.div``;

const ImgUploaderBtn = styled.button`
  border: 1px solid var(--bs-border-color);
  padding: 30px;
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
`;

const ImageUploader = ({ images, setImages, maxImgs = 12, label = 'ატვირთე სურათები' }) => {
  // const [images, setImages] = React.useState([]);
  const maxNumber = 69;
  const onChange = (imageList, addUpdateIndex, ...rest) => {
    if (imageList.length > maxImgs) {
      toast.error(`შეგიძლიათ ატვირთოთ მაქსიმუმ ${maxImgs} სურათი`, {});
      return;
    }
    // data for submit
    console.log(imageList, addUpdateIndex, rest, 'dddddddddddddd');
    setImages(imageList);
  };

  return (
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
            <div className="upload__image-wrapper">
              <ImgUploaderBtn
                className="imageUploaderBtn"
                type="button"
                style={isDragging ? { color: 'red' } : null}
                onClick={onImageUpload}
                {...dragProps}
              >
                <i className="me-2 bi-images" />
                <div>დააკლიკე ან პირდაპირ ჩააგდე აქ</div>
              </ImgUploaderBtn>

              {imageList.length ? (
                <>
                  {maxImgs > 1 && (
                    <h4 className="text-center pt-4">
                      გაითვალისწინეთ, ატვირთული სურათები გამოჩნდება იგივე თანმიმდევრობით{' '}
                    </h4>
                  )}

                  <div className=" d-flex  flex-wrap gap pt-3   gap-3">
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
            </div>
          )}
        </ImageUploading>
      </div>
    </div>
  );
};

export default ImageUploader;
