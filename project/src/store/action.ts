import { createAction } from '@reduxjs/toolkit';
import OfferType from '../types/offers';
import UserType from '../types/user';

export const changeCity = createAction('city/change', (value: string) => (
  { payload: value }
));

export const getOffers = createAction('city/getOffers', (value: [OfferType]) => (
  { payload: value }
));

export const setLoadingStatus = createAction('data/isLoading', (value: boolean) => (
  { payload: value }
));

export const getFavorites = createAction('city/favorites', (value: [OfferType]) => (
  { payload: value }
));

export const requireAuthorization = createAction('user/requireAuthirization', (value: string) => (
  { payload: value }
));

export const login = createAction('user/login', (value: UserType) => (
  { payload: value }
));

export const logout = createAction('user/logout');
