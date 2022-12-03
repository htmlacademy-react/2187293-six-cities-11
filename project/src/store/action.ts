import { createAction } from '@reduxjs/toolkit';
import OfferType from '../types/offers';

export const changeCity = createAction('city/change', (value: string) => (
  { payload: value }
));

export const getOffers = createAction('city/getOffers', (value: [OfferType]) => (
  { payload: value }
));

export const setLoadingStatus = createAction('data/isLoading', (value: boolean) => (
  { payload: value }
));

export const getFavorites = createAction('/ity/favorites', (value: [OfferType]) => (
  { payload: value }
));
