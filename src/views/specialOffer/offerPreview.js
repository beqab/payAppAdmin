import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button } from 'reactstrap';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import Axios from 'axios';
import {
  DeleteSpecialOffer,
  addSpecialOffer,
  setDetailType,
} from '../../store/apps/SpecialOffers/SpecialOffersSlice';
import Endpoints from '../../services/endpints';
import OfferDeleteConfirmation from './offerDeleteConfirmation';

const OfferPreviewWrapper = styled.div`
  h3 {
    padding-top: 13px;
  }
  img {
    object-fit: cover;
    border: 1px solid grey;
  }
`;
const OfferPreview = ({ images, title, text, setEdit, status, _id }) => {
  const [load, setLoad] = useState(false);
  const [openConfirmation, setOpenConfirmation] = useState(false);

  const dispatch = useDispatch();

  const changeStatus = async () => {
    setLoad(true);
    try {
      const response = await Axios.post(
        Endpoints.specialOffer.changeStatus(),
        {},
        {
          params: {
            offerId: _id,
            status: status === 1 ? 0 : 1,
          },
        },
      );

      dispatch(addSpecialOffer(response.data));
    } catch (err) {
      console.log(err);
    } finally {
      setLoad(false);
    }
  };

  const deleteOffer = async () => {
    setLoad(true);
    try {
      const response = await Axios.post(
        Endpoints.specialOffer.delete(),
        {},

        {
          params: {
            offerId: _id,
          },
        },
      );

      dispatch(DeleteSpecialOffer(_id));
      toast.success('შეთავაზება წარმატებით წაიშალა', {});
    } catch (err) {
      console.log(err);
    } finally {
      setLoad(false);
    }
  };
  return (
    <OfferPreviewWrapper className=" p-4">
      <OfferDeleteConfirmation
        openConfirmation={openConfirmation}
        setOpenConfirmation={setOpenConfirmation}
        modalTitle="შეთავაზების წაშლა"
        confirmCallback={() => {
          deleteOffer();
          setOpenConfirmation(false);
        }}
      >
        <h4>დარწმუნებული ხარ, რომ გსურს შეთავაზების წაშლა?</h4>
      </OfferDeleteConfirmation>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          width: '100%',
          alignItems: 'center',
          textAlign: 'center',
        }}
      >
        <div className="flex">
          <img src={images[0]} alt="" width={260} height={220} />
          <h3>{title}</h3>
        </div>
        <div className=" mt-3">
          <Button
            disabled={load}
            onClick={() => setOpenConfirmation(true)}
            className=" bg-danger mx-2 mb-2"
          >
            წაშლა
          </Button>
          <Button
            disabled={load}
            onClick={changeStatus}
            className={status === 1 ? 'bg-warning mx-2 mb-2' : 'bg-success mx-2 mb-2'}
          >
            {status === 1 ? 'დაპაუზება' : 'აქტვაცია'}
          </Button>
          <Button onClick={() => dispatch(setDetailType('edit'))} className=" mx-2 mb-2 ">
            რეაქტირება
          </Button>
        </div>
      </div>
    </OfferPreviewWrapper>
  );
};

export default OfferPreview;
