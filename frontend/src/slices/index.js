import { configureStore } from '@reduxjs/toolkit';

// import apiSlice from '../api/apiSlice';
import authReducer from './authSlice';
import channelsReducer from './channelsSlice';
import messagesReducer from './messagesSlice';
import { listenerMiddleware } from './listenerMiddleware';

const store = configureStore({
  reducer: {
    auth: authReducer,
    channels: channelsReducer,
    messages: messagesReducer,
    // [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
    .prepend(listenerMiddleware.middleware)
  // .concat(apiSlice.middleware),
});

export default store;
