import { configureStore } from '@reduxjs/toolkit';
import reducer from './reducer';
import { createApi } from '../service/api';

export const api = createApi();

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    }),
});

export default store;
