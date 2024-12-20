import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { Nav } from 'react-bootstrap';

import ChannelButton from './ChannelButton';
import ChannelButtonWithAction from './ChannelButtonWithAction';
import { useGetChannelsQuery } from '../../slices/channelsSlice';
import { selectAllChannels, selectCurrentChannelId } from '../../slices/selectors';

const ChannelsList = () => {
  const { t } = useTranslation();

  const { isError } = useGetChannelsQuery();

  useEffect(() => {
    if (isError) {
      toast.error(t('toastMessages.loadingError'));
    }
  }, [isError, t]);

  const channels = useSelector(selectAllChannels);
  const currentChannelId = useSelector(selectCurrentChannelId);

  const renderedChannels = channels.map(({ id, name, removable }) => {
    const isActive = id === currentChannelId;
    return (
      <Nav.Item
        key={id}
        as="li"
        className="w-100"
      >
        {removable
          ? <ChannelButtonWithAction id={id} name={name} isActive={isActive} />
          : <ChannelButton id={id} name={name} isActive={isActive} />}
      </Nav.Item>
    );
  });

  return (
    <Nav
      fill
      as="ul"
      variant="pills"
      className="flex-column h-100 px-2 overflow-auto d-block"
    >
      {channels?.length > 0 && renderedChannels}
    </Nav>
  );
};

export default ChannelsList;
