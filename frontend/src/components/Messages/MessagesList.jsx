import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

import { useGetMessagesQuery } from '../../slices/messagesSlice';
import { selectCurrentChannelMessages } from '../../slices/selectors';

const MessagesList = () => {
  const listBottomRef = useRef();
  const { t } = useTranslation();

  const { isError } = useGetMessagesQuery();

  useEffect(() => {
    if (isError) {
      toast.error(t('toastMessages.loadingError'));
    }
  }, [isError, t]);

  const messages = useSelector(selectCurrentChannelMessages);

  useEffect(() => {
    listBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div id="messages-box" className="chat-messages overflow-auto px-5">
      {messages?.length > 0 && messages.map(({ id, username, body }) => (
        <div key={id} className="text-break mb-2">
          <b>{username}</b>
          {': '}
          {body}
        </div>
      ))}
      <div ref={listBottomRef} />
    </div>
  );
};

export default MessagesList;
