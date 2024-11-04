import {
  createEntityAdapter,
  createSlice,
  nanoid,
} from '@reduxjs/toolkit';

import apiPaths from '../api/apiPaths';
import transformErrorResponse from '../utils/transformErrorResponse';
import socket from '../utils/socket';
import apiSlice from '../api/apiSlice';
import { apiSliceWithMessages, messagesAdapter } from './messagesSlice';

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
      onCacheEntryAdded: async (_, { cacheDataLoaded, cacheEntryRemoved, dispatch, getState, updateCachedData }) => {
        try {
          await cacheDataLoaded;
          socket.on('newChannel', (payload) => {
            updateCachedData((draft) => {
              channelsAdapter.addOne(draft, payload);
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
      transformResponse: (response) => channelsAdapter.addOne(initialState, response),
      transformErrorResponse,
      onQueryStarted: async (channel, { dispatch, queryFulfilled }) => {
        const patchResult = dispatch(
          apiSliceWithChannels.util.updateQueryData('createChannel', undefined, (draft) => {
            const tempProps = { id: nanoid(), removable: true };
            channelsAdapter.addOne(draft, { ...channel, ...tempProps });
          }),
        );

        try {
          const { data: { ids } } = await queryFulfilled;
          const [newChannelId] = ids;
          dispatch(setCurrentChannelId(newChannelId));
        } catch {
          patchResult.undo();
        }
      },
    }),
    updateChannel: builder.mutation({
      query: ({ id, name }) => ({
        url: apiPaths.channel(id),
        method: 'patch',
        data: { name },
      }),
      transformResponse: (response) => channelsAdapter.updateOne(initialState, response),
      transformErrorResponse,
      onQueryStarted: async ({ id, name }, { dispatch, queryFulfilled }) => {
        const patchResult = dispatch(
          apiSliceWithChannels.util.updateQueryData('updateChannel', undefined, (draft) => {
            channelsAdapter.updateOne(draft, {
              id,
              changes: { name },
            });
          }),
        );

        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),
    deleteChannel: builder.mutation({
      query: (channelId) => ({
        url: apiPaths.channel(channelId),
        method: 'delete',
      }),
      transformResponse: (response) => channelsAdapter.removeOne(initialState, response),
      transformErrorResponse,
      onQueryStarted: async (channelId, { dispatch, queryFulfilled, getState }) => {
        const patchChannelResult = dispatch(
          apiSliceWithChannels.util.updateQueryData('deleteChannel', undefined, (draft) => {
            channelsAdapter.removeOne(draft, channelId);
          }),
        );

        const patchMessagesResult = dispatch(
          apiSliceWithMessages.util.updateQueryData('getMessages', undefined, (draft) => {
            const messagesToRemoveIds = Object.values(draft.entities)
              .filter(message => message.channelId === channelId)
              .map(message => message.id);
            messagesAdapter.removeMany(draft, messagesToRemoveIds);
          }),
        );

        try {
          await queryFulfilled;
          const state = getState();
          const { currentChannelId } = state.channels;
          if (currentChannelId === channelId) {
            dispatch(setCurrentChannelId(defaultChannelId));
          }
        } catch {
          patchChannelResult.undo();
          patchMessagesResult.undo();
        }
      },
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
