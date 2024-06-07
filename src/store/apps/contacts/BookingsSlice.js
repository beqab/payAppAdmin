// import axios from 'axios';
import { createSlice } from '@reduxjs/toolkit';
import Axios from '../../../services/Axios';
import Endpoints from '../../../services/endpints';

const API_URL = '/api/data/contacts/ContactsData';

const initialState = {
  contacts: [],
  bookings: [],
  selectedId: 1,
  bookingSearch: '',
  editContact: false,
  currentFilter: 'show_all',
};

export const BookingsSlice = createSlice({
  name: 'bookings',
  initialState,
  reducers: {
    getBookings: (state, action) => {
      state.bookings = action.payload;
      state.contacts = action.payload;
    },
    editBookings: (state, action) => {
      // console.log(action.payload, 'action.payloadaction.payload', state);

      const index = state.bookings.findIndex((el) => el._id === action.payload?._id);

      // If the booking is found, update it
      if (index !== -1) {
        state.bookings[index].status = action.payload.status;
      }
    },
    SearchBooking: (state, action) => {
      state.bookingSearch = action.payload;
    },
    SelectBooking: (state, action) => {
      state.selectedId = action.payload;
    },
    DeleteBooking: (state, action) => {
      const index = state.contacts.findIndex((contact) => contact.id === action.payload);
      state.contacts.splice(index, 1);
    },

    isEdit: (state) => {
      state.editContact = !state.editContact;
    },
    setVisibilityFilter: (state, action) => {
      state.currentFilter = action.payload;
    },
    UpdateContact: {
      reducer: (state, action) => {
        state.contacts = state.contacts.map((contact) =>
          contact.id === action.payload.id
            ? { ...contact, [action.payload.field]: action.payload.value }
            : contact,
        );
      },
      prepare: (id, field, value) => {
        return {
          payload: { id, field, value },
        };
      },
    },
    // addContact: {
    //   reducer: (state, action) => {
    //     state.contacts.push(action.payload);
    //   },
    //   prepare: (
    //     id,
    //     firstname,
    //     lastname,
    //     image,
    //     department,
    //     company,
    //     phone,
    //     email,
    //     address,
    //     notes,
    //   ) => {
    //     return {
    //       payload: {
    //         id,
    //         firstname,
    //         lastname,
    //         image,
    //         department,
    //         company,
    //         phone,
    //         email,
    //         address,
    //         notes,
    //         frequentlycontacted: false,
    //         starred: false,
    //         deleted: false,
    //       },
    //     };
    //   },
    // },
  },
});

export const {
  getBookings,
  SearchBooking,
  isEdit,
  SelectBooking,
  DeleteBooking,
  editBookings,
  UpdateContact,
  // addContact,
  setVisibilityFilter,
} = BookingsSlice.actions;

// export const fetchBookings = () => async (dispatch) => {
//   try {
//     const response = await axios.get(`${API_URL}`);
//     dispatch(getBookings(response.data));
//   } catch (err) {
//     throw new Error(err);
//   }
// };

export const fetchBookings = () => async (dispatch) => {
  // dispatch(getBookings(data));
  try {
    const response = await Axios.get(Endpoints.bookings.getAll);
    // dispatch(getBookings(response.data));
    dispatch(getBookings(response.data.data));
  } catch (err) {
    console.log(err, 'errr');
    // throw new Error(err);
  }
};
export default BookingsSlice.reducer;
