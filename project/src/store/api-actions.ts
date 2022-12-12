import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import apiRoutes from '../consts/api-routes';
import { AppDispatch, State } from '../types/state';
import OfferType from '../types/offers';
import UserType from '../types/user';
import AuthType from '../types/auth';
import { setToken, dropToken } from '../service/token';

export const fetchOffersAction = createAsyncThunk<OfferType[], undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'city/fetchOffers',
  async (_arg, {dispatch, extra: api}) => {
    const {data} = await api.get<[OfferType]>(apiRoutes.Offers);
    return data;
  },
);

export const fetchFavoritesAction = createAsyncThunk<OfferType[], undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'offers/fetchFavorites',
  async (_arg, {dispatch, extra: api}) => {
    const {data} = await api.get<[OfferType]>(apiRoutes.Favorite);
    return data;
  },
);

export const fetchCheckAuthorizationAction = createAsyncThunk<UserType, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/fetchAuthorization',
  async (_arg, {dispatch, extra: api}) => {
    const { data } = await api.get<UserType>(apiRoutes.Login);
    return data;
  },
);

export const fetchLoginAction = createAsyncThunk<UserType, AuthType, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/fetchLogin',
  async ({ login: email, password}, {dispatch, extra: api}) => {
    const {data} = await api.post<UserType>(apiRoutes.Login, { email, password });
    setToken(data.token);
    return data;
  },
);

export const fetchLogoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/fetchLogout',
  async (_arg, {dispatch, extra: api}) => {
    await api.delete(apiRoutes.Logout);
    dropToken();
  },
);

export const toggleFavorite = createAsyncThunk<OfferType[], { offerId: number; status: number}, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'offers/changeFavorite',
  async ({ offerId, status }, { dispatch, extra: api}) => {
    const path = `${apiRoutes.Favorite}/${offerId}/${status}`;
    await api.post<OfferType>(path);
    const {data} = await api.get<[OfferType]>(apiRoutes.Favorite);
    return data;
  },
);
