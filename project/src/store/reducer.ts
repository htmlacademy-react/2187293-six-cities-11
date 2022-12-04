import { createReducer } from '@reduxjs/toolkit';
import OfferType from '../types/offers';
import { changeCity, getFavorites, getOffers, setLoadingStatus } from './action';

type InitialState = {
  city: string;
  offers: OfferType[] | [];
  showOffers: OfferType[] | [];
  isLoading: boolean;
  favorites: OfferType[] | [];
};

const initialState: InitialState = {
  city: 'Paris',
  offers: [],
  showOffers: [],
  isLoading: false,
  favorites: [],
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.city = action.payload;
      state.showOffers = state.offers.filter((offer: OfferType) => offer.city.name === state.city);
    })
    .addCase(getOffers, (state, action) => {
      state.offers = action.payload;
      state.showOffers = action.payload.filter((offer: OfferType) => offer.city.name === state.city);
    })
    .addCase(setLoadingStatus, (state, action) => {
      state.isLoading = action.payload;
    })
    .addCase(getFavorites, (state, action) => {
      state.favorites = action.payload;
    });
});

export default reducer;
