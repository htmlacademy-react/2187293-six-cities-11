import store from '../store';
import OfferType from './offers';
import UserType from './user';

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type OffersProcess = {
  offers: OfferType[] | [];
  showOffers: OfferType[] | [];
  city: string;
  isLoading: boolean;
};

export type FavoritesProcess = {
  favorites: OfferType[] | [];
};

export type UserProcess = {
  authorizationStatus: string;
  user: UserType | null;
};
