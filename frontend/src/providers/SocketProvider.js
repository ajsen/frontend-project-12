import { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { SocketContext } from '../contexts';
import { selectCurrentChannelId, selectCurrentUsername } from '../slices/selectors';
import {
  apiSliceWithChannels,
  channelsAdapter,
  setCurrentChannelId,
} from '../slices/channelsSlice';
import { apiSliceWithMessages, messagesAdapter } from '../slices/messagesSlice';

const SocketProvider = ({ children, socket }) => {
  const dispatch = useDispatch();

  const currentUsername = useSelector(selectCurrentUsername);
  const currentChannelId = useSelector(selectCurrentChannelId);

  const onNewChannel = useCallback((payload) => {
    dispatch(apiSliceWithChannels.util.updateQueryData('getChannels', undefined, (draft) => {
      channelsAdapter.addOne(draft, payload);
    }));
    if (payload.creator === currentUsername) {
      dispatch(setCurrentChannelId(payload.id));
    }
  }, [currentUsername]);

  const onRemoveChannel = useCallback(({ id }) => {
    dispatch(apiSliceWithChannels.util.updateQueryData('getChannels', undefined, (draft) => {
      channelsAdapter.removeOne(draft, id);
      const defaultChannelId = '1';
      if (currentChannelId === id) {
        dispatch(setCurrentChannelId(defaultChannelId));
      }
    }));
    dispatch(apiSliceWithMessages.util.updateQueryData('getMessages', undefined, (draft) => {
      const messagesToRemoveIds = Object.values(draft.entities)
        .filter((message) => message.channelId === id)
        .map((message) => message.id);
      messagesAdapter.removeMany(draft, messagesToRemoveIds);
    }));
  }, [currentChannelId]);

  const onRenameChannel = useCallback(({ id, name }) => {
    dispatch(apiSliceWithChannels.util.updateQueryData('getChannels', undefined, (draft) => {
      const changes = { name };
      channelsAdapter.updateOne(draft, { id, changes });
    }));
  }, []);

  const onNewMessage = useCallback((payload) => {
    dispatch(apiSliceWithMessages.util.updateQueryData('getMessages', undefined, (draft) => {
      messagesAdapter.addOne(draft, payload);
    }));
  }, []);

  const events = useMemo(() => [
    { event: 'newChannel', handler: onNewChannel },
    { event: 'removeChannel', handler: onRemoveChannel },
    { event: 'renameChannel', handler: onRenameChannel },
    { event: 'newMessage', handler: onNewMessage },
  ], [onNewChannel, onRemoveChannel, onRenameChannel, onNewMessage]);

  const startSocket = useCallback(() => {
    try {
      socket.connect();
      socket.on('connect', () => {
        events.forEach(({ event, handler }) => {
          socket.on(event, handler);
        });
      });
    } catch (error) {
      throw new Error('toastMessages.socketConnectionError');
    }
  }, [events, socket]);

  const closeSocket = useCallback(() => {
    try {
      events.forEach(({ event, handler }) => {
        socket.off(event, handler);
      });
      socket.disconnect();
    } catch (error) {
      throw new Error('toastMessages.socketClosingError');
    }
  }, [events, socket]);

  const value = useMemo(() => ({
    startSocket,
    closeSocket,
  }), [
    startSocket,
    closeSocket,
  ]);

  return (
    <SocketContext.Provider value={value}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
