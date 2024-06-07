import React, { useEffect } from 'react';
import { Nav } from 'reactstrap';
import { useSelector, useDispatch } from 'react-redux';
import {
  SelectBooking,
  fetchBookings,
  DeleteBooking,
} from '../../store/apps/contacts/BookingsSlice';
import BookingListItem from './BookingListItem';

const BookingsList = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    console.log(',,,,,');
    dispatch(fetchBookings());
  }, []);

  const getVisibleBookings = (bookings, filter, bookingSearch) => {
    console.log(bookings, 'vvvvvvvv');
    switch (filter) {
      case 'show_all':
        return bookings.filter((c) => {
          console.log(c.userCode?.toString(), 'ccc', bookingSearch);
          return c.userCode?.toString().includes(bookingSearch);
        });

      case 'status-0':
        return bookings.filter(
          (c) => c.status === 0 && c.userCode?.toString().includes(bookingSearch),
        );

      case 'status-1':
        return bookings.filter(
          (c) => c.status === 1 && c.userCode?.toString().includes(bookingSearch),
        );

      case 'status-2':
        return bookings.filter(
          (c) => c.status === 2 && c.userCode?.toString().includes(bookingSearch),
        );

      case 'status-3':
        return bookings.filter(
          (c) => c.status === 3 && c.userCode?.toString().includes(bookingSearch),
        );

      case 'type-1':
        return bookings.filter(
          (c) => c.type === 1 && c.userCode?.toString().includes(bookingSearch),
        );

      case 'type-2':
        return bookings.filter(
          (c) => c.type === 2 && c.userCode?.toString().includes(bookingSearch),
        );

      default:
        throw new Error(`Unknown filter: ${filter}`);
    }
  };
  const bookings = useSelector((state) =>
    getVisibleBookings(
      state.bookingsReducer.bookings,
      state.bookingsReducer.currentFilter,
      state.bookingsReducer.bookingSearch,
    ),
  );

  const active = useSelector((state) => state.bookingsReducer.selectedId);
  const currentFilter = useSelector((state) => state.bookingsReducer.currentFilter);
  console.log(active);
  return (
    <Nav>
      {bookings.map((booking) => (
        <BookingListItem
          key={booking.id}
          active={active}
          {...booking}
          onBookingClick={() => dispatch(SelectBooking(booking._id))}
          onDeleteClick={() => dispatch(DeleteBooking(booking._id))}
        />
      ))}
      <div className=" p-3">
        {!bookings.length
          ? currentFilter === 'type-1'
            ? ' ჯავშნების მთხოვნა არ მოიძებნა'
            : currentFilter === 'type-2'
            ? 'სპეციალური შეთავაზების ჯავშნები არ მოიძებნა'
            : 'ჯავშნები არ მოიძებნა'
          : null}
      </div>
    </Nav>
  );
};

export default BookingsList;
