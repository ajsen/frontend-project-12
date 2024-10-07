import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import apiPaths from '../api/paths';
import axiosInstance from '../utils/axiosInstance';
import { startListening } from './listenerMiddleware';

export const login = createAsyncThunk(
  'auth/login',
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post(apiPaths.login(), { username, password });
      return data;
    } catch (error) {
      return error.response
        ? rejectWithValue(error.response.status)
        : rejectWithValue(error.code);
    }
  },
);

const getCredentials = () => {
  const credentials = localStorage.getItem('credentials');
  return credentials ? JSON.parse(credentials) : {};
};

const credentials = getCredentials();

const isLoggedIn = Boolean(credentials.username && credentials.token);

const initialState = {
  username: isLoggedIn ? credentials.username : null,
  isLoggedIn,
  authError: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.username = null;
      state.isLoggedIn = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.authError = null;
      })
      .addCase(login.fulfilled, (state, { payload: { username } }) => {
        state.username = username;
        state.isLoggedIn = true;
      })
      .addCase(login.rejected, (state, { payload }) => {
        state.authError = payload;
      });
  },
});

export default authSlice.reducer;

export const { logout } = authSlice.actions;

startListening({
  actionCreator: logout,
  effect: () => {
    localStorage.clear();
  },
});

startListening({
  actionCreator: login.fulfilled,
  effect: ({ payload }) => {
    localStorage.setItem('credentials', JSON.stringify(payload));
  },
});

export const selectCurrentUsername = (state) => state.auth.username;
export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
export const selectAuthError = (state) => state.auth.authError;
