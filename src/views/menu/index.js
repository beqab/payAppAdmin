import { serialize } from 'object-to-formdata';
import Axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import React, { useState, useEffect } from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import { Button, Col } from 'reactstrap';
import ComponentCard from '../../components/ComponentCard';
import ImageUploader from '../../components/imageUploader';
import convertUrlsToFiles from '../../utils/stringUrlToFile';
import getOptimizedImgs from '../../utils/imageOptimizer';
import Endpoints from '../../services/endpints';

function Menu() {
  const [images, setImages] = useState([]);
  const profileData = useLoaderData();
  const [load, setLoad] = useState(false);

  useEffect(() => {
    if (profileData.menuImgs && profileData.menuImgs.length) {
      const getImgs = async () => {
        const imgs = await convertUrlsToFiles(profileData.menuImgs);
        console.log(imgs, 'ddddddddddd');
        setImages(imgs);
      };
      getImgs();
    }

    console.log(profileData, 'profileDataprofileDataprofileData');
  }, [profileData]);

  const handleSave = async () => {
    setLoad(true);
    const imgsFormData = new FormData();

    const regularImgs = await getOptimizedImgs(images, 'menuImg', 1460, 800, 1260, 80);
    [...regularImgs].forEach((img) => {
      imgsFormData.append('image', img);
    });

    try {
      const formData = serialize({ t: 3 }, {}, imgsFormData);
      setLoad(true);

      const res = await Axios.post(Endpoints.uploadMenuImgs, formData, {
        params: {
          locale: 'ka',
        },
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      toast.success('წარმატებით შეინახა', {});

      // console.log(res);
    } catch (err) {
      console.log(err, 'err.responseerr.response');
      if (err.response?.data?.msg) {
        toast.error(err.response?.data?.msg, {});
      } else {
        toast.error('server error', {});
      }
    } finally {
      setLoad(false);
    }
  };

  return (
    <Col md="12">
      <ToastContainer />
      <ComponentCard title="დაწესებულების მენიუ">
        {!profileData ? (
          'იტვირთება'
        ) : profileData?.msg ? (
          <div
            style={{
              textAlign: 'center',
              marginTop: ' 70px',
            }}
            className=" text-center"
          >
            <p>მენიუს დასამატებლად აუცილებელია დაწესებულების პროფილის შექმნა</p>

            <div>
              <Link to="/apps/about">
                <Button>პროფილის შექმნა</Button>
              </Link>
            </div>
          </div>
        ) : (
          <>
            {' '}
            <ImageUploader
              label="ატვირთე მენიუს ფოტოები (Png, jpg, webp)"
              images={images}
              setImages={setImages}
            />
            <div>
              <Button disabled={load} onClick={handleSave} type="submit">
                {load ? 'მიმდინარეობს სურათების ოპტიმიზაცია...' : 'შენახვა'}
              </Button>
            </div>{' '}
          </>
        )}
      </ComponentCard>
    </Col>
  );
}

export default Menu;
