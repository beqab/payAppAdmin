import Axios from 'axios';
import { createSlice } from '@reduxjs/toolkit';
// import Axios from '../../../services/Axios';
import Endpoints from '../../../services/endpints';

const API_URL = '/api/data/notes/NotesData';

const initialState = {
  SpecialOffers: [],
  SpecialOffersContent: '1',
  SpecialOfferSearch: '',
  loading: false,
  DetailType: false,
  haveProfile: false,
};

export const SpecialOffersSlice = createSlice({
  name: 'SpecialOffers',
  initialState,
  reducers: {
    getSpecialOffers: (state, action) => {
      state.SpecialOffers = action.payload;
    },
    SearchSpecialOffers: (state, action) => {
      state.SpecialOfferSearch = action.payload;
    },
    SelectOffer: (state, action) => {
      state.SpecialOffersContent = action.payload;
    },

    setHaveProfile: (state, action) => {
      state.haveProfile = action.payload;
    },
    DeleteSpecialOffer: (state, { payload }) => {
      state.SpecialOffers = state.SpecialOffers.filter((offer) => offer._id !== payload);
      state.DetailType = false;
    },

    UpdateNote: {
      reducer: (state, action) => {
        state.SpecialOffers = state.SpecialOffers.map((note) =>
          note.id === action.payload.id
            ? { ...note, [action.payload.field]: action.payload.value }
            : note,
        );
      },
      prepare: (id, field, value) => {
        return {
          payload: { id, field, value },
        };
      },
    },

    addSpecialOffer: (state, { payload }) => {
      if (state.DetailType === 'addNew') {
        state.SpecialOffers = [payload, ...state.SpecialOffers];
      } else {
        const newOffers = state.SpecialOffers.map((offer) => {
          if (offer._id === payload._id) {
            return payload;
          }
          return offer;
        });
        console.log(newOffers, 'newOffersnewOffers');
        state.SpecialOffers = newOffers;
      }
    },

    setLoading: (state, { payload }) => {
      state.loading = payload;
    },
    setDetailType: (state, { payload }) => {
      state.DetailType = payload;
    },
  },
});

export const {
  SearchSpecialOffers,
  getSpecialOffers,
  SelectOffer,
  DeleteSpecialOffer,
  UpdateNote,
  addSpecialOffer,
  setLoading,
  setDetailType,
  setHaveProfile,
} = SpecialOffersSlice.actions;
const dumy = {
  color: 'danger',

  deleted: false,
};

export const fetchSpecialOffers = (id) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const restaurantProfile = await Axios.get(Endpoints.profile.get());
    dispatch(setHaveProfile(true));

    console.log(restaurantProfile, 'restaurantProfile');
    const response = await Axios.get(Endpoints.specialOffer.getAll(), {
      params: {
        restaurantId: id,
      },
    });
    dispatch(getSpecialOffers(response.data.map((el) => ({ ...el, id: el.id, ...dumy }))));
  } catch (err) {
    if (err.response.status === 402) {
      dispatch(setHaveProfile(false));
      console.log(err.response, 'errrrr');
    }
  } finally {
    dispatch(setLoading(false));
  }
};

export const changeOfferStatus =
  ({ offerId, status }) =>
  async (dispatch) => {
    console.log(status, offerId, 'ssss');
    try {
      const response = await Axios.put(
        Endpoints.specialOffer.post(),
        {},
        {
          params: {
            offerId,
            status,
          },
        },
      );
      dispatch(addSpecialOffer(response.data));
    } catch (err) {
      console.log(err, 'errr');
    }
  };

export default SpecialOffersSlice.reducer;
