import React from 'react';
import { Form, Input, Button } from 'reactstrap';
import { useSelector, useDispatch } from 'react-redux';
import { SearchBooking } from '../../store/apps/contacts/BookingsSlice';

const BookingSearch = () => {
  const searchTerm = useSelector((state) => state.bookingsReducer.bookingSearch);

  const dispatch = useDispatch();

  return (
    <div onClick={(e) => e.stopPropagation()} className="p-3  border-bottom d-flex">
      <Button className="d-xs-block btn-close d-xl-none me-2" />
      <Form className="flex-grow-1">
        <Input
          className="form-control mb-2"
          id="searchUser"
          name="searchUser"
          type="text"
          onChange={(e) => dispatch(SearchBooking(e.target.value))}
          value={searchTerm}
          placeholder="მომხმარებლის კოდი"
        />
      </Form>
    </div>
  );
};

export default BookingSearch;
