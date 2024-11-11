import { createSelector } from '@reduxjs/toolkit';

import {
  channelsAdapter,
  selectChannelsResult,
  initialState as channelsInitialState,
} from './channelsSlice';
import {
  messagesAdapter,
  selectMessagesResult,
  initialState as messagesInitialState,
} from './messagesSlice';

const selectChannelsData = createSelector(
  selectChannelsResult,
  (result) => result.data ?? channelsInitialState,
);

export const {
  selectAll: selectAllChannels,
  selectById: selectChannelById,
} = channelsAdapter.getSelectors(selectChannelsData);

export const selectCurrentChannelId = (state) => state.channels.currentChannelId;
export const selectChannelWithActionId = (state) => state.channels.channelWithActionId;

export const selectChannelNames = createSelector(
  selectAllChannels, (channels) => channels.map(({ name }) => name),
);

const selectMessagesData = createSelector(
  selectMessagesResult, (result) => result.data ?? messagesInitialState,
);

export const {
  selectAll: selectAllMessages,
  selectById: selectMessageById,
} = messagesAdapter.getSelectors(selectMessagesData);

export const selectCurrentChannelMessages = createSelector(
  [selectAllMessages, selectCurrentChannelId],
  (messages, currentChannelId) => (
    messages?.filter(({ channelId }) => channelId === currentChannelId)
  ),
);

export const selectCurrentUsername = (state) => state.auth.username;
export const selectLoadingStatus = (state) => state.auth.loadingStatus;
export const selectAuthError = (state) => state.auth.authError;

export const selectCurrentLng = (state) => state.userUi.currentLng;
export const selectModalIsShown = (state) => state.userUi.modalIsShown;
