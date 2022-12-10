import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import apiRoutes from '../consts/api-routes';
import { AppDispatch, State } from '../types/state';
import OfferType from '../types/offers';
import UserType from '../types/user';
import AuthType from '../types/auth';
import { setToken, dropToken } from '../service/token';
import {
  getOffers,
  setLoadingStatus,
  getFavorites,
  login,
  logout,
  requireAuthorization,
} from './action';
import AuthorizationStatus from '../consts/authorization-status';


export const fetchOffersAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'city/fetchOffers',
  async (_arg, {dispatch, extra: api}) => {
    dispatch(setLoadingStatus(true));
    const {data} = await api.get<[OfferType]>(apiRoutes.Offers);
    dispatch(setLoadingStatus(false));
    dispatch(getOffers(data));
  },
);

export const fetchFavoritesAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'city/fetchFavorites',
  async (_arg, {dispatch, extra: api}) => {
    dispatch(setLoadingStatus(true));
    const {data} = await api.get<[OfferType]>(apiRoutes.Favorite);
    dispatch(setLoadingStatus(false));
    dispatch(getFavorites(data));
  },
);

export const fetchCheckAuthorizationAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/requireAuthorization',
  async (_arg, {dispatch, extra: api}) => {
    dispatch(setLoadingStatus(true));
    try {
      const { data } = await api.get<UserType>(apiRoutes.Login);
      dispatch(setLoadingStatus(false));
      dispatch(login(data));
      dispatch(requireAuthorization(AuthorizationStatus.Auth));
    } catch {
      dispatch(setLoadingStatus(false));
      dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    }
  },
);

export const fetchLoginAction = createAsyncThunk<void, AuthType, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/login',
  async ({ login: email, password}, {dispatch, extra: api}) => {
    dispatch(setLoadingStatus(true));
    const {data} = await api.post<UserType>(apiRoutes.Login, { email, password });
    dispatch(setLoadingStatus(false));
    setToken(data.token);
    dispatch(login(data));
    dispatch(requireAuthorization(AuthorizationStatus.Auth));
  },
);

export const fetchLogoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/logout',
  async (_arg, {dispatch, extra: api}) => {
    dispatch(setLoadingStatus(true));
    await api.delete(apiRoutes.Logout);
    dispatch(setLoadingStatus(false));
    dropToken();
    dispatch(logout());
  },
);

export const toggleFavorite = createAsyncThunk<void, { offerId: number; status: number}, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'offer/favorite',
  async ({ offerId, status }, { dispatch, extra: api}) => {
    const path = `${apiRoutes.Favorite}/${offerId}/${status}`;
    await api.post<OfferType>(path);
    const {data} = await api.get<[OfferType]>(apiRoutes.Favorite);
    dispatch(getFavorites(data));
  },
);
