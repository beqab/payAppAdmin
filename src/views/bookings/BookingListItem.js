import React from 'react';
import styled from 'styled-components';
import Moment from 'react-moment';
import classNames from 'classnames';
import { useDispatch } from 'react-redux';
import { NavItem } from 'reactstrap';
import PropTypes from 'prop-types';
import { ToggleInnerRightPart } from '../../store/customizer/CustomizerSlice';

export const Tum = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50px;
  background-color: #78909c;
  display: flex;
  justify-content: center;
  align-items: center;
  span {
    font-size: 23px;
    font-weight: bold;
    color: #fff;
  }
`;

const BookingListItem = ({
  onBookingClick,
  data,
  onDeleteClick,
  _id,
  userName,
  userLastName,
  userPicture,
  department,
  userCode,
  type,
  status,
  active,
}) => {
  const dispatch = useDispatch();
  return (
    <NavItem
      onClick={onBookingClick}
      className={classNames(`w-100 bookings p-3 py-2 mb-1 bookings_borderBottom cursor-pointer `, {
        // 'bg-offer': type === 2,
        'bg-light': active === _id,
      })}
    >
      <div className=" font-sm pb-2 ">
        {status === 0 ? (
          <div>
            <i style={{ color: 'green' }} className="bi bi-bookmark-star mx-2 mt-1" />
            ელოდება პასუხს
          </div>
        ) : status === 1 ? (
          <div>
            <i style={{ color: 'purple' }} className="bi bi-bookmark-star mx-2 mt-1" />
            მიმდინარე
          </div>
        ) : status === 2 ? (
          <div>
            <i style={{ color: 'orange' }} className="bi bi-bookmark-star mx-2 mt-1" />
            დასრულებული
          </div>
        ) : status === 3 ? (
          <div>
            <i style={{ color: 'red' }} className="bi bi-bookmark-star mx-2 mt-1" />
            უარყოფილი
          </div>
        ) : null}
        {type === 2 ? (
          <div>
            <i className="bi bi-star-fill mx-2" style={{ color: true ? '#FFC107' : '#495057' }} />
            სპეციალური შეთავაზება{' '}
          </div>
        ) : (
          <div className=" d-flex items-center">
            <i className="bi bi-bezier  mt-1 mx-2" /> <span className=" "> ჯავშნის მოთხოვნა</span>
          </div>
        )}
      </div>
      <div className=" " onClick={() => dispatch(ToggleInnerRightPart())}>
        <div className="d-flex   align-items-center">
          <div>
            {userPicture ? (
              <img
                src={userPicture}
                alt="user"
                referrerPolicy="no-referrer"
                className="rounded-circle"
                width="50"
              />
            ) : (
              <Tum>
                <span>{userName ? userName.split('')[0] : 'A'}</span>
              </Tum>
            )}
          </div>
          <div className="mx-2 flex-grow-1">
            {/* <h5 className="mb-0 text-truncate" style={{ width: '140px' }}> */}
            <small> სახელი: {userName}</small>ვ
            <br />
            <small>კოდი: {userCode}</small>
            <br />
            {/* </h5> */}
            {/* <small>{department}</small> */}
            <small>
              დრო: <Moment date={data} format="MM/DD" />
            </small>
          </div>
          <div className="d-flex flex-shrink-0">
            {/* <i
            className="bi bi-star-fill mx-2"
            onClick={onStarredClick}
            style={{ color: starred ? '#FFC107' : '#495057' }}
          /> */}
            {/* <i onClick={onDeleteClick} className="bi bi-trash" /> */}
          </div>
        </div>
      </div>
    </NavItem>
  );
};

BookingListItem.propTypes = {
  userName: PropTypes.string,
  userLastName: PropTypes.string,
  userPicture: PropTypes.string,
  userCode: PropTypes.string,
  type: PropTypes.number,
  status: PropTypes.number,
  _id: PropTypes.number,
  active: PropTypes.any,
  data: PropTypes.any,
  onDeleteClick: PropTypes.func,
  onBookingClick: PropTypes.func,
};

export default BookingListItem;
