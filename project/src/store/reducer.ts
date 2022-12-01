import { createReducer } from '@reduxjs/toolkit';
import OfferType from '../types/offers';
import { changeCity, getOffers, setLoadingStatus } from './action';

type InitialState = {
  city: string;
  offers: OfferType[] | [];
  showOffers: OfferType[] | [];
  isLoading: boolean;
};

const initialState: InitialState = {
  city: 'Paris',
  offers: [],
  showOffers: [],
  isLoading: false,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.city = action.payload;
      state.showOffers = state.offers.filter((offer: OfferType) => offer.city.name === state.city);
    })
    .addCase(getOffers, (state, action) => {
      state.offers = action.payload;
    })
    .addCase(setLoadingStatus, (state, action) => {
      state.isLoading = action.payload;
    });
});

export default reducer;
