import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { isAxiosError } from 'axios';

import apiPaths from '../api/apiPaths';
import axiosInstance from '../utils/axiosInstance';
import transformErrorResponse from '../utils/transformErrorResponse';
import { startListening } from './listenerMiddleware';

const handleNetworkError = (error, rejectWithValue) => {
  if (!isAxiosError(error)) {
    throw error;
  }

  return rejectWithValue(transformErrorResponse({
    status: error.response?.status ?? null,
    code: error.code ?? null,
  }));
};

export const signup = createAsyncThunk(
  'auth/signup',
  async (credentials, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post(apiPaths.signup(), credentials);
      return data;
    } catch (error) {
      return handleNetworkError(error, rejectWithValue);
    }
  },
);

export const login = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post(apiPaths.login(), credentials);
      return data;
    } catch (error) {
      return handleNetworkError(error, rejectWithValue);
    }
  },
);

const userAuthData = JSON.parse(localStorage.getItem('userAuthData'));

const isLoggedIn = Boolean(userAuthData?.username && userAuthData?.token);

const initialState = {
  username: isLoggedIn ? userAuthData.username : null,
  loadingStatus: 'idle',
  authError: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.username = null;
      state.loadingStatus = 'idle';
      state.authError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.authError = null;
        state.loadingStatus = 'loading';
      })
      .addCase(login.fulfilled, (state, { payload: { username } }) => {
        state.username = username;
        state.loadingStatus = 'loaded';
      })
      .addCase(login.rejected, (state, { payload }) => {
        state.authError = payload;
        state.loadingStatus = 'failed';
      })
      .addCase(signup.pending, (state) => {
        state.authError = null;
        state.loadingStatus = 'loading';
      })
      .addCase(signup.fulfilled, (state, { payload: { username } }) => {
        state.username = username;
        state.loadingStatus = 'loaded';
      })
      .addCase(signup.rejected, (state, { payload }) => {
        state.authError = payload;
        state.loadingStatus = 'failed';
      });
  },
});

export default authSlice.reducer;

export const { logout } = authSlice.actions;

export const selectCurrentUsername = (state) => state.auth.username;
export const selectLoadingStatus = (state) => state.auth.loadingStatus;
export const selectAuthError = (state) => state.auth.authError;

startListening({
  actionCreator: logout,
  effect: () => {
    localStorage.removeItem('userAuthData');
  },
});

startListening({
  actionCreator: login.fulfilled,
  effect: ({ payload }) => {
    localStorage.setItem('userAuthData', JSON.stringify(payload));
  },
});

startListening({
  actionCreator: signup.fulfilled,
  effect: ({ payload }) => {
    localStorage.setItem('userAuthData', JSON.stringify(payload));
  },
});
