import { createReducer } from '@reduxjs/toolkit';
import OfferType from '../types/offers';
import {
  changeCity,
  getFavorites,
  getOffers,
  setLoadingStatus,
  requireAuthorization,
  login,
  logout,
} from './action';
import AuthorizationStatus from '../consts/authorization-status';
import UserType from '../types/user';

type InitialState = {
  city: string;
  offers: OfferType[] | [];
  showOffers: OfferType[] | [];
  isLoading: boolean;
  favorites: OfferType[] | [];
  authorizationStatus: string;
  user: UserType | null;
};

const initialState: InitialState = {
  city: 'Paris',
  offers: [],
  showOffers: [],
  isLoading: false,
  favorites: [],
  authorizationStatus: AuthorizationStatus.Unknown,
  user: null
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
    })
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(login, (state, action) => {
      state.user = action.payload;
    })
    .addCase(logout, (state) => {
      state.user = null;
      state.authorizationStatus = AuthorizationStatus.NoAuth;
    });
});

export default reducer;
