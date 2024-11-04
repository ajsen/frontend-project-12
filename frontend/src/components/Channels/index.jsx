import { Col } from 'react-bootstrap';

import ChannelsHeader from './ChannelsHeader';
import ChannelsList from './ChannelsList';

const Channels = () => (
  <Col xs={4} md={2} className="d-flex flex-column border-end px-0 bg-light h-100">
    <ChannelsHeader />
    <ChannelsList />
  </Col>
);

export default Channels;
