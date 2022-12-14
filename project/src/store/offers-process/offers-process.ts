import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import NameSpace from '../../consts/name-space';
import {
  fetchOffersAction,
} from '../api-actions';
import OfferType from '../../types/offers';
import Cities from '../../consts/cities';
import { OffersProcess } from '../../types/state';

const initialState: OffersProcess = {
  offers: [],
  showOffers: [],
  city: Cities[0].name,
  isLoading: false,
};

export const offersProcess = createSlice({
  name: NameSpace.Offers,
  initialState,
  reducers: {
    changeCity: (state, action: PayloadAction<string>) => {
      state.city = action.payload;
      state.showOffers = state.offers.filter((offer: OfferType) => offer.city.name === action.payload);
    },
    sort: (state, action: PayloadAction<OfferType[]>) => {
      state.showOffers = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchOffersAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchOffersAction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.offers = action.payload;
        state.showOffers = action.payload.filter((offer: OfferType) => offer.city.name === state.city);
      })
      .addCase(fetchOffersAction.rejected, (state) => {
        state.isLoading = false;
        state.offers = [];
        state.showOffers = [];
      });
  }
});

export const { changeCity, sort } = offersProcess.actions;
