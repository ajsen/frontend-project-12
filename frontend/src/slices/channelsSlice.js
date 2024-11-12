import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';

import apiPaths from '../api/apiPaths';
import transformErrorResponse from '../utils/transformErrorResponse';
import socket from '../utils/socket';
import apiSlice from '../api/apiSlice';
import { messagesAdapter } from './messagesSlice';

const defaultChannelId = '1';

export const channelsAdapter = createEntityAdapter();

export const initialState = channelsAdapter.getInitialState({
  currentChannelId: defaultChannelId,
  channelWithActionId: null,
});

export const apiSliceWithChannels = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getChannels: builder.query({
      query: () => ({
        url: apiPaths.channels(),
      }),
      transformResponse: (response) => channelsAdapter.setAll(initialState, response),
      transformErrorResponse,
      onCacheEntryAdded: async (_, {
        cacheDataLoaded,
        cacheEntryRemoved,
        dispatch,
        getState,
        updateCachedData,
      }) => {
        try {
          await cacheDataLoaded;
          if (socket.connected) {
            socket.on('newChannel', (payload) => {
              console.log(payload);
              const state = getState();
              const { username: currentUsername } = state.auth;

              updateCachedData((draft) => {
                channelsAdapter.addOne(draft, payload);
                if (payload.creator === currentUsername) {
                  dispatch(setCurrentChannelId(payload.id));
                }
              });
            });
            socket.on('removeChannel', ({ id }) => {
              updateCachedData((draft) => {
                channelsAdapter.removeOne(draft, id);
                const state = getState();
                const { currentChannelId } = state.channels;
                if (currentChannelId === id) {
                  dispatch(setCurrentChannelId(defaultChannelId));
                }
              });
              updateCachedData((draft) => {
                const messagesToRemoveIds = Object.values(draft.entities)
                  .filter((message) => message.channelId === id)
                  .map((message) => message.id);
                messagesAdapter.removeMany(draft, messagesToRemoveIds);
              });
            });
            socket.on('renameChannel', ({ id, name }) => {
              dispatch(apiSliceWithChannels.util.updateQueryData('getChannels', undefined, (draft) => {
                const changes = { name };
                channelsAdapter.updateOne(draft, { id, changes });
              }));
            });
          }
        } catch (error) {
          console.error(error);
        }

        await cacheEntryRemoved;
        socket.off('newChannel');
        socket.off('removeChannel');
        socket.off('renameChannel');
      },
    }),
    createChannel: builder.mutation({
      query: (channel) => ({
        url: apiPaths.channels(),
        method: 'post',
        data: channel,
      }),
      invalidatesTags: ['Channel'],
      transformResponse: (response) => channelsAdapter.addOne(initialState, response),
      transformErrorResponse,
    }),
    updateChannel: builder.mutation({
      query: ({ id, name }) => ({
        url: apiPaths.channel(id),
        method: 'patch',
        data: { name },
      }),
      invalidatesTags: ['Channel'],
      transformResponse: (response) => channelsAdapter.updateOne(initialState, response),
      transformErrorResponse,
    }),
    deleteChannel: builder.mutation({
      query: (channelId) => ({
        url: apiPaths.channel(channelId),
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
      state.currentChannelId = action.payload;
    },
    setChannelWithActionId: (state, action) => {
      state.channelWithActionId = action.payload;
    },
  },
});

export const { setCurrentChannelId, setChannelWithActionId } = channelsSlice.actions;

export default channelsSlice.reducer;

export const selectChannelsResult = apiSliceWithChannels.endpoints.getChannels.select();
