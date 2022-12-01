import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import apiRoutes from '../consts/api-routes';
import { AppDispatch, State } from '../types/state';
import OfferType from '../types/offers';
import { getOffers, setLoadingStatus } from './action';


export const fetchOffersAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'city/fetchOffers',
  async (_arg, {dispatch, extra: api}) => {
    const {data} = await api.get<[OfferType]>(apiRoutes.Offers);
    dispatch(setLoadingStatus(true));
    dispatch(getOffers(data));
    dispatch(setLoadingStatus(false));
  },
);
