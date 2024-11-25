import store from '../slices';
import {
  apiSliceWithChannels,
  channelsAdapter,
  defaultChannelId,
  setCurrentChannelId,
} from '../slices/channelsSlice';
import { apiSliceWithMessages, messagesAdapter } from '../slices/messagesSlice';

const createSocketListeners = (socket) => {
  const { dispatch, getState } = store;

  const onNewChannel = (payload) => {
    dispatch(apiSliceWithChannels.util.updateQueryData('getChannels', undefined, (draft) => {
      channelsAdapter.addOne(draft, payload);
    }));

    const { auth: { username: currentUsername } } = getState();
    if (payload.creator === currentUsername) {
      dispatch(setCurrentChannelId(payload.id));
    }
  };

  const onRemoveChannel = ({ id }) => {
    dispatch(apiSliceWithChannels.util.updateQueryData('getChannels', undefined, (draft) => {
      channelsAdapter.removeOne(draft, id);
    }));
    const { channels: { currentChannelId } } = getState();
    if (currentChannelId === id) {
      dispatch(setCurrentChannelId(defaultChannelId));
    }
    dispatch(apiSliceWithMessages.util.updateQueryData('getMessages', undefined, (draft) => {
      const messagesToRemoveIds = Object.values(draft.entities)
        .filter((message) => message.channelId === id)
        .map((message) => message.id);
      messagesAdapter.removeMany(draft, messagesToRemoveIds);
    }));
  };

  const onRenameChannel = ({ id, name }) => {
    dispatch(apiSliceWithChannels.util.updateQueryData('getChannels', undefined, (draft) => {
      channelsAdapter.updateOne(draft, { id, changes: { name } });
    }));
  };

  const onNewMessage = (payload) => {
    dispatch(apiSliceWithMessages.util.updateQueryData('getMessages', undefined, (draft) => {
      messagesAdapter.addOne(draft, payload);
    }));
  };

  return {
    start: () => {
      socket.on('newChannel', onNewChannel);
      socket.on('removeChannel', onRemoveChannel);
      socket.on('renameChannel', onRenameChannel);
      socket.on('newMessage', onNewMessage);
    },
    remove: () => {
      socket.off('newChannel', onNewChannel);
      socket.off('removeChannel', onRemoveChannel);
      socket.off('renameChannel', onRenameChannel);
      socket.off('newMessage', onNewMessage);
    },
  };
};

export default createSocketListeners;
