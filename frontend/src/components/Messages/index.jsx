import { Col } from 'react-bootstrap';

import MessagesHeader from './MessagesHeader'
import MessagesList from './MessagesList'
import NewMessageForm from './NewMessageForm';

const Messages = () => (
  <Col className="p-0 h-100">
    <div className="d-flex flex-column h-100">
      <MessagesHeader />
      <MessagesList />
      <div className="mt-auto px-5 py-3">
        <NewMessageForm />
      </div>
    </div>
  </Col>
);

export default Messages;
