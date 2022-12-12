import { createSlice } from '@reduxjs/toolkit';
import NameSpace from '../../consts/name-space';
import {
  fetchFavoritesAction,
  toggleFavorite,
} from '../api-actions';
import { FavoritesProcess } from '../../types/state';

const initialState: FavoritesProcess = {
  favorites: [],
};

export const favoritesProcess = createSlice({
  name: NameSpace.Favorites,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchFavoritesAction.fulfilled, (state, action) => {
        state.favorites = action.payload;
      })
      .addCase(toggleFavorite.fulfilled, (state, action) => {
        state.favorites = action.payload;
      });
  }
});
