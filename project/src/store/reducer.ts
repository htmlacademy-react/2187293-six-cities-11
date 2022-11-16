import { createReducer } from '@reduxjs/toolkit';
import offers from '../mocks/offers';
import OfferType from '../types/offers';
import { changeCity, getOffers } from './action';

const initialState = {
  city: 'Paris',
  offers,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(getOffers, (state) => {
      state.offers = offers.filter((offer: OfferType) => offer.city.name === state.city);
    });
});

export default reducer;
