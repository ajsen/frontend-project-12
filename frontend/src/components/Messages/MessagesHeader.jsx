import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { selectCurrentChannelId, selectChannelById, selectCurrentChannelMessages } from '../../slices/selectors';

const MessagesHeader = () => {
  const currentChannelId = useSelector(selectCurrentChannelId);
  const currentChannel = useSelector((state) => selectChannelById(state, currentChannelId));
  const currentChannelMessages = useSelector(selectCurrentChannelMessages);
  const { t } = useTranslation();

  return (
    <div className="bg-light mb-4 p-3 shadow-sm-small">
      <p className="m-0">
        <b>
          # {currentChannel?.name}
        </b>
      </p>
      <span className="text-muted">
        {t('messagesCount.messages', { count: currentChannelMessages?.length })}
      </span>
    </div>
  );
};

export default MessagesHeader;
