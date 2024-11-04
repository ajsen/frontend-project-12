import { useMemo } from 'react';
import { useSelector } from 'react-redux';

import { selectCurrentChannelId } from '../slices/selectors';

const defaultVariant = 'light';
const activeVariant = 'secondary';

const useChannelButtonVariant = (channelId) => {
  const currentChannelId = useSelector(selectCurrentChannelId);
  const buttonVariant = useMemo(
    () => currentChannelId === channelId ? activeVariant : defaultVariant,
    [channelId, currentChannelId],
  );
  return buttonVariant;
};

export default useChannelButtonVariant;
