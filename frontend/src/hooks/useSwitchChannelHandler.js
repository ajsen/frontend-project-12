import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { setCurrentChannelId } from '../slices/channelsSlice';

const useSwitchChannel = (channelId) => {
  const dispatch = useDispatch();

  const handleSwitchChannel = useCallback(() => {
    dispatch(setCurrentChannelId(channelId));
  }, [channelId, dispatch]);

  return handleSwitchChannel;
};

export default useSwitchChannel;
