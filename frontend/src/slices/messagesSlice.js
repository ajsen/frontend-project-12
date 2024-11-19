import { createEntityAdapter, nanoid } from '@reduxjs/toolkit';

import apiPaths from '../api/apiPaths';
import apiSlice from '../api/apiSlice';
import transformErrorResponse from '../utils/transformErrorResponse';

export const messagesAdapter = createEntityAdapter();

export const initialState = messagesAdapter.getInitialState();

export const apiSliceWithMessages = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMessages: builder.query({
      query: () => apiPaths.messages(),
      transformResponse: (response) => messagesAdapter.setAll(initialState, response),
      transformErrorResponse,
    }),
    createMessage: builder.mutation({
      query: (message) => ({
        url: apiPaths.messages(),
        method: 'post',
        data: message,
      }),
      transformResponse: (response) => messagesAdapter.addOne(initialState, response),
      transformErrorResponse,
      onQueryStarted: async (message, { dispatch, queryFulfilled }) => {
        const patchResult = dispatch(
          apiSliceWithMessages.util.updateQueryData('createMessage', undefined, (draft) => {
            messagesAdapter.addOne(draft, { ...message, id: nanoid() });
          }),
        );

        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),
  }),
});

export const { useCreateMessageMutation, useGetMessagesQuery } = apiSliceWithMessages;

export const selectMessagesResult = apiSliceWithMessages.endpoints.getMessages.select();
