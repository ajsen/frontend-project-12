import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';

import apiPaths from '../api/apiPaths';
import transformErrorResponse from '../utils/transformErrorResponse';
import apiSlice from '../api/apiSlice';

export const defaultChannelId = '1';

export const channelsAdapter = createEntityAdapter();

export const initialState = channelsAdapter.getInitialState({
  currentChannelId: defaultChannelId,
  channelWithActionId: null,
});

export const apiSliceWithChannels = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getChannels: builder.query({
      query: () => ({
        url: apiPaths.getChannels(),
      }),
      transformResponse: (response) => channelsAdapter.setAll(initialState, response),
      transformErrorResponse,
    }),
    createChannel: builder.mutation({
      query: (channel) => ({
        url: apiPaths.getChannels(),
        method: 'post',
        data: channel,
      }),
      invalidatesTags: ['Channel'],
      transformResponse: (response) => channelsAdapter.addOne(initialState, response),
      transformErrorResponse,
    }),
    updateChannel: builder.mutation({
      query: ({ id, name }) => ({
        url: apiPaths.getChannel(id),
        method: 'patch',
        data: { name },
      }),
      invalidatesTags: ['Channel'],
      transformResponse: (response) => channelsAdapter.updateOne(initialState, response),
      transformErrorResponse,
    }),
    deleteChannel: builder.mutation({
      query: (channelId) => ({
        url: apiPaths.getChannel(channelId),
        method: 'delete',
      }),
      invalidatesTags: ['Channel'],
      transformResponse: (response) => channelsAdapter.removeOne(initialState, response),
      transformErrorResponse,
    }),
  }),
});

export const {
  useGetChannelsQuery,
  useCreateChannelMutation,
  useUpdateChannelMutation,
  useDeleteChannelMutation,
} = apiSliceWithChannels;

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    setCurrentChannelId: (state, action) => {
      // eslint-disable-next-line no-param-reassign
      state.currentChannelId = action.payload;
    },
    setChannelWithActionId: (state, action) => {
      // eslint-disable-next-line no-param-reassign
      state.channelWithActionId = action.payload;
    },
  },
});

export const { setCurrentChannelId, setChannelWithActionId } = channelsSlice.actions;

export default channelsSlice.reducer;

export const selectChannelsResult = apiSliceWithChannels.endpoints.getChannels.select();
