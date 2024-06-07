import { configureStore } from '@reduxjs/toolkit';
import SpecialOffersReducer from './apps/SpecialOffers/SpecialOffersSlice';
import CustomizerReducer from './customizer/CustomizerSlice';
import ChatsReducer from './apps/chat/ChatSlice';
import BookingsReducer from './apps/contacts/BookingsSlice';
import EmailReducer from './apps/email/EmailSlice';
import TicketReducer from './apps/ticket/TicketSlice';
import profileReducer from './profile/profileSlice';

export const store = configureStore({
  reducer: {
    customizer: CustomizerReducer,
    SpecialOffersReducer,
    chatReducer: ChatsReducer,
    bookingsReducer: BookingsReducer,
    emailReducer: EmailReducer,
    ticketReducer: TicketReducer,
    profileReducer,
  },
});

export default store;
