import { combineReducers } from '@reduxjs/toolkit';
import NameSpace from '../consts/name-space';
import { userProcess } from './user-process/user-process';
import { offersProcess } from './offers-process/offers-process';
import { favoritesProcess } from './favorites-process/favorites-process';

export const rootReducer = combineReducers({
  [NameSpace.User]: userProcess.reducer,
  [NameSpace.Offers]: offersProcess.reducer,
  [NameSpace.Favorites]: favoritesProcess.reducer,
});

