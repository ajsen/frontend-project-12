import { configureStore } from '@reduxjs/toolkit';

import apiSlice from '../api/apiSlice';
import authReducer from './authSlice';
import channelsReducer from './channelsSlice';
import userUiReducer from './userUiSlice';
import { listenerMiddleware } from './listenerMiddleware';

const store = configureStore({
  reducer: {
    auth: authReducer,
    channels: channelsReducer,
    userUi: userUiReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
    .concat(apiSlice.middleware)
    .prepend(listenerMiddleware.middleware),
});

export default store;
