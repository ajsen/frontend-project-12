import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

import { useGetMessagesQuery } from '../../slices/messagesSlice';
import { selectCurrentChannelMessages } from '../../slices/selectors';

const MessagesList = () => {
  const messagesListRef = useRef();
  const { t } = useTranslation();

  const { isError } = useGetMessagesQuery();

  useEffect(() => {
    if (isError) {
      toast.error(t('toastMessages.loadingError'));
    }
  }, [isError, t]);

  const messages = useSelector(selectCurrentChannelMessages);

  useEffect(() => {
    if (messages.length > 0) {
      messagesListRef?.current?.lastChild.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
      });
    }
  }, [messages]);

  return (
    <div
      id="messages-box"
      className="chat-messages overflow-auto px-5"
      ref={messagesListRef}
    >
      {messages?.length > 0 && messages.map(({ id, username, body }) => (
        <div key={id} className="text-break mb-2">
          <b>{username}</b>
          {': '}
          {body}
        </div>
      ))}
    </div>
  );
};

export default MessagesList;
