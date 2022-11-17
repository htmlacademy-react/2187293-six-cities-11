import { createAction } from '@reduxjs/toolkit';

export const changeCity = createAction('city/change', (value: string) => (
  { payload: value }
));

export const getOffers = createAction('city/getOffers');
