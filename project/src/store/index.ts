import { configureStore } from '@reduxjs/toolkit';
import { createApi } from '../service/api';
import { rootReducer } from './root-reducer';

export const api = createApi();

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    }),
});

export default store;
