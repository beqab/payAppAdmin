import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
import { Badge, Button, Input } from 'reactstrap';
import Axios from 'axios';
import Moment from 'react-moment';
import { editBookings, isEdit, UpdateContact } from '../../store/apps/contacts/BookingsSlice';
// import Axios from '../../services/Axios';
import Endpoints from '../../services/endpints';
import BookingConfirmation from './BookingConfimationModal';
import { Tum } from './BookingListItem';

const BookingDetails = () => {
  const bookingDetail = useSelector((state) =>
    state.bookingsReducer.bookings.find((item) => item._id === state.bookingsReducer.selectedId),
  );
  const [load, setLoad] = useState(false);
  const [openConfirmation, setOpenConfirmation] = useState(false);
  // const editContact = useSelector((state) => state.bookingsReducer.editContact);
  const dispatch = useDispatch();
  const changeBookingStatus = async (status) => {
    setLoad(true);
    try {
      const res = await Axios.post(
        Endpoints.bookings.changeStatus,
        {},
        {
          params: {
            status,
            reservationId: bookingDetail?._id,
          },
        },
      );
      console.log(res.data, 'edittt');

      dispatch(editBookings(res.data));

      if (status === 1) {
        toast.success('მომხმარებელს გაეგზავნა შეტყობინება ჯავშნის მიღების შესახებ', {});
      } else if (status === 3) {
        toast.success('მომხმარებელს გაეგზავნა შეტყობინება ჯავშნის უარყოფის შესახებ', {});
      } else {
        toast.success('ოპერაცია წარმატებით დასრულდა', {});
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoad(false);
    }
  };

  return (
    <>
      {bookingDetail ? (
        <div>
          <BookingConfirmation
            openConfirmation={openConfirmation}
            setOpenConfirmation={setOpenConfirmation}
            modalTitle="ჯავშნის უარყოფა"
            confirmCallback={() => {
              changeBookingStatus(3);
              setOpenConfirmation(false);
            }}
          >
            <h4>დარწმუნებული ხარ, რომ გსურს ჯავშნის უარყოფა?</h4>
          </BookingConfirmation>
          {/***********Contact Topbar**************/}
          <div className="d-flex align-items-center p-3 border-bottom">
            <div className="">
              {bookingDetail.userPicture ? (
                <img
                  src={bookingDetail.userPicture}
                  alt="user"
                  referrerPolicy="no-referrer"
                  className="rounded-circle"
                  width="46"
                />
              ) : (
                <Tum>
                  <span>{bookingDetail.userName ? bookingDetail.userName.split('')[0] : 'A'}</span>
                </Tum>
              )}
            </div>
            <div className="mx-2">
              <h5 className="mb-0">
                {bookingDetail.userName} {bookingDetail.userLastName}
              </h5>
              მომხარებლის კოდი:{' '}
              <small>{!bookingDetail.userCode ? '' : bookingDetail.userCode}</small>
            </div>
          </div>

          {/***********Contact Edit box**************/}
          <div className="p-4">
            <>
              <div className="pb-4 border-bottom">
                {bookingDetail.status === 0 ? (
                  <div className=" mb-1">
                    <i style={{ color: 'green' }} className="bi bi-bookmark-star mx-2 pt-1" />
                    ელოდება პასუხს
                  </div>
                ) : bookingDetail.status === 1 ? (
                  <div className=" mb-1">
                    <i style={{ color: 'purple' }} className="bi bi-bookmark-star mx-2 pt-1" />
                    მიმდინარე
                  </div>
                ) : bookingDetail.status === 2 ? (
                  <div className=" mb-1">
                    <i style={{ color: 'orange' }} className="bi bi-bookmark-star mx-2 pt-1" />
                    დასრულებული
                  </div>
                ) : bookingDetail.status === 3 ? (
                  <div className=" mb-1">
                    <i style={{ color: 'red' }} className="bi bi-bookmark-star mx-2 pt-1" />
                    უარყოფილი
                  </div>
                ) : null}
                <h5 className="mb-0 font-16 font-medium">
                  {bookingDetail.type === 1
                    ? 'ჯავშნის მოთხოვნა'
                    : 'სპეციალური შეთავაზების დაჯავშნის მოთხოვნა'}
                </h5>
              </div>

              <div className=" mt-2">
                სასურველი დრო: <Moment date={bookingDetail.date} format="MM/DD" />
              </div>
              <div className=" mt-2">რაოდენობა: ჯავშანი {bookingDetail.persons} ადამიანზე </div>
              <div className=" mt-2">
                <span className=" d-inline-block mr-3"> შენიშვნა: </span>{' '}
                <span>
                  {!bookingDetail.note
                    ? 'მომხმარებელს არ დაუტვბია დამატებითი შენიშვნა'
                    : bookingDetail.note}{' '}
                </span>
              </div>
              <div className=" mt-2">
                {' '}
                <span>ტელეფონი: </span> {bookingDetail.phone[0]}
              </div>
              <div className=" mt-5">
                {bookingDetail.status === 0 ? (
                  <>
                    <Button
                      disabled={load}
                      color="primary"
                      outline
                      onClick={() => changeBookingStatus(1)}
                    >
                      ჯავშნის მიღება
                    </Button>
                    <Button
                      disabled={load}
                      color="danger"
                      outline
                      onClick={() => setOpenConfirmation(true)}
                    >
                      ჯავშნის უარყოფა
                    </Button>
                  </>
                ) : bookingDetail.status === 1 ? (
                  <>
                    <Button color="primary" outline onClick={() => changeBookingStatus(2)}>
                      ვიზიტის დასრულება
                    </Button>
                  </>
                ) : bookingDetail.status === 2 ? (
                  <>
                    <Badge color="success">ვიზიტი დასრულებულია</Badge>
                  </>
                ) : bookingDetail.status === 2 ? (
                  <>
                    <Badge color="warning">მოთხოვნა უარყოფილია დაწესებულების მხრიდან</Badge>
                  </>
                ) : null}
              </div>
            </>
          </div>
        </div>
      ) : (
        <div className=" p-4 text-center">აირჩიეთ შემოსული ჯავშანი</div>
      )}
    </>
  );
};

export default BookingDetails;
